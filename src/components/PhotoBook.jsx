import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const memories = [
  { left: "/Foto (2).jpg", right: "/Foto (1).jpg", text: "Di titik ini semua bermula, saat semesta memperkenalkan kita ✨" },
  { left: "/Foto (3).JPG", right: "/Foto (4).png", text: "Bangga melihat kita yang sekarang. Let's glow and grow up together! ❤️" },
  { left: "/Foto (5).png", right: "/Foto (6).jpg", text: "Selamat Ulang Tahun yang Ke-18,,,,Sweet Eighteen 💍" },
];

const burstPhotos = [
  "/love (1).JPG", "/love (2).JPG", "/love (3).JPG", "/love (4).JPG",
  "/love (5).JPG", "/love (6).JPG", "/love (7).jpg", "/love (8).JPG",
  "/love (9).JPG", "/love (10).JPG", "/love (11).JPG", "/love (12).JPG",
  "/love (13).JPG", "/love (14).JPG", "/love (15).JPG", "/love (16).JPG",
  "/love (17).JPG", "/love (18).JPG", "/love (19).JPG", "/love (20).JPG",
  "/love (21).jpg", "/love (22).JPG"
];

const Typewriter = ({ text }) => {
  const characters = Array.from(text);
  return (
    <motion.h2 className="text-white font-medium tracking-tight text-[8px] sm:text-[10px] md:text-xs uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-[#ff007f]/30 shadow-2xl text-center max-w-[70vw] leading-tight z-50">
      {characters.map((char, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.01, delay: i * 0.02 }}>
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

const PhotoBook = () => {
  const [step, setStep] = useState(0); 
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const checkOrientation = () => setIsPortrait(window.innerHeight > window.innerWidth);
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const stars = useMemo(() => [...Array(60)].map((_, i) => ({
    id: i, size: Math.random() * 2 + 1 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', duration: Math.random() * 3 + 2 + 's'
  })), []);

  const heartCoords = useMemo(() => {
    const num = burstPhotos.length;
    const points = [];
    const isSmallLandscape = window.innerHeight < 500;
    const scaleX = isSmallLandscape ? 13 : 20;
    const scaleY = isSmallLandscape ? 8 : 13;
    for (let i = 0; i < num; i++) {
      const t = (i / num) * 2 * Math.PI;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({ x: x * scaleX, y: y * scaleY });
    }
    return points;
  }, [isPortrait]);

  const handleNext = () => {
    if (slide < memories.length - 1) {
      setDirection(1);
      setSlide(slide + 1);
    } else {
      // LAGU DIPUTAR DI SINI (Saat masuk kejutan hati)
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play blocked"));
        audioRef.current.volume = 0.6;
      }
      setStep(2);
      confetti({ particleCount: 250, spread: 100, origin: { y: 0.5 }, colors: ['#ff007f', '#ffffff'] });
    }
  };

  const handlePrev = () => {
    if (slide > 0) {
      setDirection(-1);
      setSlide(slide - 1);
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 600 : -600, opacity: 0, rotateY: direction > 0 ? 30 : -30 }),
    center: { x: 0, opacity: 1, rotateY: 0, transition: { x: { type: "spring", stiffness: 250, damping: 25 }, opacity: { duration: 0.3 } } },
    exit: (direction) => ({ x: direction < 0 ? 600 : -600, opacity: 0, rotateY: direction < 0 ? 30 : -30, transition: { x: { type: "spring", stiffness: 250, damping: 25 }, opacity: { duration: 0.3 } } })
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black font-sans flex items-center justify-center overflow-hidden perspective-1000">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop src="/musik.mp3" />

      {/* BACKGROUND STARS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div key={star.id} className="absolute bg-white rounded-full opacity-40 shadow-[0_0_8px_white]"
            style={{ width: star.size, height: star.size, top: star.top, left: star.left, animation: `twinkle ${star.duration} infinite ease-in-out` }} />
        ))}
      </div>

      <AnimatePresence>
        {isPortrait && (
          <motion.div className="fixed inset-0 z-[100] bg-stone-950 flex flex-col items-center justify-center p-6 text-center">
            <motion.div animate={{ rotate: 90 }} transition={{ repeat: Infinity, duration: 2 }} className="w-8 h-14 border-2 border-[#ff007f] rounded-lg mb-4" />
            <p className="text-white text-[10px] uppercase tracking-[0.2em]">Miringkan HP Boss ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={direction}>
        {step === 0 && !isPortrait && (
          <motion.div key="cover" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
            onClick={() => { setDirection(1); setStep(1); }} className="cursor-pointer relative z-10 flex flex-col items-center">
            <div className="absolute -inset-10 bg-[#ff007f] opacity-20 blur-[50px] animate-pulse" />
            <div className="relative w-[170px] h-[230px] sm:w-[200px] sm:h-[280px] bg-white rounded-xl flex flex-col items-center justify-center p-6 border-2 border-[#ff007f] shadow-2xl text-center">
                <h1 className="text-stone-800 font-black text-xl italic uppercase tracking-tighter">FOR <span className="text-[#ff007f]">Herti.</span></h1>
                <p className="text-[7px] text-stone-400 mt-4 uppercase tracking-[0.3em] animate-pulse">Tap to Open</p>
            </div>
          </motion.div>
        )}

        {step === 1 && !isPortrait && (
          <motion.div key={`slide-${slide}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4"
          >
            <div className="absolute top-4 sm:top-6 w-full flex justify-center z-50">
              <Typewriter key={slide} text={memories[slide].text} />
            </div>

            <div className="flex flex-row gap-3 sm:gap-6 justify-center items-center w-full max-h-[75vh]">
              {[memories[slide].left, memories[slide].right].map((img, idx) => (
                <div key={idx} className="relative h-[65vh] sm:h-[70vh] aspect-[3/4.2] shadow-[0_0_30px_rgba(255,0,127,0.35)] rounded-2xl border-2 border-[#ff007f]/40 overflow-hidden bg-white p-1.5">
                  <img src={img} className="w-full h-full object-cover rounded-xl" alt="Herti" />
                </div>
              ))}
            </div>

            {/* FLOATING NAVIGATION */}
            <div className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[60] transition-opacity duration-300 ${slide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <button onClick={handlePrev} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md active:scale-90 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            </div>

            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[60]">
              <button onClick={handleNext} className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#ff007f] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)] active:scale-90 transition-all">
                {slide === memories.length - 1 ? "❤️" : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && !isPortrait && (
          <motion.div key="heart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-10">
            <button onClick={() => { setDirection(-1); setStep(1); }} className="absolute top-4 right-4 z-[60] text-white/40 text-[8px] uppercase tracking-widest hover:text-[#ff007f] bg-black/20 px-3 py-1 rounded-full">← Back</button>
            
            {burstPhotos.map((img, i) => (
              <motion.div key={i} initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ x: heartCoords[i]?.x || 0, y: heartCoords[i]?.y || 0, scale: window.innerHeight < 500 ? 0.75 : 0.95, rotate: (i % 2 === 0 ? 5 : -5) }}
                transition={{ type: "spring", stiffness: 40, damping: 14, delay: i * 0.04 }}
                className="absolute w-20 h-28 sm:w-24 sm:h-34 md:w-32 md:h-44 bg-white p-1.5 shadow-2xl border border-[#ff007f]/40 rounded-lg"
              >
                <img src={img} className="w-full h-full object-cover rounded-sm" alt="heart" />
              </motion.div>
            ))}

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} className="z-50">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={() => setIsLetterOpen(true)}
                className="relative w-28 h-18 sm:w-36 sm:h-24 bg-[#ff85a2] rounded-br-xl rounded-bl-xl shadow-[0_20px_50px_rgba(255,133,162,0.5)] cursor-pointer flex items-center justify-center border-t border-white/30"
              >
                <div className="absolute top-0 left-0 w-full h-0 border-l-[56px] sm:border-l-[72px] border-l-transparent border-r-[56px] sm:border-r-[72px] border-r-transparent border-t-[36px] sm:border-t-[48px] border-t-[#ffb3c1]" />
                <span className="text-white text-[9px] sm:text-[11px] font-black tracking-widest mt-6 drop-shadow-md">OPEN ME ❤️</span>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isLetterOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                >
                  <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
                    className="relative w-full max-w-2xl bg-[#fffaf5] p-8 sm:p-14 rounded-xl shadow-2xl border-l-[12px] border-[#ff85a2] overflow-y-auto max-h-[85vh]"
                  >
                    <button onClick={() => setIsLetterOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-[#ff007f] transition-transform active:scale-75">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="font-serif text-stone-900 space-y-5 antialiased">
                        <h3 className="text-2xl font-bold italic text-[#ff007f] border-b border-[#ff85a2]/20 pb-2">Hii Herti...</h3>
                        <div className="text-sm sm:text-base leading-relaxed space-y-5 tracking-wide">
                          <p>Happy 18th Birthday. Today is not merely a change in numbers, but the beautiful beginning of your journey into adulthood. I hope the world treats you with kindness, and may every path you choose lead you to the most sincere kind of happiness.</p>
                          <p>Thank you for being my "home"—the place where I always find peace amidst the noise and weariness of this world. I am truly grateful to the universe because, out of all the infinite possibilities, it allowed our paths to cross.</p>
                          <p>Please, remain the compassionate Herti I’ve always known—the one whose presence brings warmth and whose soft laughter has a way of healing everything. Never hesitate to take bigger steps, for I will always be the first person to stand proud, watching you shine in your own unique way.</p>
                          <p className="text-stone-500 italic text-[12px] sm:text-[13px] pt-4 border-t border-stone-200 leading-snug">
                            Perhaps today, there isn't much in the way of material things I can offer, and these lines of words fall short of describing how much you truly mean to me. Forgive me if my hands are not gifted at weaving poetry, but please know that every prayer and every ounce of sincerity within them is truly yours.
                          </p>
                          <div className="pt-6">
                            <p className="italic text-[#ff85a2] font-semibold">With all my love,</p>
                            <p className="font-bold text-lg text-stone-900">- Someone who's lucky to have you -</p>
                          </div>
                        </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default PhotoBook;