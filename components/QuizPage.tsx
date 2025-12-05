import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { ChevronRight, Check } from 'lucide-react';
import { playHover } from '../services/audioService';

interface QuizPageProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (answerText: string) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOptionId(null);
  }, [question]);

  const handleOptionClick = (optionId: string, optionText: string) => {
    if (selectedOptionId) return; // Prevent multiple clicks
    setSelectedOptionId(optionId);
    onAnswer(optionText);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col h-full justify-center min-h-[80vh] relative z-20">
      {/* Progress Bar */}
      <div className="w-full bg-slate-800/50 h-1.5 rounded-full mb-8 backdrop-blur-sm overflow-hidden border border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(99,102,241,0.7)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-panel rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in relative overflow-hidden transition-all duration-500">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <span className="text-indigo-300 font-bold tracking-widest text-xs uppercase mb-3 block opacity-80">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight drop-shadow-sm">
          {question.text}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isOtherSelected = selectedOptionId !== null && !isSelected;

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id, option.text)}
                onMouseEnter={() => !selectedOptionId && playHover()}
                disabled={selectedOptionId !== null}
                className={`
                  group flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden
                  ${isSelected 
                    ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.4)] animate-pop-selected' 
                    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(79,70,229,0.1)]'
                  }
                  ${isOtherSelected ? 'opacity-40 blur-[1px]' : 'opacity-100'}
                `}
              >
                {/* Glow effect for unselected items on hover */}
                {!isSelected && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}

                <span className={`
                  flex items-center justify-center w-12 h-12 text-2xl rounded-lg shadow-sm transition-colors duration-300 relative z-10
                  ${isSelected ? 'bg-white/20' : 'bg-slate-700/50 group-hover:bg-indigo-500/20'}
                `}>
                  {option.emoji}
                </span>

                <div className="flex-1 relative z-10">
                   <p className={`font-semibold text-lg transition-colors ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                     {option.text}
                   </p>
                </div>

                {isSelected && (
                  <div className="animate-scale-in relative z-10">
                    <div className="bg-white rounded-full p-1 shadow-sm">
                      <Check className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>
                )}
                
                {!isSelected && (
                   <ChevronRight className="w-5 h-5 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;