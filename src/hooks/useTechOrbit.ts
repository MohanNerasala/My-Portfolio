import { useEffect, useRef } from 'react';

export interface TechNodeConfig {
  id: string;
  label: string;
  orbit: 'inner' | 'outer';
  angle: number;
  color: string;
}

export const useTechOrbit = (
  nodes: TechNodeConfig[], 
  innerRadius: number = 110, 
  outerRadius: number = 175, 
  innerSpeed: number = 18, 
  outerSpeed: number = 28
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const time = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;

    const render = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000; // in seconds
      lastTimestamp = timestamp;

      if (!isPaused.current && containerRef.current) {
        time.current += deltaTime;

        // Find all node elements
        const nodeEls = containerRef.current.querySelectorAll('.tech-node');
        
        nodeEls.forEach((el, index) => {
          const node = nodes[index];
          const isInner = node.orbit === 'inner';
          const radius = isInner ? innerRadius : outerRadius;
          const speed = isInner ? (Math.PI * 2) / innerSpeed : (Math.PI * 2) / outerSpeed;
          
          // Calculate current angle based on initial angle + time elapsed
          const currentAngle = node.angle + (time.current * speed);
          
          // Parametric equation for circle
          const x = Math.cos(currentAngle) * radius;
          const y = Math.sin(currentAngle) * radius;

          // Apply translation. Notice we don't counter-rotate because the container itself 
          // isn't rotating, just the position of the nodes are changing around the center.
          (el as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!animationFrameId) {
          lastTimestamp = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      }
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [nodes, innerRadius, outerRadius, innerSpeed, outerSpeed]);

  const handleMouseEnter = () => { isPaused.current = true; };
  const handleMouseLeave = () => { isPaused.current = false; };

  return { containerRef, handleMouseEnter, handleMouseLeave };
};
