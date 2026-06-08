import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';
import ScrollProgress from './components/ScrollProgress';

import { ThemeProvider } from './contexts/ThemeProvider';

// Lazy load sections below the fold for performance
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const AIWorkflow = React.lazy(() => import('./components/AIWorkflow'));
const Contact = React.lazy(() => import('./components/Contact'));

// Section loading placeholder skeleton
function SectionLoader() {
  return (
    <div className="py-32 flex flex-col items-center justify-center space-y-6 w-full">
      <div className="w-12 h-12 rounded-full border border-gold/20 border-t-gold animate-spin shadow-[0_0_15px_rgba(245,197,24,0.3)]" />
      <span className="text-xs font-mono tracking-[0.3em] text-gold/70 uppercase animate-pulse">
        Initializing...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="relative min-h-screen bg-background text-foreground font-sans transition-colors duration-500">
        
        {/* Global Overlays & Effects */}
        <div className="fixed inset-0 bg-grid-lines pointer-events-none z-0" />
        <div className="noise-overlay" />
        <ParticleField />
        <ScrollProgress />

        <Navbar />

        {/* Main Content Layout */}
        <main className="relative w-full overflow-hidden">
          {/* Hero section loads immediately for fast LCP */}
          <Hero />

          {/* Lazy loaded sections with fallback loading states */}
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AIWorkflow />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>
      </Router>
    </ThemeProvider>
  );
}
