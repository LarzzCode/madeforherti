import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// ==========================================
// 1. AREA PENGISIAN FOTO
// ==========================================
const memories = [
  { left: "/foto1.JPG", right: "/foto2.JPG", text: "Happy Birthday Sayang ✨" },
  { left: "/foto3.JPG", right: "/foto4.JPG", text: "Setiap Momen Berharga ❤️" },
  { left: "/foto5.JPG", right: "/foto6.JPG", text: "Selamanya Bersamamu 💍" },
];

const burstPhotos = [
  "/love (1).JPG", "/love (2).JPG", "/love (3).JPG", "/love (4).JPG",
  "/love (5).JPG", "/love (6).JPG", "/love (7).jpg", "/love (8).JPG",
  "/love (9).JPG", "/love (10).JPG", "/love (11).JPG", "/love (12).JPG",
  "/love (13).JPG", "/love (14).JPG", "/love (15).JPG", "/love (16).JPG",
  "/love (17).JPG", "/love (18).JPG", "/love (19).JPG", "/love (20).JPG",
  "/love (21).jpg", "/love (22).JPG"
];

const PhotoBook = () => {
  const [step, setStep] = useState(0); 
  const [slide, setSlide] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);

  // --- 2. DETEKSI ORIENTASI LAYAR ---
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // --- 3. LOGIKA KOORDINAT HATI OTOMATIS ---
  const heartCoords = useMemo(() => {
    const points = [];
    const num = burstPhotos.length;
    for (let i = 0; i < num; i++) {
      const t = (i / num) * 2 * Math.PI;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      // Penyesuaian skala untuk mobile landscape agar tidak terlalu besar
      const scaleX = window.innerWidth < 768 ? 12 : 18;
      const scaleY = window.innerWidth < 768 ? 8 : 12;
      
      points.push({ x: x * scaleX, y: y * scaleY });
    }
    return points;
  }, [isPortrait]);

  const stars = useMemo(() => [...Array(80)].map((_, i) => ({
    id: i, size: Math.random() * 2 + 'px', top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', duration: Math.random() * 3 + 2 + 's'
  })), []);

  const handleNext = () => {
    if (slide < memories.length - 1) {
      setSlide(slide + 1);
    } else {
      setStep(2);
      confetti({ particleCount: 300, spread: 200, colors: ['#ff007f', '#ffffff'] });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen z-20 overflow-hidden bg-black font-sans">
      
      {/* --- 4. OVERLAY PROTEKSI PORTRAIT --- */}
      <AnimatePresence>
        {isPortrait && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
              className="w-12 h-20 border-2 border-white rounded-lg mb-6 flex items-center justify-center"
            >
              <div className="w-8 h-1 bg-white/20 rounded-full mb-12" />
            </motion.div>
            <h2 className="text-white font-bold tracking-widest text-sm uppercase mb-2">Gunakan Mode Landscape</h2>
            <p className="text-stone-500 text-[10px] uppercase tracking-widest">Putar HP anda untuk memulai ✨</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STARFIELD */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div key={star.id} className="absolute bg-white rounded-full opacity-40 shadow-[0_0_5px_white]"
            style={{ width: star.size, height: star.size, top: star.top, left: star.left, animation: `twinkle ${star.duration} infinite` }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && !isPortrait && (
          <motion.div 
            key="cover" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            onClick={() => setStep(1)} className="cursor-pointer relative z-10"
          >
            <div className="absolute -inset-2 bg-[#ff007f] rounded-2xl blur-xl opacity-60 animate-pulse"></div>
            <div className="relative w-[220px] h-[280px] bg-white rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl border-2 border-[#ff007f]">
                <h1 className="text-stone-800 font-black text-2xl italic uppercase tracking-tighter">FOR <span className="text-[#ff007f]">ANITA.</span></h1>
                <p className="text-[9px] tracking-[0.4em] text-stone-400 mt-6 uppercase font-bold animate-bounce text-center">Tap to Open</p>
            </div>
          </motion.div>
        )}

        {step === 1 && !isPortrait && (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 z-10 w-full px-4">
            <motion.div key={slide} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-1">
               <h2 className="text-white font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase bg-white/10 px-6 py-1 rounded-full border border-[#ff007f]/50 shadow-[0_0_15px_#ff007f]">
                 {memories[slide].text}
               </h2>
            </motion.div>

            <div className="flex flex-row gap-4 md:gap-8 justify-center items-center">
              {[memories[slide].left, memories[slide].right].map((img, idx) => (
                <div key={idx} className="relative shadow-[0_0_20px_#ff007f] rounded-lg">
                  <div className="w-[150px] h-[200px] md:w-[260px] md:h-[340px] bg-white p-1 rounded-lg overflow-hidden border-2 border-[#ff007f]">
                    <img src={img} className="w-full h-full object-cover rounded-sm" alt="Anita" 
                         onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Foto+Error"; }} />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="mt-2 px-12 py-2 bg-[#ff007f] text-white rounded-full font-bold text-[10px] tracking-widest uppercase shadow-[0_0_15px_#ff007f] active:scale-90 transition-transform">
              {slide === 2 ? "Final Surprise ❤️" : "Next Page →"}
            </button>
          </motion.div>
        )}

        {step === 2 && !isPortrait && (
          <motion.div key="heart" className="absolute inset-0 flex items-center justify-center">
            {burstPhotos.map((img, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{ 
                  x: heartCoords[i]?.x || 0, 
                  y: heartCoords[i]?.y || 0, 
                  scale: window.innerWidth < 768 ? 0.6 : 0.8, 
                  rotate: (Math.random() - 0.5) * 10 
                }}
                transition={{ type: "spring", stiffness: 35, damping: 12, delay: i * 0.08 }}
                className="absolute w-20 h-28 md:w-28 md:h-40 bg-white p-1 shadow-[0_0_20px_#ff007f] border border-[#ff007f] rounded-lg"
              >
                <img src={img} className="w-full h-full object-cover rounded-sm" alt="heart" 
                     onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Error"; }} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,800&family=Inter:wght@400;900&display=swap');
      `}</style>
    </div>
  );
};

export default PhotoBook;