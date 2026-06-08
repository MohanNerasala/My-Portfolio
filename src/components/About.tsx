import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';



export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      
      {/* Giant Watermark */}


      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-8">
          
          {/* Left Text Side */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-gold tracking-[0.2em] text-sm font-semibold mb-6 flex items-center space-x-4">
              <span className="w-8 h-[1px] bg-gold opacity-50" />
              <span>ABOUT ME</span>
              <span className="w-8 h-[1px] bg-gold opacity-50 lg:hidden" />
            </div>
            
            <h2 className="font-bebas text-5xl sm:text-6xl md:text-[80px] leading-[0.9] text-foreground mb-8">
              I Build Things <br className="hidden md:block" />
              <span className="text-gold">That Matter</span>
            </h2>
            
            {/* Desktop Text (Full) */}
            <p className="hidden md:block text-muted text-lg max-w-lg mb-12 leading-relaxed">
              I'm a Full Stack and AI Developer passionate about architecting scalable systems and creating intuitive user experiences. By bridging the gap between complex machine learning models and seamless frontends, I build digital products that drive real value.
            </p>

            {/* Mobile Text (Shortened to 1-2 lines) */}
            <p className="block md:hidden text-muted text-base max-w-lg mb-12 leading-relaxed">
              I build scalable, AI-powered digital products that drive real value.
            </p>


          </motion.div>

          {/* Right Terminal Side */}
          <motion.div 
            className="w-full lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="w-full max-w-xl mx-auto glass-panel rounded-xl overflow-hidden shadow-2xl relative group">
              {/* Terminal Chrome */}
              <div className="bg-termHead border-b border-termBorder px-4 py-3 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="flex-1 text-center font-mono text-[10px] sm:text-xs text-termMuted">guest@chakrimohan.dev:~</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed bg-termBody h-[280px] sm:h-[320px] flex flex-col justify-start overflow-hidden">
                {isInView && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="text-gold">$</span> <span className="text-termText">whoami</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="text-termMuted mb-4 ml-4"
                    >
                      &gt; Nerasala Mohan
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                    >
                      <span className="text-gold">$</span> <span className="text-termText">cat skills.json</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.8 }}
                      className="text-termMuted mb-4 ml-4"
                    >
                      <span className="text-[#06b6d4]">{"{"}</span><br />
                      &nbsp;&nbsp;<span className="text-pink-400">role:</span> <span className="text-green-400">"AI + Full Stack Dev"</span>,<br />
                      &nbsp;&nbsp;<span className="text-pink-400">stack:</span> <span className="text-[#06b6d4]">{"[...]"}</span>,<br />
                      &nbsp;&nbsp;<span className="text-pink-400">status:</span> <span className="text-green-400">"open_to_work"</span><br />
                      <span className="text-[#06b6d4]">{"}"}</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.8 }}
                    >
                      <span className="text-gold">$</span> <span className="text-termText">echo $passion</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.4 }}
                      className="text-termMuted ml-4"
                    >
                      &gt; Building real products with AI tools
                    </motion.div>
                    
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-2.5 h-5 bg-gold mt-2 ml-1"
                    />
                  </>
                )}
              </div>
              
              {/* Subtle hover glow on terminal */}
              <div className="absolute inset-0 border border-gold opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
