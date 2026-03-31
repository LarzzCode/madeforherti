import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const GiftBox = ({ onOpen }) => (
  <div className="flex flex-col items-center space-y-6">
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      onClick={onOpen}
      className="cursor-pointer bg-white p-8 rounded-[40px] shadow-[0_0_50px_rgba(251,113,133,0.4)] border-4 border-rose-200 text-rose-500"
    >
      <Gift size={80} strokeWidth={1.5} />
    </motion.div>
    <p className="text-white font-dancing text-2xl drop-shadow-md">Klik kado untuk Herti 🎁</p>
  </div>
);

export default GiftBox;