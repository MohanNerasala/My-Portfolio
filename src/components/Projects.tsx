import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';
import { projectsData } from '../data/projects';
import type { Project } from '../types';

interface ProjectBlockProps {
  project: Project;
  index: number;
}

const ProjectBlock = React.memo(({ project, index }: ProjectBlockProps) => {
  const cardRef = useRef(null);
  const isEven = index % 2 === 0;

  // Track the scroll of this specific card.
  // It starts scaling down when it hits the sticky position (top 15%).
  // It finishes scaling down after the user scrolls another 100% of the viewport height.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 15%", "start -85%"] 
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <div 
      ref={cardRef} 
      className="sticky top-[5vh] lg:top-[15vh] w-full flex items-center justify-center min-h-[60vh] mb-[12vh] sm:mb-[30vh] lg:mb-[60vh] last:mb-[10vh] lg:last:mb-[20vh]"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="w-full max-w-6xl glass-panel rounded-3xl p-4 sm:p-6 lg:p-12 shadow-2xl bg-cardBg backdrop-blur-xl border border-border"
      >
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-4 sm:gap-8 lg:gap-24`}>
          
          {/* Image/Mockup Placeholder Side */}
          <a 
            href={project.demoUrl !== "#" ? project.demoUrl : project.githubUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full lg:w-1/2 aspect-[16/9] lg:aspect-[4/3] rounded-2xl relative overflow-hidden group bg-black/40 border border-white/10 shadow-2xl block cursor-pointer"
            data-cursor="hover"
          >
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : project.demoUrl && project.demoUrl !== "#" ? (
              <div className="w-full h-full relative">
                {/* A glass overlay to ensure it's not fully intractable but looks bright */}
                <div className="absolute inset-0 bg-transparent z-10" />
                <iframe 
                  src={project.demoUrl} 
                  title={project.title}
                  className="w-full h-full pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 origin-center" 
                  sandbox="allow-scripts allow-same-origin"
                  scrolling="no"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted font-sans tracking-widest uppercase text-sm border border-border px-6 py-3 rounded-full shadow-lg">
                  Project Preview
                </div>
              </div>
            )}
            
            {/* Dark gradient overlay that appears on hover for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            
            {/* View Project Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 translate-y-8 group-hover:translate-y-0">
              <span className="px-6 py-3 bg-gold text-black font-bebas text-xl tracking-wider rounded-full shadow-[0_0_30px_rgba(245,197,24,0.5)] transform scale-90 group-hover:scale-100 transition-transform duration-500">
                View Live Project
              </span>
            </div>
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none z-30" />
          </a>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
              <span className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-gold/50">{project.num}</span>
              <div className="px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-gold text-gold text-[10px] lg:text-xs font-bold tracking-widest uppercase bg-gold/10">
                {project.categoryBadge}
              </div>
            </div>

            <h3 className="font-bebas text-3xl sm:text-4xl lg:text-6xl text-foreground mb-3 lg:mb-6 leading-[0.9]">
              {project.title}
            </h3>

            <p className="text-muted font-sans text-xs sm:text-sm lg:text-lg mb-4 lg:mb-8 leading-relaxed max-w-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 lg:mb-10">
              {project.stack.map(tech => (
                <span key={tech} className="px-2 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs font-mono text-muted border border-border rounded-full bg-[var(--glass)]">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 lg:gap-4">
              <a 
                href={project.demoUrl}
                className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(245,197,24,0)] hover:shadow-[0_0_20px_rgba(245,197,24,0.3)]"
                data-cursor="hover"
                aria-label="Live Demo"
              >
                <ExternalLink size={18} className="lg:w-5 lg:h-5" />
              </a>
              <a 
                href={project.githubUrl}
                className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border text-foreground hover:border-foreground transition-all duration-300"
                data-cursor="hover"
                aria-label="GitHub Repository"
              >
                <Github size={18} className="lg:w-5 lg:h-5" />
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
});
ProjectBlock.displayName = "ProjectBlock";

export default function Projects() {
  return (
    <section id="projects" className="relative pt-32 pb-10 overflow-clip">
      
      {/* Giant Watermark */}


      <div className="max-w-[1400px] mx-auto relative z-10 px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="w-12 h-[1px] bg-gold mb-6 opacity-50" />
          <h2 className="font-bebas text-5xl md:text-[80px] leading-none text-foreground tracking-wide">
            SELECTED <span className="text-gold">WORK</span>
          </h2>
          <p className="text-muted font-sans mt-4 max-w-lg mx-auto text-lg tracking-wide">
            Scroll down to explore my recent projects.
          </p>
        </div>

        {/* Sticky Projects Container */}
        {/* We use a relative container that will hold all the sticky blocks. */}
        <div className="relative w-full">
          {projectsData.map((project, idx) => (
            <ProjectBlock 
              key={project.id} 
              project={project} 
              index={idx} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
