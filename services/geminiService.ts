import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { APP_MODELS, LatencyMetrics, ImageData } from "../types";

// Initialize client outside component to avoid recreation
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface StreamCallbacks {
  onFirstToken: (ttft: number) => void;
  onChunk: (text: string) => void;
  onComplete: (metrics: LatencyMetrics) => void;
  onError: (error: Error) => void;
}

interface RequestConfig {
  systemInstruction?: string;
  image?: ImageData;
  temperature?: number;
}

/**
 * Sends a message to the Gemini Flash Lite model with performance instrumentation.
 * Supports Multimodal input and System Instructions.
 */
export const streamResponse = async (
  prompt: string,
  modelName: string = APP_MODELS.FLASH_LITE,
  config: RequestConfig = {},
  callbacks: StreamCallbacks
) => {
  const startTime = performance.now();
  let firstTokenReceived = false;
  let ttft = 0;
  let inputTokenCount = 0;
  let outputTokenCount = 0;

  try {
    // Construct content parts (Text + Optional Image)
    const parts: any[] = [{ text: prompt }];
    
    if (config.image) {
      parts.unshift({
        inlineData: {
          mimeType: config.image.mimeType,
          data: config.image.data
        }
      });
    }

    const responseStream = await ai.models.generateContentStream({
      model: modelName,
      contents: { parts }, // Correct structure for @google/genai
      config: {
        systemInstruction: config.systemInstruction, // Control Persona
        temperature: config.temperature ?? 0.7, 
        topP: 0.9,
      }
    });

    for await (const chunk of responseStream) {
      const c = chunk as GenerateContentResponse;
      const textChunk = c.text;

      // Extract token usage if available (usually in the last chunk)
      if (c.usageMetadata) {
        outputTokenCount = c.usageMetadata.candidatesTokenCount ?? outputTokenCount;
        inputTokenCount = c.usageMetadata.promptTokenCount ?? inputTokenCount;
      }

      if (textChunk) {
        // Calculate TTFT (Time To First Token) upon receiving the first valid chunk
        if (!firstTokenReceived) {
          ttft = performance.now() - startTime;
          firstTokenReceived = true;
          callbacks.onFirstToken(ttft);
        }

        callbacks.onChunk(textChunk);
      }
    }

    const totalTime = performance.now() - startTime;
    
    // Calculate estimated TPS (Tokens Per Second)
    const tokensPerSecond = outputTokenCount > 0 
      ? outputTokenCount / (totalTime / 1000) 
      : undefined;

    callbacks.onComplete({
      ttft,
      totalTime,
      tokensPerSecond,
      inputTokens: inputTokenCount,
      outputTokens: outputTokenCount
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    callbacks.onError(error instanceof Error ? error : new Error('Unknown error'));
  }
};