export interface Project {
  id: string;
  num: string; // e.g. "01"
  title: string;
  description: string;
  stack: string[];
  categoryBadge: string; 
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface MarqueeItem {
  name: string;
  iconName: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface AITool {
  name: string;
  role: string;
  iconName: string;
}
