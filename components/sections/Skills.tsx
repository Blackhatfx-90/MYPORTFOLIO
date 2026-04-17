"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const skillCategories = [
  {
    title: "Core Stack",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    color: "primary",
  },
  {
    title: "Backend & DB",
    skills: ["Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    color: "highlight",
  },
  {
    title: "AI & Cloud",
    skills: ["OpenAI API", "Agentic Workflows", "AWS", "Vercel", "Supabase"],
    color: "accent",
  },
];

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function Skills() {
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
    <section id="skills" className="py-24 relative bg-black border-t border-white/5" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.05)_0%,transparent_50%)]" />

      <motion.div className="max-w-7xl mx-auto px-6" style={{ opacity, y }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="section-badge mb-4">// My Arsenal</div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Tech <span className="text-gradient-cyan">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            The weapons I wield to architect digital realities and push the boundaries of what&apos;s possible.
          </p>
        </motion.div>

        {/* Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 + idx * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: "easeOut" } }}
              className="glass rounded-3xl p-8 relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                style={{ background: `var(--${category.color})` }}
              />

              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-1 rounded-full" style={{ background: `var(--${category.color})` }} />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:border-white/30 transition-colors duration-300"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="mt-20 overflow-hidden flex relative select-none"
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="marquee-track gap-12 text-5xl md:text-7xl font-black text-white/5 whitespace-nowrap">
            {Array(4).fill("NEXT.JS • REACT • TYPESCRIPT • NODE.JS • PYTHON • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
