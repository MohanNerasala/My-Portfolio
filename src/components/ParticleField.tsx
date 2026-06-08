import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const particleCount = 100;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // 1px to 4px
        duration: Math.random() * 20 + 20, // 20s to 40s
        delay: Math.random() * -40, // Start at different times
      });
    }

    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            width: particle.size,
            height: particle.size,
            opacity: 0.15 + Math.random() * 0.2, // 0.15 to 0.35 opacity
          }}
          animate={{
            y: [`${particle.y}vh`, `${(particle.y - 100) % 100}vh`],
            x: [
              `${particle.x}vw`, 
              `${particle.x + (Math.random() * 10 - 5)}vw`
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
