import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import * as Icons from 'lucide-react';
import { aiToolsData } from '../data/skills';
import type { AITool } from '../types';

function getIcon(iconName: string) {
  const Icon = (Icons as any)[iconName] || Icons.Code;
  return <Icon size={40} strokeWidth={1.5} />;
}

export default function AIWorkflow() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  };

  return (
    <section className="relative py-32 bg-background overflow-hidden group/section">
      
      {/* Gold Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3CcolorMatrix type=%22matrix%22 values=%221 0 0 0 0.96 0 1 0 0 0.77 0 0 1 0 0.09 0 0 0 1 0%22 /%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        
        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="font-bebas text-5xl md:text-[80px] leading-none text-foreground tracking-wide mb-4">
            AI-POWERED <span className="text-gold">WORKFLOW</span>
          </h2>
          <p className="font-mono text-muted text-sm md:text-base uppercase tracking-widest">
            I don't just write code — I engineer with AI
          </p>
        </div>

        {/* Tools Grid */}
        <div className="relative">
          
          {/* Animated SVG Connector Line (Desktop Only) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] hidden lg:block -translate-y-1/2 z-0">
            <svg width="100%" height="2" className="overflow-visible">
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#f5c518" 
                strokeWidth="2"
                strokeOpacity="0.3"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Animated SVG Connector Line (Mobile/Tablet Only) */}
          <div className="absolute top-0 left-1/2 w-[2px] h-full lg:hidden -translate-x-1/2 z-0">
            <svg width="2" height="100%" className="overflow-visible">
              <motion.line 
                x1="0" y1="0" x2="0" y2="100%" 
                stroke="#f5c518" 
                strokeWidth="2"
                strokeOpacity="0.3"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <motion.div 
            className="flex flex-wrap lg:flex-nowrap justify-center gap-4 lg:gap-6 relative z-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {aiToolsData.map((tool: AITool) => (
              <motion.div
                key={tool.name}
                variants={cardVariants}
                className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-auto lg:flex-1 glass-panel p-4 lg:p-6 rounded-2xl flex flex-col items-center justify-center text-center bg-cardBg border border-border hover:-translate-y-4 hover:shadow-[0_15px_30px_rgba(245,197,24,0.15)] transition-all duration-500 group/card"
                data-cursor="hover"
              >
                <div className="text-gold mb-6 group-hover/card:scale-110 transition-transform duration-500">
                  {getIcon(tool.iconName)}
                </div>
                <h3 className="font-bebas text-2xl text-foreground mb-2 tracking-wide">
                  {tool.name}
                </h3>
                <p className="text-muted text-xs font-sans leading-relaxed">
                  {tool.role}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
