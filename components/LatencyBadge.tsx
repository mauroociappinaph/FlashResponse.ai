import React from 'react';
import { LatencyMetrics } from '../types';

interface LatencyBadgeProps {
  metrics?: LatencyMetrics;
  isStreaming?: boolean;
}

const LatencyBadge: React.FC<LatencyBadgeProps> = ({ metrics, isStreaming }) => {
  if (isStreaming) {
    return (
      <div className="flex items-center space-x-2 text-xs font-mono text-brand-400 animate-pulse mt-2">
        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Recibiendo tokens...</span>
      </div>
    );
  }

  if (!metrics) return null;

  // Color coding based on performance
  const ttftColor = metrics.ttft < 500 ? 'text-green-400' : metrics.ttft < 1000 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="inline-flex items-center gap-3 mt-2 px-2 py-1 rounded bg-black/20 border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-1.5" title="Tiempo al Primer Token (Time To First Token)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-3 h-3 ${ttftColor}`}>
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <span className="text-[10px] font-mono uppercase text-gray-500">TTFT</span>
        <span className={`text-xs font-mono font-bold ${ttftColor}`}>{metrics.ttft.toFixed(0)}ms</span>
      </div>

      <div className="w-px h-3 bg-gray-700"></div>

      <div className="flex items-center gap-1.5" title="Tiempo Total de Generación">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-gray-400">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="text-[10px] font-mono uppercase text-gray-500">Total</span>
        <span className="text-xs font-mono text-gray-300">{metrics.totalTime.toFixed(0)}ms</span>
      </div>

      {metrics.tokensPerSecond && (
        <>
          <div className="w-px h-3 bg-gray-700"></div>
          <div className="flex items-center gap-1.5" title="Tokens Por Segundo">
             <span className="text-[10px] font-mono uppercase text-gray-500">TPS</span>
             <span className="text-xs font-mono text-brand-400">{metrics.tokensPerSecond.toFixed(0)}</span>
          </div>
        </>
      )}

      {(metrics.inputTokens !== undefined || metrics.outputTokens !== undefined) && (
        <>
          <div className="w-px h-3 bg-gray-700"></div>
          <div className="flex items-center gap-2">
            {metrics.inputTokens !== undefined && (
              <div className="flex items-center gap-1.5" title="Tokens de Entrada (Prompt)">
                <span className="text-[10px] font-mono uppercase text-gray-500">IN</span>
                <span className="text-xs font-mono text-blue-400">{metrics.inputTokens}</span>
              </div>
            )}
            {metrics.outputTokens !== undefined && (
              <div className="flex items-center gap-1.5" title="Tokens de Salida (Generados)">
                <span className="text-[10px] font-mono uppercase text-gray-500">OUT</span>
                <span className="text-xs font-mono text-purple-400">{metrics.outputTokens}</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LatencyBadge;