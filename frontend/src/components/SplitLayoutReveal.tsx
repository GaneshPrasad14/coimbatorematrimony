import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface SplitLayoutRevealProps {
  onComplete: () => void;
}

const SplitLayoutReveal: React.FC<SplitLayoutRevealProps> = ({ onComplete }) => {
  const [selectedSide, setSelectedSide] = useState<'men' | 'women' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSideClick = (side: 'men' | 'women') => {
    setSelectedSide(side);
    setIsAnimating(true);

    // Navigate after animation
    setTimeout(() => {
      onComplete();
      window.location.href = side === 'men' ? '/men' : '/women';
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col md:flex-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Left Side - Men */}
        <motion.div
          className="flex-1 relative overflow-hidden cursor-pointer"
          onClick={() => handleSideClick('men')}
          animate={
            selectedSide === 'men'
              ? {
                  flex: 1,
                  transition: { duration: 1, ease: "easeInOut" }
                }
              : selectedSide === 'women'
              ? {
                  flex: 0,
                  transition: { duration: 1, ease: "easeInOut" }
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/groomreal.JPG)` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={
              selectedSide === 'men'
                ? { opacity: 1, scale: 1 }
                : selectedSide === 'women'
                ? { opacity: 0, scale: 0.8 }
                : {}
            }
            transition={{ delay: selectedSide === 'men' ? 0.5 : 0 }}
          >
            <div className="text-center text-white">
              <motion.h2
                className="font-luxury text-6xl md:text-8xl font-bold mb-4"
                animate={
                  selectedSide === 'men'
                    ? { scale: 1.2, textShadow: "0 0 30px rgba(255,255,255,0.5)" }
                    : {}
                }
              >
                GROOM
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl"
                animate={
                  selectedSide === 'men'
                    ? { opacity: 1 }
                    : selectedSide === 'women'
                    ? { opacity: 0 }
                    : {}
                }
              >
                Find Your Perfect Match
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Women */}
        <motion.div
          className="flex-1 relative overflow-hidden cursor-pointer"
          onClick={() => handleSideClick('women')}
          animate={
            selectedSide === 'women'
              ? {
                  flex: 1,
                  transition: { duration: 1, ease: "easeInOut" }
                }
              : selectedSide === 'men'
              ? {
                  flex: 0,
                  transition: { duration: 1, ease: "easeInOut" }
                }
              : {}
          }
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/40">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/bridereal.JPG)` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={
              selectedSide === 'women'
                ? { opacity: 1, scale: 1 }
                : selectedSide === 'men'
                ? { opacity: 0, scale: 0.8 }
                : {}
            }
            transition={{ delay: selectedSide === 'women' ? 0.5 : 0 }}
          >
            <div className="text-center text-white">
              <motion.h2
                className="font-luxury text-6xl md:text-8xl font-bold mb-4"
                animate={
                  selectedSide === 'women'
                    ? { scale: 1.2, textShadow: "0 0 30px rgba(255,255,255,0.5)" }
                    : {}
                }
              >
                BRIDE
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl"
                animate={
                  selectedSide === 'women'
                    ? { opacity: 1 }
                    : selectedSide === 'men'
                    ? { opacity: 0 }
                    : {}
                }
              >
                Find Your Perfect Match
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Close Button */}
        <motion.button
          className="absolute top-8 right-8 z-10 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ✕
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplitLayoutReveal;