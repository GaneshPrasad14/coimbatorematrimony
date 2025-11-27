import React from 'react';
import { motion } from 'framer-motion';

interface LiquidTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidTransition: React.FC<LiquidTransitionProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Liquid blob background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 0.1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.1)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M500,300 Q400,200 300,300 T100,500 Q200,600 300,500 T500,300 Q600,400 700,300 T900,500 Q800,600 700,500 T500,700 Q400,800 300,700 T100,500"
            fill="url(#liquidGradient)"
            initial={{
              d: "M500,500 Q500,500 500,500 T500,500 Q500,500 500,500 T500,500 Q500,500 500,500 T500,500 Q500,500 500,500 T500,500"
            }}
            animate={{
              d: "M500,300 Q400,200 300,300 T100,500 Q200,600 300,500 T500,300 Q600,400 700,300 T900,500 Q800,600 700,500 T500,700 Q400,800 300,700 T100,500"
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LiquidTransition;