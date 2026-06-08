import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import type { NavLink } from '../types';
import { useTheme } from '../contexts/ThemeProvider';

const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-navScrolled backdrop-blur-[20px] border-b border-border'
            : 'bg-transparent border-b border-transparent py-2'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center space-x-2 group z-50">
            <div className="w-8 h-8 flex items-center justify-center bg-gold text-black font-bebas text-xl leading-none">
              NM
            </div>
            <span className="font-bebas text-2xl tracking-wide text-foreground group-hover:text-gold transition-colors">
              .DEV
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 group py-1"
                data-cursor="hover"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full origin-left" />
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Hire Me (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="text-muted hover:text-gold transition-colors duration-300 p-2 rounded-full focus:outline-none"
              aria-label="Toggle Theme"
              data-cursor="hover"
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <a
              href="#contact"
              className="px-6 py-2 border border-gold text-gold text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-black transition-all duration-300 rounded-sm"
              data-cursor="hover"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-4 z-50">
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 bg-background/95 backdrop-blur-[20px] flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-foreground hover:text-gold text-4xl font-bebas tracking-wider transition-colors w-full text-center py-4 border-b border-border"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 px-10 py-4 border border-gold text-gold text-xl font-bebas tracking-widest hover:bg-gold hover:text-black transition-all duration-300 w-full max-w-xs text-center"
              >
                HIRE ME
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
