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
    icon: <Activity className="w-4 h-4" />,
  },
  {
    year: "2024 — Present",
    role: "Lead Frontend Architect",
    company: "Enterprise Client (Under NDA)",
    description: "Spearheading the UI architecture for enterprise-scale web platforms. Mastering performance optimization, state management, and Next.js edge capabilities.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    icon: <Code2 className="w-4 h-4" />,
  },
  {
    year: "2021 — 2024",
    role: "Full Stack Engineer",
    company: "Early-Stage SaaS Startup",
    description: "Designed and shipped entire SaaS platforms from zero to revenue. Engineered secure auth pipelines and high-performance PostgreSQL architectures.",
    tags: ["Node.js", "Express", "Supabase", "PostgreSQL"],
    icon: <Database className="w-4 h-4" />,
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
    <section id="experience" className="py-24 relative bg-transparent" ref={sectionRef}>
      {/* Background border top */}
      <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <motion.div className="max-w-4xl mx-auto px-6" style={{ opacity, y }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-3 rounded-full bg-white/[0.02] border border-white/[0.08]"
            >
              <Briefcase className="w-6 h-6 text-[#ededed]" />
            </motion.div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa] tracking-tight">
            Professional <span className="text-gradient-primary">Timeline</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto text-lg leading-relaxed">
            A chronicle of engineering scalable platforms and intelligent systems across the digital frontier.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#333333] via-[#444444] to-transparent" />

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
                      className="w-10 h-10 rounded-full flex items-center justify-center border-[4px] border-[#0A0A0A] bg-[#1a1a1a]"
                    >
                      <div className="w-full h-full rounded-full flex items-center justify-center border border-white/10 text-[#ededed]">
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
                      className="glass rounded-[20px] p-8 relative group overflow-hidden border border-white/[0.04] hover:border-white/[0.1] transition-colors duration-500 bg-[#0A0A0A]"
                    >
                      
                      <div className={`text-[11px] font-mono font-medium tracking-widest mb-4 uppercase flex items-center gap-2 ${isEven ? "md:justify-end" : ""}`}>
                        <span className="text-[#a1a1aa]">{exp.year}</span>
                      </div>
                      
                      <h3 className="text-[18px] font-semibold text-[#ededed] mb-1.5 leading-tight tracking-tight">
                        {exp.role}
                      </h3>
                      
                      <div className="text-[13px] font-medium text-[#777777] mb-6 font-mono tracking-tight">
                        {exp.company}
                      </div>
                      
                      <p className="text-[#888888] text-[14px] leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        {exp.tags.map(tag => (
                          <span 
                            key={tag}
                            className="px-2.5 py-1 rounded-[6px] bg-white/[0.02] border border-white/[0.05] text-[11px] text-[#777777] font-mono group-hover:text-[#a1a1aa] transition-colors duration-300"
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
