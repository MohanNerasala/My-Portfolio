import { useState, useEffect } from 'react';

export const useSlotCounter = (target: string, duration: number = 1.4, trigger: boolean = false) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        // Scramble logic based on the target length
        let randomStr = '';
        for (let i = 0; i < target.length; i++) {
          // If the target char is not a number (e.g. +, ∞), still scramble it with a random symbol/number
          randomStr += Math.random() > 0.5 ? Math.floor(Math.random() * 10).toString() : '#';
        }
        setDisplayValue(randomStr);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, trigger]);

  return displayValue;
};
