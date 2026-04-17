"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Code2, Cpu, BarChart3, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full-Stack Architect",
    description: "Engineering production-grade systems with Next.js, TypeScript, Node.js, and modern cloud infrastructure at scale.",
    color: "primary",
    glow: "rgba(0,240,255,0.3)",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Systems Engineer",
    description: "Building autonomous agents, integrating LLMs, and deploying intelligent pipelines that think and adapt.",
    color: "accent",
    glow: "rgba(112,0,255,0.3)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Digital Craftsman",
    description: "Designing resilient architectures with cinematic frontends — where engineering precision meets creative vision.",
    color: "highlight",
    glow: "rgba(0,255,157,0.3)",
  },
];

const highlights = [
  { icon: <Zap className="w-4 h-4 text-primary" />, text: "Zero-compromise performance" },
  { icon: <Globe className="w-4 h-4 text-accent" />, text: "Global-scale collaboration" },
  { icon: <Users className="w-4 h-4 text-highlight" />, text: "Mission-driven approach" },
];

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed transforms eliminate jerkiness 
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -30]);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);

  return (
    <section id="about" className="py-28 relative bg-black overflow-hidden" ref={sectionRef}>
      {/* Bg decorations */}
      <div className="absolute inset-0 dot-grid opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
      <div className="orb w-[500px] h-[500px] bg-primary/5 top-0 left-[-20%]" />

      <motion.div className="max-w-7xl mx-auto px-6" style={{ opacity, y }}>

        {/* Section Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-badge mb-6">// Who I Am</div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6" style={{ fontFamily: "var(--font-space)" }}>
            The Mind Behind{" "}
            <span className="text-gradient-primary">the Avatar</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            I live at the intersection of cutting-edge engineering and bold creative design. Every system I architect, every interface I craft — it&apos;s built with obsessive precision and a relentless drive to push what&apos;s possible on the web.
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
                className="glass glass-hover rounded-2xl p-6 flex items-start gap-5 card-shine group"
              >
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `rgba(${feature.color === "primary" ? "0,240,255" : feature.color === "accent" ? "112,0,255" : "0,255,157"},0.1)`,
                    border: `1px solid rgba(${feature.color === "primary" ? "0,240,255" : feature.color === "accent" ? "112,0,255" : "0,255,157"},0.2)`,
                    color: `var(--${feature.color})`,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Info Panel */}
          <div className="space-y-6">
            {/* Code block aesthetic */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-2xl p-6 font-mono text-sm border border-white/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-gray-600">about.ts</span>
              </div>
              <div className="space-y-1.5 text-gray-300">
                <div><span className="text-accent">const</span> <span className="text-primary">architect</span> = {"{"}</div>
                <div className="pl-4"><span className="text-gray-500">identity:</span> <span className="text-highlight">&quot;Priyanshu Shukla&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">base:</span> <span className="text-highlight">&quot;India 🇮🇳&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">class:</span> <span className="text-highlight">&quot;Full Stack + AI Architect&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">status:</span> <span className="text-green-400">&quot;online&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">mission:</span> <span className="text-highlight">&quot;Shaping the digital frontier&quot;</span>,</div>
                <div>{"}"}</div>
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
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/2"
                >
                  <div className="p-2 rounded-lg bg-white/5">{h.icon}</div>
                  <span className="text-sm text-gray-300 font-medium">{h.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold w-full"
            >
              Join My Mission →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
