import { motion, useInView, type Variants } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import bgVideo from '../assets/my video.mp4';

export default function Hero() {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const isInView = useInView(heroRef, { amount: 0.2 });

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    // Synchronously update the video element to satisfy strict mobile browser (iOS) user gesture requirements
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.play().catch(e => console.error("Play failed after unmute:", e));
      }
    }
  };

  // Attempt to autoplay with sound. If blocked, wait for first user interaction (click/touch) to unmute automatically.
  useEffect(() => {
    if (!videoRef.current) return;
    
    // Try to play with sound immediately
    videoRef.current.muted = false;
    const playPromise = videoRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser blocked it. Play muted so video at least moves.
        setIsMuted(true);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(e => console.error("Autoplay failed:", e));
        }

        // Add a one-time listener to unmute instantly on the user's first touch/click anywhere
        const enableAudio = (e: Event) => {
          // Ignore if the user directly clicked the mute button (let the button's own handler do it)
          if ((e.target as HTMLElement)?.closest('button')) return;

          setIsMuted(false);
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play().catch(() => {});
          }
          document.removeEventListener('click', enableAudio);
          document.removeEventListener('touchstart', enableAudio);
        };

        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });
      });
    }
  }, []);

  // Ensure video stays synced with state, and force mute when scrolled away
  useEffect(() => {
    if (videoRef.current) {
      if (!isInView) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = isMuted;
      }
    }
  }, [isMuted, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] // Custom ease-out
      }
    }
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen lg:h-screen w-full flex flex-col lg:flex-row items-center lg:items-center justify-start lg:justify-start overflow-hidden bg-black pb-12 lg:pb-0">
      {/* Background Video */}
      <div className="relative w-full h-[55vh] md:h-[60vh] lg:absolute lg:inset-0 lg:h-full flex-shrink-0">
        <video 
          ref={videoRef}
          src={bgVideo} 
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-[96%_center] lg:object-center pointer-events-none"
        />
        
        {/* Gradient Overlay for Mobile: Fades bottom to top to blend into black background */}
        <div className="absolute inset-x-0 -bottom-[2px] h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent lg:hidden z-10 pointer-events-none" />
        
        {/* Gradient Overlay for Desktop: Dark to transparent (left to right) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />
        
        {/* Optional subtle grain/noise for premium texture */}
        <div className="absolute inset-0 noise-overlay hidden md:block opacity-30 z-10 pointer-events-none" />

        {/* Audio Toggle Button - Positioned over video on mobile, bottom right on desktop */}
        <motion.button
          onClick={toggleMute}
          data-cursor="hover"
          className="absolute bottom-3 right-5 lg:bottom-8 lg:right-8 z-30 p-2 lg:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:text-gold hover:border-gold hover:bg-black/70 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] group pointer-events-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          title={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX size={16} className="lg:w-6 lg:h-6 pointer-events-none" /> : <Volume2 size={16} className="lg:w-6 lg:h-6 pointer-events-none" />}
          
          {/* Helper tooltip on hover */}
          <span className="hidden lg:block absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md text-xs font-semibold tracking-wider rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isMuted ? "UNMUTE AUDIO" : "MUTE AUDIO"}
          </span>
        </motion.button>
      </div>

      {/* Main Content */}
      <motion.div 
        className="z-20 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-7xl mx-auto px-5 sm:px-12 lg:px-24 -mt-16 lg:mt-0 lg:pt-20 pointer-events-none relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-[90vw] sm:max-w-md lg:max-w-3xl pointer-events-auto flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start space-x-4 lg:space-x-6 mb-3 lg:mb-6">
            <div className="h-[1px] lg:h-[2px] bg-gold w-10 lg:w-16 shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
            <span className="text-gold font-sans tracking-[0.3em] lg:tracking-[0.4em] text-[11px] lg:text-sm font-bold uppercase drop-shadow-md">
              Mohan
            </span>
            <div className="h-[1px] lg:h-[2px] bg-gold w-10 lg:hidden shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-6 lg:mb-6 flex flex-col items-center lg:items-start w-full">
            <h1 className="font-bebas text-white text-[42px] sm:text-[50px] lg:text-[110px] leading-[0.85] tracking-wide drop-shadow-2xl mb-3 lg:mb-0">
              FULL STACK
            </h1>
            <h2 className="font-bebas text-[#ffd700] lg:bg-gradient-to-r lg:from-[#ffd700] lg:via-[#ffeb73] lg:to-[#d4af37] lg:bg-clip-text lg:text-transparent text-[26px] sm:text-[32px] lg:text-[95px] leading-[0.9] drop-shadow-2xl pb-1 lg:pb-2 text-center lg:text-left">
              AI APPLICATION DEVELOPER
            </h2>
          </motion.div>

          {/* Refined Minimalist Introduction Card */}
          <motion.div variants={itemVariants} className="mb-8 w-full flex justify-center lg:justify-start">
            <div className="inline-block bg-[#111111]/80 lg:bg-white/5 backdrop-blur-md border border-white/10 rounded-[1rem] lg:rounded-xl px-5 py-4 lg:px-4 lg:py-2.5 shadow-xl text-center lg:text-left">
              <p className="text-gray-300 text-[13px] lg:text-base font-light leading-relaxed tracking-wide">
                Hi, I am <strong className="text-white font-medium">Mohan</strong>, a Full Stack AI Application Developer.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3.5 lg:gap-5 items-center justify-center lg:justify-start w-full lg:w-auto"
          >
            <a
              href="#projects"
              data-cursor="hover"
              className="w-full sm:w-auto group relative flex items-center justify-center space-x-3 bg-[#f5c518] lg:bg-gradient-to-r lg:from-[#ffd700] lg:to-[#f5c518] text-black px-8 lg:px-10 py-3.5 lg:py-4 rounded-full font-bold tracking-[0.2em] text-[12px] lg:text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(245,197,24,0.4)] transition-all duration-300"
            >
              <span>PORTFOLIO</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform lg:w-[18px] lg:h-[18px]" />
            </a>
            
            <a
              href="#contact"
              data-cursor="hover"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-[#0a0a0a] lg:bg-white/5 backdrop-blur-md border border-white/20 text-white px-8 lg:px-10 py-3.5 lg:py-4 rounded-full font-bold tracking-[0.2em] text-[12px] lg:text-sm hover:bg-white/10 hover:border-gold hover:text-gold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              <Mail size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span>CONTACT</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 text-gold z-20 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown size={32} className="opacity-70 drop-shadow-[0_0_10px_rgba(245,197,24,0.5)]" />
      </motion.div>
    </section>
  );
}
