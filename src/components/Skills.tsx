import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTechOrbit } from '../hooks/useTechOrbit';
import { orbitalSkills } from '../data/skills';

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Initialize the orbital hook
  // We use inner and outer radii appropriate for desktop
  const { containerRef: orbitRef, handleMouseEnter, handleMouseLeave } = useTechOrbit(
    orbitalSkills,
    220, // innerRadius
    340, // outerRadius
    25,  // innerSpeed
    35   // outerSpeed
  );

  return (
    <section id="skills" className="relative py-32 bg-cardBg overflow-hidden min-h-screen flex items-center">
      
      {/* Giant Watermark */}
      <div className="absolute top-20 right-0 lg:right-20 font-bebas text-[200px] md:text-[300px] leading-none text-gold opacity-[0.04] pointer-events-none select-none z-0">
        02
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 w-full" ref={containerRef}>
        
        {/* Header */}
        <div className="px-6 text-center mb-16">
          <h2 className="font-bebas text-5xl md:text-[80px] leading-none text-foreground tracking-wide">
            TECH <span className="text-gold">ARSENAL</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto tracking-wide">
            A dynamic constellation of my primary stack and secondary toolset. Hover to explore.
          </p>
        </div>

        {/* Orbit Visualization Container */}
        <div className="relative w-full flex items-center justify-center h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          <div className="w-[900px] h-[900px] flex-shrink-0 flex items-center justify-center scale-[0.45] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.8] xl:scale-[0.85] transition-transform duration-300">
            <motion.div 
              className="relative w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
            ref={orbitRef}
          >
            {/* Center Core Node */}
            <div 
              className="absolute z-20 flex flex-col items-center justify-center w-36 h-36 rounded-full border border-gold/30 bg-background backdrop-blur-xl shadow-[0_0_50px_rgba(245,197,24,0.15)] cursor-crosshair pointer-events-auto"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="font-bebas text-3xl text-gold tracking-widest">N M</span>
              <span className="text-[10px] text-muted tracking-widest uppercase mt-1">AI + Full Stack</span>
              
              {/* Pulsing ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-gold/30 pointer-events-none"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Inner Orbit Ring Outline */}
            <div className="absolute z-0 rounded-full border border-border w-[440px] h-[440px] pointer-events-none" />
            
            {/* Outer Orbit Ring Outline */}
            <div className="absolute z-0 rounded-full border border-border w-[680px] h-[680px] pointer-events-none" />

            {/* Orbit Nodes */}
            {orbitalSkills.map((node) => (
              <div 
                key={node.id} 
                className="tech-node absolute z-10 flex items-center justify-center pointer-events-none"
                style={{ left: '50%', top: '50%' }}
              >
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cardBg border border-border backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-gold/50 hover:shadow-[0_0_20px_rgba(245,197,24,0.3)] hover:z-50 cursor-crosshair"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}80` }}
                  />
                  <span className="text-foreground text-sm font-medium tracking-wide whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
              </div>
            ))}

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
