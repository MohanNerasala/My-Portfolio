import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_WORDS = [
  "AI Application Developer_",
  "Full Stack Developer_"
];

export default function Hero() {
  const typedText = useTypewriter(TYPEWRITER_WORDS);

  const heading1Words = "FULL STACK".split(' ');
  const heading2Words = "AI APPLICATION DEVELOPER".split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 150
      }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gold rounded-full opacity-[0.07] blur-[120px]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-foreground rounded-full opacity-[0.03] blur-[100px]" />
      </div>

      <motion.div 
        className="z-10 flex flex-col items-center w-full max-w-5xl px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Name Label */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex items-center justify-center space-x-6 w-full mb-8"
        >
          <div className="h-[1px] bg-gold w-16 md:w-32 opacity-50" />
          <span className="text-gold font-sans tracking-[0.3em] text-xs md:text-sm font-semibold whitespace-nowrap">
            NERASALA MOHAN
          </span>
          <div className="h-[1px] bg-gold w-16 md:w-32 opacity-50" />
        </motion.div>

        {/* Massive Headings */}
        <div className="flex flex-col items-center text-center mb-6 w-full overflow-hidden">
          {/* Top smaller heading */}
          <h1 className="flex flex-nowrap justify-center gap-x-3 mb-6 whitespace-nowrap">
            {heading1Words.map((word, wIndex) => (
              <div key={`h1w-${wIndex}`} className="flex">
                {word.split('').map((char, index) => (
                  <motion.span
                    key={`h1c-${wIndex}-${index}`}
                    variants={letterVariants}
                    className="font-bebas text-foreground/80 text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[0.85] tracking-wide"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </h1>
          
          {/* Bottom larger heading */}
          <h1 className="flex flex-nowrap justify-center gap-x-2 md:gap-x-4 whitespace-nowrap">
            {heading2Words.map((word, wIndex) => (
              <div key={`h2w-${wIndex}`} className="flex">
                {word.split('').map((char, index) => (
                  <motion.span
                    key={`h2c-${wIndex}-${index}`}
                    variants={letterVariants}
                    className="font-bebas bg-gradient-to-r from-[#ffd700] to-[#f5c518] bg-clip-text text-transparent text-[8vw] sm:text-[50px] md:text-[70px] lg:text-[90px] xl:text-[100px] leading-[0.85]"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </h1>
        </div>

        {/* Separator */}
        <motion.div variants={fadeUpVariants} className="w-full max-w-md h-[1px] bg-gold/30 mb-8" />

        {/* Typist */}
        <motion.div variants={fadeUpVariants} className="h-8 mb-6">
          <p className="font-mono text-gold/90 text-lg md:text-xl tracking-wide">
            {typedText}
          </p>
        </motion.div>



        {/* CTA Buttons */}
        <motion.div 
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <a
            href="#projects"
            data-cursor="hover"
            className="group relative flex items-center space-x-2 bg-gold text-black px-8 py-4 rounded-full font-bold tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(245,197,24,0.4)] transition-all duration-300"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#contact"
            data-cursor="hover"
            className="flex items-center space-x-2 bg-transparent border border-foreground text-foreground px-8 py-4 rounded-full font-bold tracking-widest text-sm hover:scale-105 hover:border-gold hover:text-gold hover:shadow-[0_0_20px_var(--border-color)] transition-all duration-300"
          >
            <Download size={18} />
            <span>DOWNLOAD CV</span>
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 text-gold"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown size={32} className="opacity-70" />
      </motion.div>

    </section>
  );
}
