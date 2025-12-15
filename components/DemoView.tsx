import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from './ChatInterface';
import ArchitectureModal from './ArchitectureModal';

const DemoView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand-500/30">
      
      {/* Header */}
      <header className="flex-none h-16 border-b border-dark-border bg-dark-card/50 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link to="/" className="w-8 h-8 rounded bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </Link>
          <div>
            <Link to="/" className="font-bold text-lg tracking-tight hover:text-brand-400 transition-colors">FlashResponse.ai</Link>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Demo Environment</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xs font-medium text-gray-500 hover:text-gray-300 hidden sm:block mr-2">
            ← Volver al Inicio
          </Link>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-medium text-gray-400 hover:text-white border border-dark-border hover:border-gray-500 px-3 py-1.5 rounded transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">Arquitectura</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <ChatInterface />
      </main>

      <ArchitectureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DemoView;