import React from 'react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-dark-card border border-dark-border w-full max-w-4xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-dark-border flex justify-between items-center sticky top-0 bg-dark-card z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Arquitectura y Estrategia del Sistema
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-8 text-gray-300">
          
          {/* Section 1: Why Flash-Lite */}
          <section>
            <h3 className="text-lg font-semibold text-brand-500 mb-2">1. ¿Por qué Gemini 2.0 Flash-Lite?</h3>
            <p className="mb-4">
              Para un MVP de producción de "Baja Latencia", la inteligencia bruta suele ser secundaria frente al <strong>Time-to-First-Token (TTFT)</strong>. Se seleccionó Flash-Lite porque:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Eficiencia de Costos:</strong> Significativamente más barato por millón de tokens, permitiendo escalabilidad viable.</li>
              <li><strong>Optimización Edge:</strong> Diseñado para tareas de alto rendimiento y baja latencia (ej: chatbots, extracción en tiempo real).</li>
              <li><strong>Rendimiento (Throughput):</strong> Genera tokens más rápido que los modelos "Pro", haciendo que la UI se sienta instantánea (crítico para UX).</li>
            </ul>
          </section>

          {/* Section 2: Architecture */}
          <section>
            <h3 className="text-lg font-semibold text-brand-500 mb-4">2. Arquitectura de la Aplicación</h3>
            <div className="bg-black/40 p-6 rounded-lg border border-dark-border font-mono text-sm relative overflow-hidden group">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                
                <div className="p-4 bg-brand-900/30 border border-brand-500/30 rounded w-full md:w-auto">
                  <div className="text-brand-500 font-bold">Cliente (React)</div>
                  <div className="text-xs text-gray-400 mt-1">Gestión de Estado, Timer de Latencia</div>
                </div>

                <div className="hidden md:flex flex-col items-center">
                   <span className="text-xs text-gray-500 mb-1">Petición Stream</span>
                   <div className="w-16 h-0.5 bg-gradient-to-r from-brand-500 to-purple-500"></div>
                </div>
                <div className="md:hidden">↓</div>

                <div className="p-4 bg-purple-900/30 border border-purple-500/30 rounded w-full md:w-auto">
                  <div className="text-purple-400 font-bold">Capa API</div>
                  <div className="text-xs text-gray-400 mt-1">Google GenAI SDK</div>
                </div>

                <div className="hidden md:flex flex-col items-center">
                   <span className="text-xs text-gray-500 mb-1">Ventana de Contexto</span>
                   <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-orange-500"></div>
                </div>
                <div className="md:hidden">↓</div>

                <div className="p-4 bg-orange-900/30 border border-orange-500/30 rounded w-full md:w-auto">
                  <div className="text-orange-400 font-bold">Inferencia</div>
                  <div className="text-xs text-gray-400 mt-1">Gemini 2.0 Flash-Lite</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Performance Best Practices */}
          <section>
            <h3 className="text-lg font-semibold text-brand-500 mb-2">3. Principios de Ingeniería de Baja Latencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-dark-bg p-4 rounded border border-dark-border">
                <h4 className="font-medium text-white mb-1">Streaming First</h4>
                <p className="text-xs text-gray-400">Nunca esperar la completitud. Renderizamos fragmentos inmediatamente para minimizar la latencia percibida.</p>
              </div>
              <div className="bg-dark-bg p-4 rounded border border-dark-border">
                <h4 className="font-medium text-white mb-1">Minimización de Payload</h4>
                <p className="text-xs text-gray-400">Enviar solo el contexto necesario. Historiales grandes ralentizan el procesamiento del prompt (pre-fill).</p>
              </div>
              <div className="bg-dark-bg p-4 rounded border border-dark-border">
                <h4 className="font-medium text-white mb-1">UI Optimista</h4>
                <p className="text-xs text-gray-400">Mostrar el mensaje del usuario y el indicador "Pensando" inmediatamente, antes de la confirmación de red.</p>
              </div>
              <div className="bg-dark-bg p-4 rounded border border-dark-border">
                <h4 className="font-medium text-white mb-1">Edge Caching (Concepto)</h4>
                <p className="text-xs text-gray-400">En un backend completo, cachearíamos consultas comunes (KV Store) para evitar el LLM y lograr respuestas en ~10ms.</p>
              </div>
            </div>
          </section>

        </div>
        
        <div className="p-6 border-t border-dark-border bg-dark-card">
           <button onClick={onClose} className="w-full bg-brand-600 hover:bg-brand-500 text-white font-medium py-2 px-4 rounded transition-colors">
             Cerrar Vista de Arquitectura
           </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureModal;