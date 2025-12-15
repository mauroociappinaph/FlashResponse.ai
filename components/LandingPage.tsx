import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-dark-bg/80 backdrop-blur border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">FlashResponse.ai</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/demo" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              Live Demo
            </Link>
            <Link 
              to="/demo" 
              className="bg-white text-dark-bg hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Probar Ahora
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/30 border border-brand-500/30 text-brand-400 text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Powered by Gemini 2.0 Flash-Lite
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Inferencia de IA a la <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">velocidad del pensamiento</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Elimina la latencia de tus aplicaciones de IA. FlashResponse demuestra cómo integrar modelos "Flash-Lite" para lograr un TTFT (Time-To-First-Token) inferior a 500ms.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/demo" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Iniciar Demo Interactiva
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-dark-card border border-dark-border hover:border-gray-500 text-gray-300 hover:text-white rounded-xl font-medium text-lg transition-all"
            >
              Documentación API
            </a>
          </div>

          {/* Mini Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-dark-border pt-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-mono font-bold text-white mb-1">~400ms</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">TTFT Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white mb-1">Low-Cost</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Flash-Lite Tier</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white mb-1">Multimodal</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Texto & Imágenes</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white mb-1">Edge</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">React + API Routes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-dark-card/50 border-y border-dark-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">El problema: <span className="text-red-400">La Latencia Mata la UX</span></h2>
            <div className="space-y-6 text-gray-400">
              <p>
                En aplicaciones de chat y asistentes virtuales, cada milisegundo cuenta. Los usuarios perciben retrasos superiores a <strong>1 segundo</strong> como una interrupción en el flujo de pensamiento.
              </p>
              <p>
                Los modelos "Pro" o "Ultra" son inteligentes, pero lentos y costosos para tareas simples.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">✕</div>
                  <span>Alta latencia (TTFT > 1.5s)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">✕</div>
                  <span>Costos elevados por token</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">✕</div>
                  <span>Experiencia de usuario "robotizada"</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-dark-bg p-8 rounded-xl border border-dark-border">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-green-400">✓</span> La Solución Flash-Lite
              </h3>
              <p className="text-gray-400 mb-6">
                Una arquitectura optimizada para velocidad, utilizando Gemini 2.0 Flash-Lite y streaming de respuesta.
              </p>
              
              <div className="space-y-4">
                <div className="bg-dark-card p-4 rounded border border-dark-border flex justify-between items-center">
                  <span className="text-sm text-gray-300">Modelo Standard</span>
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[80%]"></div>
                  </div>
                  <span className="text-xs font-mono text-red-400">1.8s TTFT</span>
                </div>
                <div className="bg-dark-card p-4 rounded border border-brand-500/30 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-500/5"></div>
                  <span className="text-sm font-bold text-white">FlashResponse.ai</span>
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 w-[15%]"></div>
                  </div>
                  <span className="text-xs font-mono text-brand-400">0.3s TTFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Características Principales</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Diseñado para desarrolladores que necesitan construir productos listos para producción.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Streaming Nativo",
              desc: "Renderizado token a token para percepción de velocidad instantánea. Feedback visual inmediato.",
              icon: (
                <svg className="w-6 h-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            },
            {
              title: "Multimodalidad",
              desc: "Capacidad de procesar imágenes y texto simultáneamente sin sacrificar rendimiento.",
              icon: (
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              title: "Observabilidad",
              desc: "Métricas en tiempo real integradas en la UI: TTFT, Tiempo Total, TPS (Tokens/Seg) y conteo de tokens.",
              icon: (
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-dark-card p-6 rounded-xl border border-dark-border hover:border-brand-500/50 transition-colors group">
              <div className="w-12 h-12 bg-dark-bg rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-dark-border">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases / Persona */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-brand-900/10 border-t border-dark-border">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Ideal para Casos de Uso Reales</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Customer Support Bots', 'Data Extraction', 'Interactive Tutors', 'Code Assistants', 'Real-time Translation'].map((tag) => (
                <span key={tag} className="px-6 py-3 rounded-full bg-dark-card border border-dark-border text-gray-300 font-mono text-sm hover:border-brand-500 hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
         </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-600/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para ver la velocidad?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Experimenta la diferencia de una arquitectura low-latency en tiempo real.
          </p>
          <Link 
            to="/demo" 
            className="inline-block px-10 py-5 bg-white text-dark-bg rounded-xl font-bold text-xl shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
          >
            Lanzar Demo Ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark-bg border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            © 2024 FlashResponse.ai - Low Latency AI Demo.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Portfolio</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;