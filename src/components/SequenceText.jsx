import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const messages = [
  { type: 'serif', text: "Systems decrypted." },
  { type: 'serif', text: "Accessing memories of her..." },
  { type: 'serif', text: "Happy Birthday, Anita." },
  { type: 'sans', text: "I hope your day is as beautiful as you are." },
  { type: 'serif', text: "For you, always." }
];

const SequenceText = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => setIndex(prev => prev + 1), 3500);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => onComplete(), 2500);
      return () => clearTimeout(finalTimer);
    }
  }, [index, onComplete]);

  return (
    <div className="text-center px-10">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, filter: "blur(15px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className={`
            ${messages[index].type === 'serif' ? 'font-serif italic text-2xl md:text-4xl' : 'font-sans font-light tracking-[0.3em] text-sm md:text-lg'}
            text-rose-100 drop-shadow-sm
          `}
        >
          {messages[index].text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default SequenceText;