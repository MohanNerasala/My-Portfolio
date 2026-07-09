import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "proj-1",
    num: "01",
    title: "Menvy - E-Commerce",
    description: "A full-stack e-commerce application built using AI tools. Features a standout AI Virtual Trial Room to preview outfits for the perfect look, seamlessly integrated with direct WhatsApp ordering. Backed by a robust architecture.",
    stack: ["Java Spring Boot", "React JS", "Supabase", "Cloud Server"],
    categoryBadge: "Full Stack",
    githubUrl: "https://github.com/MohanNerasala/online-shopping",
    demoUrl: "https://online-shopping-five-psi.vercel.app/"
  },
  {
    id: "proj-2",
    num: "02",
    title: "Cold Drinks 3D Showcase",
    description: "An immersive frontend application featuring 3D animations and scroll-based interactions using Framer Motion, fully deployed on a cloud server.",
    stack: ["React JS", "Framer Motion", "3D Animation", "Cloud Server"],
    categoryBadge: "Frontend",
    githubUrl: "#",
    demoUrl: "#"
  }
];
