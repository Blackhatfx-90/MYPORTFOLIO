"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const skillCategories = [
  {
    title: "Core Stack",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    title: "Backend & DB",
    skills: ["Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    title: "AI & Cloud",
    skills: ["OpenAI API", "Agentic Workflows", "AWS", "Vercel", "Supabase"],
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
    <section id="skills" className="py-24 relative bg-transparent border-t border-white/[0.05]" ref={sectionRef}>

      <motion.div className="max-w-6xl mx-auto px-6" style={{ opacity, y }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="section-badge mb-4">Competencies</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa] tracking-tight">
            Technical <span className="text-gradient-primary">Expertise</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-xl text-lg">
            The foundation of technologies I utilize to build hyper-scalable web applications and polished interfaces.
          </p>
        </motion.div>

        {/* Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 + idx * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.35, ease: "easeOut" } }}
              className="glass rounded-[16px] p-8 relative overflow-hidden group border border-white/[0.04] hover:border-white/[0.1] transition-colors duration-500"
            >
              
              <h3 className="text-[17px] font-semibold mb-6 flex items-center gap-3 text-[#ededed] tracking-tight">
                <span className="w-6 h-1 rounded-full bg-[#ededed]" />
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.25, ease: "easeOut" } }}
                    className="px-3.5 py-1.5 rounded-[8px] bg-white/[0.03] border border-white/[0.06] text-[13px] font-medium text-[#c4c4c4] hover:text-[#fff] hover:bg-white/[0.08] transition-colors duration-300 cursor-default"
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
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          className="mt-20 overflow-hidden flex relative select-none"
        >
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          
          <div className="marquee-track gap-12 text-5xl md:text-7xl font-black text-white/10 whitespace-nowrap tracking-tighter">
            {Array(4).fill("NEXT.JS • REACT • TYPESCRIPT • NODE.JS • PYTHON • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
