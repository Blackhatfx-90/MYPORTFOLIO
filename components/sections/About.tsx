"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, BarChart3, Zap, Globe, Users } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Full-Stack Engineer",
    description: "Building scalable, production-grade apps with Next.js, TypeScript, Node.js, and modern cloud infrastructure.",
    color: "primary",
    glow: "rgba(0,240,255,0.3)",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "AI Integrator",
    description: "Embedding LLMs, intelligent agents, and ML pipelines into real-world products and workflows.",
    color: "accent",
    glow: "rgba(112,0,255,0.3)",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Quant Trader",
    description: "3+ years Forex, 2+ years Crypto. Designing profitable algo bots, signals, and backtested strategies.",
    color: "highlight",
    glow: "rgba(0,255,157,0.3)",
  },
];

const highlights = [
  { icon: <Zap className="w-4 h-4 text-primary" />, text: "Performance-first development" },
  { icon: <Globe className="w-4 h-4 text-accent" />, text: "Global remote collaboration" },
  { icon: <Users className="w-4 h-4 text-highlight" />, text: "Client-centric approach" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative bg-black overflow-hidden">
      {/* Bg decorations */}
      <div className="absolute inset-0 dot-grid opacity-30 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
      <div className="orb w-[500px] h-[500px] bg-primary/5 top-0 left-[-20%]" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl"
        >
          <div className="section-badge mb-6">// About Me</div>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Beyond the{" "}
            <span className="text-gradient-primary">Code</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            I&apos;m a self-driven developer and quant who thrives at the intersection of engineering, design, and finance. Every project I build is crafted with obsessive attention to detail — because great software deserves great aesthetics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Feature Cards */}
          <div className="space-y-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Code block aesthetic */}
            <div className="glass rounded-2xl p-6 font-mono text-sm border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-gray-600">about.ts</span>
              </div>
              <div className="space-y-1.5 text-gray-300">
                <div><span className="text-accent">const</span> <span className="text-primary">developer</span> = {"{"}</div>
                <div className="pl-4"><span className="text-gray-500">name:</span> <span className="text-highlight">&quot;Priyanshu Shukla&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">location:</span> <span className="text-highlight">&quot;India 🇮🇳&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">role:</span> <span className="text-highlight">&quot;Full Stack + AI + Quant&quot;</span>,</div>
                <div className="pl-4"><span className="text-gray-500">available:</span> <span className="text-green-400">true</span>,</div>
                <div className="pl-4"><span className="text-gray-500">passion:</span> <span className="text-highlight">&quot;Building the future&quot;</span>,</div>
                <div>{"}"}</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
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
              Work With Me →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
