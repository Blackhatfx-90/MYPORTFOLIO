"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Core Stack",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    color: "primary",
  },
  {
    title: "Quant & Algo",
    skills: ["Python", "MQL4/MQL5", "Pine Script", "Binance API", "Backtesting"],
    color: "highlight",
  },
  {
    title: "AI & Cloud",
    skills: ["OpenAI API", "Agentic Workflows", "AWS", "Vercel", "Supabase"],
    color: "accent",
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative bg-black border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,240,255,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="section-badge mb-4">// My Arsenal</div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Tech <span className="text-gradient-cyan">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            The sophisticated tech stack I use to architect digital masterpieces.
          </p>
        </motion.div>

        {/* Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              className="glass rounded-3xl p-8 relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px]"
                style={{ background: `var(--${category.color})`, opacity: 0.2 }}
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
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:border-white/30 transition-colors"
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
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 overflow-hidden flex relative select-none"
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="marquee-track gap-12 text-5xl md:text-7xl font-black text-white/5 whitespace-nowrap">
            {Array(4).fill("NEXT.JS • REACT • TYPESCRIPT • QUANT • PYTHON • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
