import React, { useEffect, useRef } from 'react';

const MusicPlayer = ({ play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Memberikan delay sedikit agar tidak kaget
    if (play) {
      setTimeout(() => {
        audioRef.current.play().catch(err => console.log("User interaction needed for audio"));
      }, 1000);
    }
  }, [play]);

  return (
    <audio ref={audioRef} loop>
      <source src="/music/happy.mp3" type="audio/mpeg" />
    </audio>
  );
};

export default MusicPlayer;