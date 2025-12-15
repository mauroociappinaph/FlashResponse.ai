import React, { useState, useRef, useEffect } from 'react';
import { Message, MessageRole, LatencyMetrics, APP_MODELS, ImageData } from '../types';
import { streamResponse } from '../services/geminiService';
import LatencyBadge from './LatencyBadge';

const ChatInterface: React.FC = () => {
  // Dynamic Date Grounding
  const now = new Date();
  const dateStr = now.toLocaleString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // DEFAULT ENGINEERING PERSONA
  // This overrides the generic "I am a model from Google" response.
  const DEFAULT_SYSTEM_PROMPT = `Eres FlashResponse.ai, un sistema de demostración de ingeniería de Alta Velocidad y Baja Latencia.

Contexto Temporal (Grounding):
- Fecha y hora actual del sistema: ${dateStr}
  
Tus objetivos:
1. Demostrar velocidad (TTFT bajo). Sé extremadamente conciso y directo.
2. Actuar como un ingeniero senior. Tus respuestas son técnicas y pragmáticas.
3. Identidad: NO digas que eres un modelo de lenguaje genérico. Preséntate como una arquitectura optimizada para inferencia en tiempo real usando Gemini Flash-Lite.
4. Si te preguntan "qué eres", explica tu stack técnico (React Edge + Gemini Flash-Lite).`;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      content: "FlashResponse System Online. \nMotor de inferencia: Gemini 2.0 Flash-Lite.\nEstado: Listo para pruebas de latencia ultra-baja.",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Developer Features State
  const [systemInstruction, setSystemInstruction] = useState(DEFAULT_SYSTEM_PROMPT);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Image handling
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        alert("La imagen es demasiado grande. Máximo 4MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64String.split(',')[1];
        setSelectedImage({
          mimeType: file.type,
          data: base64Data
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && !selectedImage) || isLoading) return;

    const userText = inputValue;
    const currentImage = selectedImage;

    setInputValue('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      content: userText,
      image: currentImage || undefined,
      timestamp: Date.now()
    };

    // Add Placeholder Model Message
    const modelMsgId = (Date.now() + 1).toString();
    const modelMsgPlaceholder: Message = {
      id: modelMsgId,
      role: MessageRole.MODEL,
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    setMessages(prev => [...prev, userMsg, modelMsgPlaceholder]);
    setIsLoading(true);

    await streamResponse(
      userText || "Describe esta imagen", // Default prompt if only image is sent
      APP_MODELS.FLASH_LITE,
      {
        systemInstruction: systemInstruction,
        image: currentImage || undefined
      },
      {
        onFirstToken: (ttft) => {
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId 
              ? { ...msg, metrics: { ...msg.metrics, ttft } as LatencyMetrics } 
              : msg
          ));
        },
        onChunk: (text) => {
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId 
              ? { ...msg, content: msg.content + text } 
              : msg
          ));
        },
        onComplete: (finalMetrics) => {
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId 
              ? { 
                  ...msg, 
                  isStreaming: false,
                  metrics: { ...msg.metrics, ...finalMetrics } 
                } 
              : msg
          ));
          setIsLoading(false);
        },
        onError: (error) => {
          console.error("Stream error:", error);
          setMessages(prev => prev.map(msg => 
            msg.id === modelMsgId 
              ? { 
                  ...msg, 
                  content: msg.content + `\n[Error: ${error.message || 'Fallo de conexión'}]`, 
                  isStreaming: false, 
                  error: true 
              } 
            : msg
          ));
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative">
      
      {/* Dev Settings Panel (Toggleable) */}
      <div className={`absolute top-0 right-0 left-0 z-20 bg-dark-card border-b border-dark-border transition-all duration-300 overflow-hidden ${showSettings ? 'max-h-60' : 'max-h-0'}`}>
        <div className="p-4 space-y-2">
          <label className="text-xs font-mono text-brand-400 uppercase tracking-wider block">
            System Instruction (Prompt de Sistema)
          </label>
          <textarea 
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded p-2 text-sm text-gray-300 focus:border-brand-500 focus:outline-none h-32 resize-none font-mono text-xs leading-tight"
            placeholder="Define la personalidad del modelo..."
          />
          <div className="flex justify-between items-center">
             <span className="text-xs text-gray-500">Esto define la "personalidad" técnica del modelo.</span>
             <button onClick={() => setShowSettings(false)} className="text-xs text-gray-400 hover:text-white underline">
              Ocultar Configuración
            </button>
          </div>
        </div>
      </div>

      {/* Settings Toggle Button (Absolute positioned near header area visually, but inside component) */}
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="absolute top-2 right-4 z-10 text-xs text-gray-400 hover:text-brand-400 flex items-center gap-1 bg-dark-bg/50 px-2 py-1 rounded backdrop-blur border border-transparent hover:border-brand-500/30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>System Prompt</span>
      </button>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 transition-all ${showSettings ? 'pt-40' : ''}`}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`
                max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3.5 shadow-sm
                ${msg.role === MessageRole.USER 
                  ? 'bg-brand-600 text-white rounded-br-none' 
                  : 'bg-dark-card border border-dark-border text-gray-100 rounded-bl-none'}
                ${msg.error ? 'border-red-500/50 bg-red-900/10' : ''}
              `}
            >
              {msg.image && (
                <div className="mb-3">
                  <img 
                    src={`data:${msg.image.mimeType};base64,${msg.image.data}`} 
                    alt="User upload" 
                    className="max-h-60 rounded-lg border border-white/20"
                  />
                </div>
              )}
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base font-sans">
                {msg.content}
              </p>
            </div>
            
            {msg.role === MessageRole.MODEL && (
              <LatencyBadge metrics={msg.metrics} isStreaming={msg.isStreaming} />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark-bg/80 backdrop-blur border-t border-dark-border">
        {selectedImage && (
          <div className="mb-2 flex items-center gap-2 bg-dark-card w-fit px-3 py-1.5 rounded-lg border border-dark-border">
            <span className="text-xs text-brand-400">Imagen adjunta</span>
            <button onClick={clearImage} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto flex items-center gap-2">
          {/* File Input */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 rounded-full bg-dark-card border border-dark-border text-gray-400 hover:text-brand-400 hover:border-brand-500 transition-all"
            title="Adjuntar imagen (Multimodal)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder={selectedImage ? "Describe esta imagen..." : "Escribe un mensaje..."}
            className="flex-1 bg-dark-card text-gray-100 border border-dark-border rounded-full py-3.5 px-6 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-gray-500 transition-all shadow-lg"
          />
          
          <button
            type="submit"
            disabled={(!inputValue.trim() && !selectedImage) || isLoading}
            className={`p-3.5 rounded-full transition-all duration-200 flex-none ${
              (!inputValue.trim() && !selectedImage) || isLoading 
                ? 'bg-dark-border text-gray-500 cursor-not-allowed' 
                : 'bg-brand-500 text-white hover:bg-brand-400 shadow-md shadow-brand-500/20'
            }`}
          >
            {isLoading ? (
               <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transform rotate-90">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;