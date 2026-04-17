"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Code2, Cpu, BarChart3, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Full-Stack Architect",
    description: "Engineering production-grade systems with Next.js, Node.js, and modern cloud infrastructure at scale.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "AI Systems Integration",
    description: "Building intelligent pipelines, integrating LLMs, and deploying AI solutions that scale gracefully.",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Digital Craftsman",
    description: "Designing resilient architectures with cinematic frontends — where engineering precision meets creative vision.",
  },
];

const highlights = [
  { icon: <Zap className="w-[14px] h-[14px] text-[#ededed]" />, text: "Zero-compromise performance" },
  { icon: <Globe className="w-[14px] h-[14px] text-[#ededed]" />, text: "Global-scale collaboration" },
  { icon: <Users className="w-[14px] h-[14px] text-[#ededed]" />, text: "Impact-driven approach" },
];

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30]);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);

  return (
    <section id="about" className="py-28 relative bg-transparent overflow-hidden" ref={sectionRef}>
      <motion.div className="max-w-6xl mx-auto px-6" style={{ opacity, y }}>

        {/* Section Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-badge mb-6">About Me</div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-[#fafafa]">
            Engineering the{" "}
            <span className="text-gradient-primary">Foundation</span>
          </h2>
          <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed tracking-tight">
            I live at the intersection of robust backend engineering and beautiful, spatial UI design. Every system I architect is built with obsessive precision and a relentless drive to craft unparalleled user experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ x: 6, transition: { duration: 0.3, ease: "easeOut" } }}
                className="glass glass-hover rounded-[16px] p-6 flex items-start gap-5 card-shine group cursor-default"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-[12px] flex items-center justify-center bg-white/[0.03] border border-white/[0.08]"
                >
                  <div className="text-[#ededed] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#ffffff] text-[#ededed] transition-colors duration-300 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Info Panel */}
          <div className="space-y-6">
            {/* Terminal / Code block aesthetic */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-[16px] p-8 font-mono text-[13px] border border-white/5"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/[0.05] pb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-[11px] text-[#777777] uppercase tracking-widest">profile.config.ts</span>
              </div>
              <div className="space-y-2 text-[#a1a1aa] leading-loose">
                <div><span className="text-[#8a2be2]">export const</span> <span className="text-[#ededed]">developer</span> = {"{"}</div>
                <div className="pl-6"><span className="text-[#777777]">name:</span> <span className="text-[#ffffff]">&quot;Priyanshu Shukla&quot;</span>,</div>
                <div className="pl-6"><span className="text-[#777777]">location:</span> <span className="text-[#ffffff]">&quot;India 🇮🇳&quot;</span>,</div>
                <div className="pl-6"><span className="text-[#777777]">role:</span> <span className="text-[#ffffff]">&quot;Software Engineer&quot;</span>,</div>
                <div className="pl-6"><span className="text-[#777777]">status:</span> <span className="text-[#27c93f]">&quot;Available&quot;</span>,</div>
                <div className="pl-6"><span className="text-[#777777]">focus:</span> <span className="text-[#ffffff]">&quot;Scalable Architecture&quot;</span>,</div>
                <div>{"};"}</div>
              </div>
            </motion.div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="flex items-center gap-4 p-4 rounded-[14px] border border-white/[0.03] bg-white/[0.01]"
                >
                  <div className="p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.05]">{h.icon}</div>
                  <span className="text-sm text-[#ededed] font-medium tracking-tight">{h.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-4 text-sm w-full mt-4"
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
