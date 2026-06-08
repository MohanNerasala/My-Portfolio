import { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

export const useSectionTracker = (sectionId: string) => {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, [sectionId, setActiveSection]);
};
