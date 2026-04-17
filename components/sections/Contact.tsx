"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MapPin, Mail, Sparkles, CheckCircle2 } from "lucide-react";

const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.8]);
  const rawY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -15]);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);
  
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative bg-transparent overflow-hidden border-t border-white/[0.05]" ref={sectionRef}>

      <motion.div className="max-w-6xl mx-auto px-6 relative z-10" style={{ opacity, y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col flex-1"
          >
            <div className="section-badge mb-6 w-fit">Get in Touch</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] text-[#fafafa] tracking-tight">
              Let&apos;s build<br />
              <span className="text-[#a1a1aa]">something exceptional.</span>
            </h2>
            <p className="text-[#a1a1aa] text-lg mb-12 max-w-md leading-relaxed tracking-tight">
              Got a vision that needs robust architecture? Drop your details and let&apos;s engineer the future together.
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-[12px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.2] transition-colors duration-400">
                  <Mail className="w-5 h-5 text-[#888888] group-hover:text-[#ffffff] transition-colors duration-400" />
                </div>
                <div>
                  <p className="text-[11px] text-[#777777] uppercase tracking-[0.15em] font-mono mb-1">Email</p>
                  <a href="mailto:hello@aiwebify.site" className="text-[15px] font-semibold text-[#ededed] hover:text-[#ffffff] transition-colors duration-300">
                    hello@aiwebify.site
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-[12px] bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.2] transition-colors duration-400">
                  <MapPin className="w-5 h-5 text-[#888888] group-hover:text-[#ffffff] transition-colors duration-400" />
                </div>
                <div>
                  <p className="text-[11px] text-[#777777] uppercase tracking-[0.15em] font-mono mb-1">Location</p>
                  <p className="text-[15px] font-semibold text-[#ededed]">India 🇮🇳 (Remote Global)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative glass rounded-[20px] p-8 md:p-10 border border-white/[0.05] overflow-hidden group bg-[#0A0A0A]">
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#111111] border border-white/[0.05] rounded-[10px] px-5 py-4 text-[#ffffff] placeholder:text-[#555555] text-[14px] outline-none transition-all duration-300 focus:border-white/[0.2] focus:bg-[#1a1a1a]"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#111111] border border-white/[0.05] rounded-[10px] px-5 py-4 text-[#ffffff] placeholder:text-[#555555] text-[14px] outline-none transition-all duration-300 focus:border-white/[0.2] focus:bg-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">Project Details</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your requirements, goals, and timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#111111] border border-white/[0.05] rounded-[10px] px-5 py-4 text-[#ffffff] placeholder:text-[#555555] text-[14px] outline-none transition-all duration-300 resize-none focus:border-white/[0.2] focus:bg-[#1a1a1a]"
                  />
                </div>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full py-4 rounded-[10px] bg-green-500/[0.05] border border-green-500/[0.2] text-green-400 flex items-center justify-center gap-2 font-medium text-[14px]"
                  >
                    <CheckCircle2 className="w-[18px] h-[18px]" />
                    Message received. I will be in touch!
                  </motion.div>
                ) : (
                  <motion.button 
                    disabled={isSubmitting}
                    type="submit"
                    whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-[#ffffff] text-[#000000] py-4 text-[14px] font-semibold tracking-wide flex items-center justify-center gap-2 rounded-[10px] hover:bg-[#e0e0e0] disabled:opacity-50 transition-colors duration-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Sending <span className="animate-spin w-[14px] h-[14px] border-[2px] border-black border-t-transparent rounded-full" /></span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Sparkles className="w-4 h-4 text-[#111111]" />
                      </span>
                    )}
                  </motion.button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
