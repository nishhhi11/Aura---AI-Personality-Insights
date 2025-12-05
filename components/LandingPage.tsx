import React from 'react';
import { Sparkles, Brain, Heart, ArrowRight, Zap, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 animate-fade-in-up relative z-10">
      
      {/* Animated Hero Illustration */}
      <div className="relative w-72 h-72 mb-8 flex items-center justify-center select-none pointer-events-none">
        {/* Ambient Glows */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating Elements */}
        {/* Brain Element */}
        <div className="absolute top-0 right-12 animate-float-delayed z-20">
          <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl rotate-12 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10 transform transition-transform">
             <Brain className="w-8 h-8 text-indigo-300 drop-shadow-sm" />
          </div>
        </div>

        {/* Heart Element */}
        <div className="absolute bottom-10 left-8 animate-float z-20">
          <div className="w-14 h-14 bg-pink-500/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/10 transform -rotate-6">
             <Heart className="w-7 h-7 text-pink-300 fill-pink-300/20" />
          </div>
        </div>

        {/* Zap Element */}
        <div className="absolute top-10 left-10 animate-wiggle z-10">
           <div className="w-12 h-12 bg-yellow-500/20 backdrop-blur-md rounded-lg -rotate-12 flex items-center justify-center shadow-lg border border-white/10">
              <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>
        </div>
        
        {/* Star Element */}
        <div className="absolute bottom-16 right-4 animate-spin-slow-reverse z-10">
           <div className="w-10 h-10 bg-cyan-500/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/10">
              <Star className="w-5 h-5 text-cyan-300 fill-cyan-300" />
          </div>
        </div>

        {/* Central Hub */}
        <div className="relative z-30 w-36 h-36 bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-white/20 animate-float">
          <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] animate-pulse"></div>
          <Sparkles className="w-20 h-20 text-indigo-200 fill-indigo-200/50 drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]" />
        </div>
      </div>

      <div className="text-center mb-10 relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] tracking-tight leading-tight">
          Discover Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 filter drop-shadow-sm">Cosmic Archetype</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-medium max-w-md mx-auto leading-relaxed">
          Are you a blazing Supernova or a mysterious Nebula? Let the universe reveal your true aura.
        </p>
      </div>

      <div className="glass-panel w-full rounded-3xl p-8 mb-10 shadow-2xl transform transition-all hover:scale-[1.01] duration-500 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-colors"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors"></div>
        
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
          <Brain className="w-5 h-5 text-indigo-400" />
          The Cosmic Rules
        </h2>
        
        <ul className="space-y-5 relative z-10">
          <li className="flex items-start gap-4">
            <div className="bg-indigo-500/20 p-2.5 rounded-2xl text-indigo-300 font-bold text-sm min-w-[3rem] text-center border border-indigo-500/20 shadow-inner">
              10
            </div>
            <div>
              <p className="font-bold text-slate-100 text-lg">Deep Questions</p>
              <p className="text-slate-400">Metaphors about stars, gravity, and time.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="bg-purple-500/20 p-2.5 rounded-2xl text-purple-300 font-bold text-sm min-w-[3rem] text-center border border-purple-500/20 shadow-inner">
              4
            </div>
            <div>
              <p className="font-bold text-slate-100 text-lg">Unique Paths</p>
              <p className="text-slate-400">No right or wrong. Just follow your instinct.</p>
            </div>
          </li>
           <li className="flex items-start gap-4">
            <div className="bg-pink-500/20 p-2.5 rounded-2xl text-pink-300 font-bold text-sm min-w-[3rem] text-center border border-pink-500/20 shadow-inner">
              AI
            </div>
            <div>
              <p className="font-bold text-slate-100 text-lg">Soul Analysis</p>
              <p className="text-slate-400">Our AI maps your answers to a cosmic identity.</p>
            </div>
          </li>
        </ul>

        <div className="mt-8 flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
           <Heart className="w-4 h-4 text-red-400 fill-red-400/50" />
           <span className="font-medium">Take your time. The universe isn't rushing you.</span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="group relative px-12 py-5 bg-white text-indigo-900 font-bold rounded-full text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(129,140,248,0.6)] hover:bg-indigo-50 transition-all duration-300 w-full md:w-auto flex items-center justify-center gap-3 overflow-hidden transform hover:-translate-y-1"
      >
        <span className="relative z-10">Enter the Cosmos</span>
        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default LandingPage;