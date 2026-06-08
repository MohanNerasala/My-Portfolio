import { useEffect, useRef } from 'react';

export const useCodeRain = (opacity: number = 0.03) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to use in the rain
    const chars = '0 1 { } < > / ='.split(' ');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    // Initialize drops array
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start with random negative offsets so they don't all fall at once
    }

    let animationFrameId: number;

    const draw = () => {
      // Create trailing effect by drawing semi-transparent black over the canvas
      ctx.fillStyle = `rgba(8, 10, 12, 0.1)`; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `rgba(0, 229, 204, ${opacity})`;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Randomly skip drawing to create gaps
        if (Math.random() > 0.1) {
          ctx.fillText(text, x, y);
        }

        // Reset drop to top randomly when it hits bottom
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Use IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    });

    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return canvasRef;
};
