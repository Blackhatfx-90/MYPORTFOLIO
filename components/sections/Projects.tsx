"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";

const projects = [
  {
    title: "Enterprise SaaS Platform",
    category: "FULL STACK WEB",
    description: "Scalable B2B multi-tenant architecture with real-time collaboration, role-based access control, and seamless integrations.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: "/project-1.png", // Use fallback since it doesn't exist
    links: { demo: "#", code: "#" },
    color: "primary",
  },
  {
    title: "BHARAT.AI DEV",
    category: "AI ENGINEERING",
    description: "An AI entity that behaves like a senior software engineer. A next-gen agentic coding assistant built to autonomously solve large-scale complex development tasks.",
    tags: ["React", "Custom LLM Agents", "Tailwind CSS", "Vite"],
    image: "/bharat-ai.jpg",
    links: { demo: "https://bharat-dev-ai.vercel.app/", code: "#" },
    color: "accent",
  },
  {
    title: "FinTech Dashboard",
    category: "WEB DEVELOPMENT",
    description: "High-performance financial analytics platform with live data socket streams and interactive framer-motion micro-animations.",
    tags: ["Next.js", "WebSockets", "Framer Motion", "Tailwind"],
    image: "/project-3.png", // Use fallback
    links: { demo: "#", code: "#" },
    color: "highlight",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative bg-black">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black" style={{ fontFamily: "var(--font-space)" }}>
              Selected <span className="text-gradient-primary">Works</span>
            </h2>
            <div className="h-[2px] w-32 bg-gradient-to-r from-primary to-transparent hidden md:block" />
          </div>
          <p className="text-muted-foreground text-lg max-w-xl">
            A curated collection of digital experiences where engineering excellence meets top-tier aesthetic design.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden glass-hover hover:border-primary/40 flex flex-col h-full"
            >
              {/* Thumbnail Area */}
              <div className="relative aspect-[4/3] w-full bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                
                {/* Fallback pattern */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-0 transition-opacity">
                  <Code className="w-16 h-16" />
                </div>

                {/* Actual image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0"
                />

                {/* Tags on hover */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={project.links.demo} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    <ExternalLink className="w-5 h-5 ml-0.5 mb-0.5" />
                  </a>
                  <a href={project.links.code} className="w-12 h-12 rounded-full bg-black/50 border border-white/20 text-white backdrop-blur-md flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-transform">
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20 py-1 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wider text-white">
                  {project.category}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow relative">
                {/* Ambient glow */}
                <div 
                  className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: `var(--${project.color})` }}
                />

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <a 
                    href={project.links.demo} 
                    className="flex-1 py-2 px-4 rounded-xl border border-white/10 text-xs font-bold text-center hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Live Demo →
                  </a>
                  <a 
                    href={project.links.code} 
                    className="flex-1 py-2 px-4 rounded-xl border border-white/10 text-xs font-bold text-center hover:border-primary/50 hover:text-primary transition-all duration-300"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
