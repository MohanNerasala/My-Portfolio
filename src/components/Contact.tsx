import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';

export default function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  const cards = [
    {
      icon: <Github size={32} />,
      title: "github.com/chakrimohan",
      btnText: "View Code",
      href: "#",
    },
    {
      icon: <Linkedin size={32} />,
      title: "Connect with me",
      btnText: "Open LinkedIn",
      href: "#",
    },
    {
      icon: <FileText size={32} />,
      title: "Download CV",
      btnText: "Get Resume",
      href: "#",
    }
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      
      {/* Giant Watermark */}


      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Heading */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2 
            className="font-bebas text-6xl md:text-[100px] lg:text-[130px] leading-[0.85] text-foreground tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            LET'S
          </motion.h2>
          <motion.h2 
            className="font-bebas text-[14vw] sm:text-6xl md:text-[100px] lg:text-[130px] leading-[0.85] text-gold tracking-wide whitespace-nowrap"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            WORK TOGETHER
          </motion.h2>
          
          <motion.p 
            className="text-muted font-sans text-base md:text-lg mt-8 max-w-xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Currently open to full-time roles & freelance projects
          </motion.p>
        </div>

        {/* Contact Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-sm sm:max-w-md lg:max-w-none mx-auto w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              variants={cardVariants}
              className="glass-panel p-10 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-2 hover:border-gold hover:shadow-[0_20px_40px_rgba(245,197,24,0.15)] bg-cardBg border-border transition-all duration-500"
              data-cursor="hover"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h3 className="text-foreground font-sans text-lg font-medium tracking-wide mb-8">
                {card.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-gold font-bold tracking-widest text-sm uppercase group-hover:bg-gold group-hover:text-black px-6 py-3 rounded-full border border-gold/30 group-hover:border-gold transition-all duration-300">
                <span>{card.btnText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>



      </div>
    </section>
  );
}
