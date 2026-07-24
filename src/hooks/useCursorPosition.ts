import { useState, useEffect } from 'react';

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);

  useEffect(() => {
    // Only attach cursor tracking on devices with a fine pointer (e.g. mice, not touchscreens)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Provide a way to globally set hover states based on data attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
      }
      if (target.closest('[data-cursor="project"]')) {
        setIsHoveringProject(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('[data-cursor="hover"]')) {
        setIsHovering(false);
      }
      if (target.closest('[data-cursor="project"]')) {
        setIsHoveringProject(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return { position, isHovering, isHoveringProject };
}
