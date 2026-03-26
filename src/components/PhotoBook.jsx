import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const memories = [
  { left: "/Foto (2).jpg", right: "/Foto (1).jpg", text: "Di titik ini semua bermula, saat semesta memperkenalkan kita ✨" },
  { left: "/Foto (3).JPG", right: "/Foto (4).png", text: "Bangga melihat kita yang sekarang. Let's grow and grow up together! ❤️" },
  { left: "/Foto (5).png", right: "/Foto (6).jpg", text: "Selamat ke-18. Semoga kedewasaan membawamu pada bahagia yang tak putus 💍" },
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
    <motion.h2 className="text-white font-medium tracking-tight text-[8px] sm:text-[10px] md:text-xs uppercase bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-lg border border-[#ff007f]/30 shadow-lg text-center max-w-[85vw] leading-tight z-50">
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
      setStep(2);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#ff007f', '#ffffff'] });
    }
  };

  const handlePrev = () => {
    if (slide > 0) {
      setDirection(-1);
      setSlide(slide - 1);
    }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 500 : -500, opacity: 0, rotateY: direction > 0 ? 45 : -45 }),
    center: { x: 0, opacity: 1, rotateY: 0, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } },
    exit: (direction) => ({ x: direction < 0 ? 500 : -500, opacity: 0, rotateY: direction < 0 ? 45 : -45, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } })
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black font-sans flex flex-col items-center justify-center overflow-hidden perspective-1000">
      
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
            <div className="relative w-[170px] h-[230px] sm:w-[200px] sm:h-[280px] bg-white rounded-xl flex flex-col items-center justify-center p-6 border-2 border-[#ff007f] shadow-2xl">
                <h1 className="text-stone-800 font-black text-xl italic uppercase">FOR <span className="text-[#ff007f]">Herti.</span></h1>
                <p className="text-[7px] text-stone-400 mt-4 uppercase tracking-[0.3em] animate-pulse">Tap to Open</p>
            </div>
          </motion.div>
        )}

        {step === 1 && !isPortrait && (
          <motion.div key={`slide-${slide}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit"
            className="relative z-10 w-full h-full grid grid-rows-[auto_1fr_auto] items-center justify-items-center py-2 sm:py-4 px-2"
          >
            <div className="w-full flex justify-center self-start mt-2 h-10">
              <Typewriter key={slide} text={memories[slide].text} />
            </div>

            <div className="flex flex-row gap-2 sm:gap-4 justify-center items-center w-full min-h-0">
              {[memories[slide].left, memories[slide].right].map((img, idx) => (
                <div key={idx} className="relative h-[60vh] sm:h-[65vh] md:h-[72vh] aspect-[3/4] shadow-[0_0_25px_rgba(255,0,127,0.4)] rounded-xl border-2 border-[#ff007f]/40 overflow-hidden bg-white p-1">
                  <img src={img} className="w-full h-full object-cover rounded-md" alt="Herti" />
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-4 self-end pb-3">
              <button onClick={handlePrev} disabled={slide === 0}
                className={`px-6 py-2 border border-[#ff007f]/50 text-white rounded-full font-bold text-[8px] sm:text-[10px] uppercase tracking-widest transition-all ${slide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-[#ff007f]/10'}`}>
                ← Prev
              </button>
              <button onClick={handleNext} className="px-8 py-2.5 bg-[#ff007f] text-white rounded-full font-bold text-[8px] sm:text-[10px] uppercase tracking-[0.2em] shadow-[0_0_15px_#ff007f] active:scale-95 transition-all">
                {slide === memories.length - 1 ? "Final Surprise ❤️" : "Next →"}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && !isPortrait && (
          <motion.div key="heart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center z-10">
            <button onClick={() => { setDirection(-1); setStep(1); }} className="absolute top-4 left-4 z-[60] text-white/40 text-[8px] uppercase tracking-widest hover:text-[#ff007f]">← Back</button>
            
            {/* FOTO-FOTO HATI */}
            {burstPhotos.map((img, i) => (
              <motion.div key={i} initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ x: heartCoords[i]?.x || 0, y: heartCoords[i]?.y || 0, scale: window.innerHeight < 500 ? 0.7 : 0.9, rotate: (i % 2 === 0 ? 5 : -5) }}
                transition={{ type: "spring", stiffness: 40, damping: 14, delay: i * 0.04 }}
                className="absolute w-18 h-24 sm:w-22 sm:h-30 md:w-28 md:h-40 bg-white p-1.5 shadow-2xl border border-[#ff007f]/40 rounded-lg"
              >
                <img src={img} className="w-full h-full object-cover rounded-sm" alt="heart" />
              </motion.div>
            ))}

            {/* AMPLOP DI TENGAH */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="z-50"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={() => setIsLetterOpen(true)}
                className="relative w-24 h-16 sm:w-32 sm:h-20 bg-[#ff85a2] rounded-br-lg rounded-bl-lg shadow-2xl cursor-pointer flex items-center justify-center border-t border-white/20"
              >
                <div className="absolute top-0 left-0 w-full h-0 border-l-[48px] sm:border-l-[64px] border-l-transparent border-r-[48px] sm:border-r-[64px] border-r-transparent border-t-[32px] sm:border-t-[40px] border-t-[#ffb3c1]" />
                <span className="text-white text-[10px] font-bold tracking-tighter mt-4">OPEN ME</span>
              </motion.div>
            </motion.div>

            {/* OVERLAY SURAT */}
            <AnimatePresence>
              {isLetterOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 100 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                  <div className="relative w-full max-w-2xl bg-[#fff9f2] p-8 sm:p-12 rounded-sm shadow-[20px_20px_60px_rgba(0,0,0,0.5)] border-l-[10px] border-[#ff85a2] overflow-y-auto max-h-[90vh]">
                    {/* Tombol Silang */}
                    <button 
                      onClick={() => setIsLetterOpen(false)}
                      className="absolute top-4 right-4 text-stone-400 hover:text-[#ff007f] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Isi Surat */}
                    <div className="font-serif text-stone-800 space-y-4 sm:space-y-6">
                      <h3 className="text-xl sm:text-2xl font-bold italic text-[#ff007f]">Haii Hertii...</h3>
                      <div className="text-sm sm:text-base leading-relaxed space-y-4">
                        <p>Selamat ulang tahun yang ke-18. Angka ini bukan sekadar pergantian umur, tapi awal dari langkah yang lebih dewasa. Semoga hal-hal baik selalu menyertai setiap jalan yang kamu pilih.</p>
                        <p>Terima kasih telah menjadi rumah bagiku. Di antara hiruk pikuk dunia, bersamamu selalu terasa tenang. Aku bersyukur semesta membiarkan garis hidup kita bersilangan.</p>
                        <p>Tetaplah menjadi Hertii yang penuh kasih, yang tawanya selalu menyembuhkan. Jangan pernah takut melangkah, karena aku akan selalu bangga melihatmu tumbuh dan bersinar dengan caramu sendiri.</p>
                        <p className="pt-4 italic text-[#ff85a2] font-semibold">With all my love,</p>
                        <p className="font-bold text-lg">- Someone who lucky to have you -</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </div>
  );
};

export default PhotoBook;