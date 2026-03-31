import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Pesan khusus untuk HERTI
    const message = "HAPPY BIRTHDAY HERTI ❤ ";
    const letters = message.split("");
    
    const fontSize = 18; 
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // 1. Lapisan Hitam Pekat (Deep Black)
      // Kita timpa dengan hitam yang sedikit transparan (0.1) 
      // supaya teks sebelumnya memudar secara perlahan (efek ekor)
      // tapi tetap menjaga warna dasar tetap hitam.
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `bold ${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        
        // 2. Logika Warna: Pink & Putih-Pink (Tanpa Flash mengganggu)
        const rand = Math.random();
        
        if (rand > 0.98) {
          // Kepala hujan (sedikit lebih terang tapi tidak flash putih)
          ctx.fillStyle = "#ffe4e6"; 
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#fb7185";
        } else {
          // Badan hujan (Pink Estetik)
          ctx.fillStyle = "#fb7185"; 
          ctx.shadowBlur = 2;
          ctx.shadowColor = "#fb7185";
        }

        // Gambar teksnya
        ctx.fillText(text, i * fontSize, y * fontSize);
        
        // Reset shadow agar tidak berat di performa
        ctx.shadowBlur = 0;

        // Reset drop ke atas secara acak
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 40); 
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // Background hitam di CSS sebagai jaring pengaman terakhir
      className="fixed inset-0 z-0 pointer-events-none bg-black" 
    />
  );
};

export default MatrixRain;