import type { TechNodeConfig } from '../hooks/useTechOrbit';
import type { AITool } from '../types';

export const aiToolsData: AITool[] = [
  { name: "Claude AI", role: "Architecture & Logic Design", iconName: "Bot" },
  { name: "Cursor IDE", role: "AI-Assisted Development", iconName: "MousePointer2" },
  { name: "Antigravity", role: "Autonomous AI Agent", iconName: "Sparkles" },
  { name: "GitHub Copilot", role: "Real-time Code Generation", iconName: "Github" },
  { name: "Codex", role: "Complex Algorithm Solvers", iconName: "Brain" },
  { name: "Vercel", role: "Automated Deployments", iconName: "Triangle" },
  { name: "Render", role: "Backend Cloud Hosting", iconName: "Cloud" }
];

// Since you didn't provide specific skills, I've curated a high-impact list based on your previous data.
// Feel free to modify this list anytime!
export const orbitalSkills: TechNodeConfig[] = [
  // CORE SKILLS (Inner Orbit)
  { id: 'react', label: 'React.js', orbit: 'inner', angle: 0, color: '#61DAFB' },
  { id: 'typescript', label: 'TypeScript', orbit: 'inner', angle: (Math.PI * 2) / 4 * 1, color: '#3178C6' },
  { id: 'python', label: 'Python', orbit: 'inner', angle: (Math.PI * 2) / 4 * 2, color: '#FFE873' },
  { id: 'java', label: 'Java', orbit: 'inner', angle: (Math.PI * 2) / 4 * 3, color: '#f89820' },
  
  // SECONDARY SKILLS (Outer Orbit)
  { id: 'tailwind', label: 'Tailwind CSS', orbit: 'outer', angle: 0, color: '#38B2AC' },
  { id: 'postgres', label: 'PostgreSQL', orbit: 'outer', angle: (Math.PI * 2) / 8 * 1, color: '#336791' },
  { id: 'spring', label: 'Spring Boot', orbit: 'outer', angle: (Math.PI * 2) / 8 * 2, color: '#6DB33F' },
  { id: 'claude', label: 'Claude AI', orbit: 'outer', angle: (Math.PI * 2) / 8 * 3, color: '#d97757' },
  { id: 'framer', label: 'Framer Motion', orbit: 'outer', angle: (Math.PI * 2) / 8 * 4, color: '#E902B6' },
  { id: 'git', label: 'Git & GitHub', orbit: 'outer', angle: (Math.PI * 2) / 8 * 5, color: '#F05032' },
  { id: 'vercel', label: 'Vercel', orbit: 'outer', angle: (Math.PI * 2) / 8 * 6, color: '#FFFFFF' },
  { id: 'cursor', label: 'Cursor IDE', orbit: 'outer', angle: (Math.PI * 2) / 8 * 7, color: '#FFFFFF' },
];
