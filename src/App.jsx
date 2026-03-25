import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MatrixRain from './components/MatrixRain';
import SequenceText from './components/SequenceText';
import PhotoBook from './components/PhotoBook';

function App() {
  const [step, setStep] = useState('matrix'); // matrix -> celebration -> book
  
  const handleMatrixComplete = () => setStep('celebration');

  useEffect(() => {
    if (step === 'celebration') {
      const timer = setTimeout(() => setStep('book'), 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {step === 'matrix' && (
          <motion.div key="step-matrix" exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-center">
            <MatrixRain />
            <SequenceText onComplete={handleMatrixComplete} />
          </motion.div>
        )}

        {(step === 'celebration' || step === 'book') && (
          <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
            {/* BACKGROUND BINTANG HIDUP (Lebih Padat) */}
            <div className="absolute inset-0 z-0">
              {[...Array(200)].map((_, i) => (
                <div key={i} className="absolute bg-white rounded-full"
                  style={{
                    width: Math.random() * 2.5 + 'px',
                    height: Math.random() * 2.5 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
                    animationDelay: `${Math.random() * 5}s`,
                    boxShadow: Math.random() > 0.8 ? '0 0 10px #fff' : 'none'
                  }}
                />
              ))}
            </div>

            {step === 'celebration' && (
              <div className="flex flex-col items-center justify-center h-full relative z-10">
                 <motion.h1 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-rose-500 font-serif italic text-6xl md:text-8xl text-center">
                  Happy Birthday <br/> <span className="text-white">ANITA</span>
                 </motion.h1>
              </div>
            )}

            {step === 'book' && <PhotoBook />}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default App;