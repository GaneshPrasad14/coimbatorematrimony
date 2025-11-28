import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'card' | 'image'>('default');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest && typeof target.closest === 'function') {
        if (target.closest('button, a, [role="button"]')) {
          setCursorType('button');
          setIsHovering(true);
        } else if (target.closest('[data-cursor="card"]')) {
          setCursorType('card');
          setIsHovering(true);
        } else if (target.closest('img')) {
          setCursorType('image');
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = () => {
      setCursorType('default');
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [mouseX, mouseY]);

  const getCursorSize = () => {
    switch (cursorType) {
      case 'button':
        return 40;
      case 'card':
        return 60;
      case 'image':
        return 50;
      default:
        return 20;
    }
  };

  const getCursorColor = () => {
    switch (cursorType) {
      case 'button':
        return 'rgba(0, 0, 0, 0.8)';
      case 'card':
        return 'rgba(59, 130, 246, 0.6)';
      case 'image':
        return 'rgba(16, 185, 129, 0.6)';
      default:
        return 'rgba(255, 255, 255, 0.8)';
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="rounded-full border-2 border-white"
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          backgroundColor: getCursorColor(),
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;