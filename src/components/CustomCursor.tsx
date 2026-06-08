import { motion } from 'framer-motion';
import { useCursorPosition } from '../hooks/useCursorPosition';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const { position, isHovering, isHoveringProject } = useCursorPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor only after first mouse move to prevent it appearing at 0,0
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);
    
    return () => window.removeEventListener('mousemove', handleFirstMove);
  }, []);

  // Check if device has a touch screen, if so disable custom cursor
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Inner Dot (Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-gold rounded-full pointer-events-none z-[100]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: isHoveringProject ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />

      {/* Outer Ring / Crosshair (Delayed) */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[99] rounded-full flex items-center justify-center ${
          isHoveringProject ? '' : 'border border-gold'
        }`}
        animate={{
          x: position.x - (isHovering ? 30 : 16),
          y: position.y - (isHovering ? 30 : 16),
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering && !isHoveringProject ? 'rgba(245, 197, 24, 0.15)' : 'transparent',
          scale: isHoveringProject ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      >
        {isHoveringProject && (
          <div className="relative w-full h-full animate-pulse flex items-center justify-center text-gold">
            {/* Crosshair lines */}
            <div className="absolute w-[2px] h-[20px] bg-gold shadow-[0_0_10px_rgba(245,197,24,0.8)]" />
            <div className="absolute w-[20px] h-[2px] bg-gold shadow-[0_0_10px_rgba(245,197,24,0.8)]" />
          </div>
        )}
      </motion.div>
    </>
  );
}
