import React, { useState } from 'react';
import { PersonalityResult } from '../types';
import { RefreshCw, Share2, Sparkles, Orbit, Check } from 'lucide-react';
import { playConfirmation } from '../services/audioService';

interface ResultPageProps {
  result: PersonalityResult;
  onRestart: () => void;
  userName?: string;
  userAvatar?: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onRestart, userName, userAvatar }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    playConfirmation(); // Play sound effect immediately
    
    const shareText = `I am "${result.title}" ✨\n\n${result.description}\n\nDiscover your Cosmic Archetype on Aura!`;
    const shareUrl = window.location.href;

    const shareData = {
      title: 'Aura - Cosmic Personality',
      text: shareText,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 animate-fade-in-up pb-20 relative z-10">
      <div className="text-center mb-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-md text-indigo-200 font-semibold text-sm mb-6 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <Orbit className="w-4 h-4" />
          <span>Cosmic Identity Revealed</span>
        </div>
        
        {userAvatar && (
          <div className="w-24 h-24 rounded-full border-4 border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden mb-4 animate-float">
            <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        )}
        
        {userName && (
          <p className="text-slate-300 uppercase tracking-widest text-sm font-semibold mb-2">
            Prepared for {userName}
          </p>
        )}

        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] mb-6 leading-tight">
          {result.title}
        </h1>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl mb-8 border border-white/10 relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none"></div>
        
        <div className="bg-white/5 p-6 border-b border-white/5 backdrop-blur-xl relative z-10">
          <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            The Essence
          </h3>
        </div>
        
        <div className="p-8 md:p-10 relative z-10">
          <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
            {result.description}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {result.tips.map((tip, index) => (
          <div key={index} className="glass-card p-6 rounded-2xl shadow-lg relative overflow-hidden group border border-white/5">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] mb-4 text-white font-bold bg-indigo-600 border border-indigo-400">
                {index + 1}
              </div>
              <p className="font-medium text-slate-300 leading-snug">{tip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="group flex items-center gap-3 px-8 py-4 bg-white text-indigo-950 font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:bg-indigo-50 transition-all hover:-translate-y-1 w-full md:w-auto justify-center"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Re-enter the Cosmos
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-3 px-8 py-4 bg-slate-800/50 backdrop-blur-md text-white font-bold rounded-full border border-white/10 shadow-lg hover:bg-slate-700/50 hover:border-white/30 transition-all hover:-translate-y-1 w-full md:w-auto justify-center group"
        >
          {showCopied ? (
             <>
               <Check className="w-5 h-5 text-green-400" />
               <span>Copied Link!</span>
             </>
          ) : (
             <>
               <Share2 className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
               <span>Share Result</span>
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResultPage;