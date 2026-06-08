import { create } from 'zustand';

interface PortfolioState {
  activeSection: string;
  scrollProgress: number;
  colorMode: 'dark' | 'light';
  setActiveSection: (section: string) => void;
  setScrollProgress: (progress: number) => void;
  setColorMode: (mode: 'dark' | 'light') => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'hero',
  scrollProgress: 0,
  colorMode: 'dark',
  setActiveSection: (section) => set({ activeSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setColorMode: (mode) => set({ colorMode: mode }),
}));
