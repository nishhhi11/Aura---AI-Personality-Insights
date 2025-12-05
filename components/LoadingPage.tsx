import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] w-full p-6 text-center relative z-20">
      <div className="relative mb-8">
        {/* Cosmic Glow */}
        <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-75"></div>
        
        <div className="relative glass-panel p-8 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-500/30">
          <Loader2 className="w-12 h-12 text-indigo-300 animate-spin" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Aligning the Stars...
      </h2>
      <p className="text-indigo-200/80 text-lg max-w-md animate-pulse">
        Our AI is consulting the cosmos to reveal your true aura.
      </p>
    </div>
  );
};

export default LoadingPage;