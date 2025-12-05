import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import QuizPage from './components/QuizPage';
import LoadingPage from './components/LoadingPage';
import ResultPage from './components/ResultPage';
import { QUESTIONS } from './constants';
import { AppState, PersonalityResult, UserDetails } from './types';
import { analyzePersonality } from './services/geminiService';
import { initAudio, playWhoosh, playSparkle } from './services/audioService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const goToLogin = () => {
    initAudio(); // Initialize audio context on first interaction
    setAppState(AppState.LOGIN);
  };

  const handleLogin = (details: UserDetails) => {
    setUserDetails(details);
    playWhoosh();
    startQuiz();
  };

  const startQuiz = () => {
    setAppState(AppState.QUIZ);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResult(null);
  };

  const handleRestart = () => {
    setAppState(AppState.LANDING);
    setUserDetails(null);
    setResult(null);
  };

  const handleAnswer = useCallback(async (answerText: string) => {
    const newAnswers = [...userAnswers, answerText];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      // Delay to allow visual confirmation animation (750ms)
      setTimeout(() => {
        playWhoosh(); // Gentle whoosh sound for transition
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 750);
    } else {
      // Quiz Finished, wait for animation then switch
      setTimeout(async () => {
        setAppState(AppState.ANALYZING);
        
        // Call Gemini API
        try {
          const analysis = await analyzePersonality(newAnswers, userDetails?.name, userDetails?.zodiac);
          setResult(analysis);
          playSparkle(); // Sparkle sound when result is ready
          setAppState(AppState.RESULT);
        } catch (error) {
          console.error("Failed to analyze results", error);
          // In a real app, show error state. Here we might have a fallback in service.
          setAppState(AppState.RESULT); 
        }
      }, 750);
    }
  }, [currentQuestionIndex, userAnswers, userDetails]);

  const renderContent = () => {
    switch (appState) {
      case AppState.LANDING:
        return <LandingPage onStart={goToLogin} />;
      
      case AppState.LOGIN:
        return <LoginPage onSubmit={handleLogin} />;

      case AppState.QUIZ:
        return (
          <QuizPage
            question={QUESTIONS[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS.length}
            onAnswer={handleAnswer}
          />
        );

      case AppState.ANALYZING:
        return <LoadingPage />;

      case AppState.RESULT:
        return result ? (
          <ResultPage 
            result={result} 
            userName={userDetails?.name} 
            userAvatar={userDetails?.avatarUrl}
            onRestart={handleRestart} 
          />
        ) : (
          <div className="text-white text-center p-10">
            <p>The stars are cloudy. Please try again.</p>
            <button onClick={handleRestart} className="mt-4 px-6 py-2 bg-white text-indigo-900 rounded-full font-bold">Restart</button>
          </div>
        );
        
      default:
        return <LandingPage onStart={goToLogin} />;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Decorative background blobs - Space Colors */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-1000"></div>
        <div className="absolute top-[40%] left-[-10%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[80px] mix-blend-screen animate-pulse delay-500"></div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-400/60 text-xs font-medium uppercase tracking-widest hover:text-slate-300 transition-colors">
        <p>Powered by Gemini AI • Aura Personality</p>
      </footer>
    </div>
  );
};

export default App;