import React, { useState, useRef } from 'react';
import { User, Sparkles, ArrowRight, Star, Camera, RefreshCw, Upload } from 'lucide-react';
import { UserDetails } from '../types';

interface LoginPageProps {
  onSubmit: (details: UserDetails) => void;
}

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio", 
  "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  "Unknown / Prefer not to say"
];

const COSMIC_EMOJIS = ["👽", "🚀", "🪐", "⭐", "☄️", "🌑", "🌌", "👨‍🚀", "🛸", "🌍"];

const LoginPage: React.FC<LoginPageProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name, zodiac: zodiac || 'Unknown', avatarUrl: avatarUrl || undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        setIsGenerated(false); // User uploaded, so not generated
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAvatar = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Random Cosmic Gradient
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    const colors = [
      ['#4f46e5', '#9333ea'], // Indigo -> Purple
      ['#0891b2', '#2563eb'], // Cyan -> Blue
      ['#db2777', '#7c3aed'], // Pink -> Violet
      ['#0f172a', '#4338ca']  // Dark -> Indigo
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gradient.addColorStop(0, randomColor[0]);
    gradient.addColorStop(1, randomColor[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);

    // Add Stars
    ctx.fillStyle = 'white';
    for(let i=0; i<10; i++) {
        const x = Math.random() * 200;
        const y = Math.random() * 200;
        const size = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Add Emoji
    const randomEmoji = COSMIC_EMOJIS[Math.floor(Math.random() * COSMIC_EMOJIS.length)];
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(randomEmoji, 100, 110);

    setAvatarUrl(canvas.toDataURL());
    setIsGenerated(true); // Flag as generated for animation
  };

  // Generate a default avatar on mount if none
  React.useEffect(() => {
    if (!avatarUrl) generateAvatar();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-6 animate-fade-in-up relative z-20">
      
      {/* Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
          Identity Verification
        </h1>
        <p className="text-slate-300 text-lg">
          Register your signature with the cosmos.
        </p>
      </div>

      {/* Login Card */}
      <div className="glass-panel w-full rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <Sparkles className="w-24 h-24 text-indigo-300" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="relative group animate-float">
               <div className={`
                 w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.4)] bg-slate-900 relative
                 ${isGenerated ? 'animate-breathing-glow' : ''}
               `}>
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Avatar" 
                      className={`w-full h-full object-cover ${isGenerated ? 'animate-spin-slow' : ''}`} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <User className="w-10 h-10 text-slate-500" />
                    </div>
                  )}
                  {/* Overlay for quick action */}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </div>
               </div>
               {/* Orbiting element */}
               <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg animate-bounce">
                  <Star className="w-4 h-4 text-white fill-white" />
               </div>
            </div>

            <div className="flex gap-3">
               <button
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className="px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
               >
                 <Upload className="w-3 h-3" /> Upload
               </button>
               <button
                 type="button"
                 onClick={generateAvatar}
                 className="px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-xs font-bold text-indigo-300 hover:bg-indigo-600/40 hover:text-white transition-colors flex items-center gap-2"
               >
                 <RefreshCw className="w-3 h-3" /> Generate Aura
               </button>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 accept="image/*" 
                 className="hidden" 
               />
            </div>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-indigo-200 ml-1 flex items-center gap-2">
              <User className="w-4 h-4" />
              EXPLORER NAME
            </label>
            <div className={`
              relative flex items-center rounded-xl border transition-all duration-300 overflow-hidden bg-slate-900/40
              ${isFocused === 'name' ? 'border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-slate-700/50'}
            `}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsFocused('name')}
                onBlur={() => setIsFocused(null)}
                placeholder="Enter your name..."
                className="w-full bg-transparent p-4 text-white text-lg placeholder:text-slate-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Zodiac Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-purple-200 ml-1 flex items-center gap-2">
              <Star className="w-4 h-4" />
              COSMIC SIGN (Optional)
            </label>
            <div className={`
              relative flex items-center rounded-xl border transition-all duration-300 overflow-hidden bg-slate-900/40
              ${isFocused === 'zodiac' ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-slate-700/50'}
            `}>
              <select
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value)}
                onFocus={() => setIsFocused('zodiac')}
                onBlur={() => setIsFocused(null)}
                className="w-full bg-transparent p-4 text-white text-lg focus:outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-slate-500">Select your sign...</option>
                {ZODIAC_SIGNS.map(sign => (
                  <option key={sign} value={sign} className="bg-slate-900 text-white">
                    {sign}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              group relative mt-2 px-8 py-4 font-bold rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300
              ${name.trim() 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:scale-[1.02]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
            `}
          >
            <span>Begin Journey</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${name.trim() ? 'group-hover:translate-x-1' : ''}`} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;