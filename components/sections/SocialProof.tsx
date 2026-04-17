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
    <section id="social-proof" className="py-24 relative bg-transparent overflow-hidden" ref={sectionRef}>

      <motion.div className="max-w-6xl mx-auto px-6 relative z-10" style={{ opacity, y }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="section-badge mb-4">Reputation</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#fafafa] tracking-tight">
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
            whileHover={{ scale: 1.01, transition: { duration: 0.4, ease: "easeOut" } }}
            className="glass rounded-[24px] p-8 md:p-10 border border-white/[0.06] relative group bg-[#0A0A0A] hover:border-white/[0.15] transition-colors duration-500"
          >
            <div className="absolute top-6 right-8 text-white/[0.05] group-hover:text-white/[0.1] transition-colors duration-500">
              <Quote className="w-12 h-12 fill-current" />
            </div>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-[#fafafa] tracking-tight">
              &quot;Priyanshu operates on another level. Delivered our entire platform ahead of schedule with impeccable code quality.&quot;
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center font-bold text-[#fafafa]">
                AM
              </div>
              <div>
                <h4 className="font-bold text-[#ededed]">Alex M.</h4>
                <p className="text-[12px] text-[#777777] font-mono tracking-tight">Founder — US SaaS Startup</p>
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
            <p className="text-[#a1a1aa] max-w-sm text-lg leading-relaxed">
              Harnessing elite-tier technologies to build intelligent, scalable, and future-proof digital systems.
            </p>
            
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="px-5 py-2.5 rounded-[12px] bg-white/[0.03] border border-white/[0.08] text-[#c4c4c4] font-medium hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
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
