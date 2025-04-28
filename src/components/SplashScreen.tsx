import { useState, useEffect } from 'react';
import { Atom } from 'lucide-react';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<'atom' | 'text'>('atom');

  useEffect(() => {
    // First stage: Show atom animation
    const atomTimer = setTimeout(() => {
      setStage('text');
    }, 2000);

    // Second stage: Hide splash screen
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(atomTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-50 flex flex-col items-center justify-center transition-opacity duration-500">
      <div className={`transition-opacity duration-500 ${stage === 'text' ? 'opacity-0' : 'opacity-100'}`}>
        <Atom size={80} className="text-blue-400 animate-spin-slow" />
      </div>
      
      <div className={`text-center transition-opacity duration-500 ${stage === 'text' ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          Teorias Matemáticas da Física
        </h1>
        <p className="text-xl text-gray-300 animate-fade-in-delay">
          By Julio Campos Machado
        </p>
      </div>
    </div>
  );
}