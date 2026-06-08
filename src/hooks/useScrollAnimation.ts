import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null); // We type it as any or HTMLElement to fit various HTML elements

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible to avoid repeating the animation when scrolling back
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}
