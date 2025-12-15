export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface LatencyMetrics {
  ttft: number; // Time to First Token (ms)
  totalTime: number; // Total generation time (ms)
  tokensPerSecond?: number; // Estimated
  inputTokens?: number; // Prompt tokens
  outputTokens?: number; // Generated tokens
}

export interface ImageData {
  mimeType: string;
  data: string; // Base64
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  image?: ImageData; // New: Support for image attachment
  timestamp: number;
  metrics?: LatencyMetrics;
  isStreaming?: boolean;
  error?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  modelName: string;
}

export const APP_MODELS = {
  FLASH_LITE: 'gemini-2.0-flash-lite-preview-02-05', 
  FLASH_STD: 'gemini-2.5-flash',
};