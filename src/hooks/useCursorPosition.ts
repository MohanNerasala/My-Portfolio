import { useState, useEffect } from 'react';

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

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

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return { position, isHovering, isHoveringProject };
}
