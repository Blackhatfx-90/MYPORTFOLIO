"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, Activity, Code2, Database } from "lucide-react";

const experiences = [
  {
    year: "2023 — Present",
    role: "Independent Software Architect",
    company: "Self-Employed / Global Clients",
    description: "Architecting and deploying complex, high-performance systems for international clients. Building scalable backends and cinematic modern interfaces from the ground up.",
    tags: ["React", "Node.js", "System Design", "AWS"],
    icon: <Activity className="w-5 h-5" />,
    color: "highlight",
  },
  {
    year: "2024 — Present",
    role: "Lead Frontend Architect",
    company: "Enterprise Client (Under NDA)",
    description: "Spearheading the UI architecture for enterprise-scale web platforms. Mastering performance optimization, state management, and Next.js edge capabilities.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: <Code2 className="w-5 h-5" />,
    color: "primary",
  },
  {
    year: "2021 — 2024",
    role: "Full Stack Engineer",
    company: "Early-Stage SaaS Startup (Stealth)",
    description: "Designed and shipped entire SaaS platforms from zero to revenue. Engineered secure auth pipelines and high-performance PostgreSQL architectures.",
    tags: ["Node.js", "Express", "Supabase", "PostgreSQL"],
    icon: <Database className="w-5 h-5" />,
    color: "accent",
  },
];

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -25]);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);

  return (
    <section id="experience" className="py-24 relative bg-black" ref={sectionRef}>
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <motion.div className="max-w-4xl mx-auto px-6" style={{ opacity, y }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 text-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <Briefcase className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Evolution <span className="text-gradient-cyan">Log</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A chronicle of engineering scalable platforms and intelligent systems across the digital frontier.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-transparent opacity-80" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.12, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[24px] md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-black"
                      style={{ 
                        background: `rgba(0,0,0,0.8)`,
                        boxShadow: `0 0 20px var(--${exp.color})` 
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center border border-white/20"
                        style={{ color: `var(--${exp.color})` }}
                      >
                        {exp.icon}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Content card */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <motion.div
                      whileHover={{ y: -4, transition: { duration: 0.35, ease: "easeOut" } }}
                      className="glass rounded-3xl p-8 relative group overflow-hidden border border-white/5 hover:border-white/15 transition-colors duration-500"
                    >
                      
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-2xl pointer-events-none"
                        style={{ background: `var(--${exp.color})` }}
                      />

                      <div className={`text-xs font-mono font-bold tracking-widest mb-3 uppercase flex items-center gap-2 ${isEven ? "md:justify-end" : ""}`}>
                        <span style={{ color: `var(--${exp.color})` }}>{exp.year}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                        {exp.role}
                      </h3>
                      
                      <div className="text-sm font-medium text-gray-500 mb-6 font-mono">
                        {exp.company}
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        {exp.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
