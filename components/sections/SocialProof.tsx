"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Quote } from "lucide-react";

const techBadges = [
  "Next.js",
  "TypeScript",
  "OpenAI",
  "AWS",
  "Supabase",
];

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -25]);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);

  return (
    <section id="social-proof" className="py-24 relative bg-black overflow-hidden" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div className="max-w-7xl mx-auto px-6 relative z-10" style={{ opacity, y }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <div className="section-badge mb-4">// Reputation</div>
          <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-space)" }}>
            Trusted by <span className="text-gradient-primary">Visionaries</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
            className="glass rounded-3xl p-8 md:p-10 border border-white/10 relative group"
          >
            <div className="absolute top-6 right-8 text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
              <Quote className="w-12 h-12 fill-current" />
            </div>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic text-gray-200">
              &quot;Priyanshu operates on another level. Delivered our entire platform ahead of schedule with impeccable code quality.&quot;
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
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-8"
          >
            <p className="text-gray-400 max-w-sm">
              Harnessing elite-tier technologies to build intelligent, scalable, and future-proof digital systems.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {techBadges.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.08, y: -3, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-300 font-bold hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
