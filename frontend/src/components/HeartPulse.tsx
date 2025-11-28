import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartPulseProps {
  size?: number;
  className?: string;
}

const HeartPulse: React.FC<HeartPulseProps> = ({ size = 24, className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart
          size={size}
          className="text-red-500 fill-red-500"
        />
      </motion.div>
    </div>
  );
};

export default HeartPulse;