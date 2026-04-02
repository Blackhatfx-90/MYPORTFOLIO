"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";

const techBadges = [
  "Next.js",
  "TypeScript",
  "OpenAI",
  "AWS",
  "Supabase",
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="social-proof" className="py-24 relative bg-black overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-badge mb-4">// Trust & Credibility</div>
          <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Trusted by <span className="text-gradient-primary">Innovators</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative group"
          >
            <div className="absolute top-6 right-8 text-primary/20 group-hover:text-primary/40 transition-colors">
              <Quote className="w-12 h-12 fill-current" />
            </div>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic text-gray-200">
              "Priyanshu delivered our dashboard ahead of schedule. Clean code, great communication."
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-primary">
                  AM
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white">Alex M.</h4>
                <p className="text-sm text-gray-500 font-mono">Founder — US SaaS Startup</p>
              </div>
            </div>
          </motion.div>

          {/* Tech Logos / Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <p className="text-gray-400 max-w-sm">
              Leveraging a world-class tech stack to build robust, scalable, and intelligent digital products.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {techBadges.map((tech) => (
                <div 
                  key={tech}
                  className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
