"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Activity, Code2, Database } from "lucide-react";

const experiences = [
  {
    year: "2023 — Present",
    role: "Freelance Software Engineer",
    company: "Self-Employed / Independent",
    description: "Architected and deployed complex, high-performance web applications for international clients. Built scalable backend systems and responsive modern interfaces.",
    tags: ["React", "Node.js", "System Design", "AWS"],
    icon: <Activity className="w-5 h-5" />,
    color: "highlight",
  },
  {
    year: "2024 — Present",
    role: "Senior Frontend Engineer",
    company: "Freelance Client (Under NDA)",
    description: "Spearheading the UI/UX architecture for enterprise scalable web applications. Mastered state management, performance optimization, and Next.js server-side features.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: <Code2 className="w-5 h-5" />,
    color: "primary",
  },
  {
    year: "2021 — 2024",
    role: "Full Stack Developer",
    company: "Early-Stage SaaS Startup (Confidential)",
    description: "Designed and engineered entire SaaS platforms from absolute zero to MRR. Configured secure authentication pipelines and scalable PostgreSQL databases.",
    tags: ["Node.js", "Express", "Supabase", "PostgreSQL"],
    icon: <Database className="w-5 h-5" />,
    color: "accent",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative bg-black">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Professional <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A track record of engineering scalable platforms and intelligent software solutions.
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
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[24px] md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div 
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
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Content card */}
                  <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="glass glass-hover rounded-3xl p-8 relative group overflow-hidden border border-white/5">
                      
                      {/* Glow effect on hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
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
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
