"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Mail, Sparkles, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
    <section id="contact" className="py-24 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col flex-1"
          >
            <div className="section-badge mb-6 w-fit">// Contact</div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.05]" style={{ fontFamily: "var(--font-space)" }}>
              Let&apos;s build<br />
              <span className="text-gradient-primary">the impossible.</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md leading-relaxed">
              Got a crazy idea? Need an elite dev for a mission-critical project? Drop a line, and let&apos;s engineer reality together.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Email</p>
                  <a href="mailto:hello@aiwebify.site" className="text-lg font-bold hover:text-primary transition-colors">
                    hello@aiwebify.site
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-1">Location</p>
                  <p className="text-lg font-bold">India 🇮🇳 (Remote Global)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative glass rounded-[2rem] p-8 md:p-10 border border-white/10 overflow-hidden group">
              {/* Form bg glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 input-glow outline-none transition-all focus:bg-black/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 input-glow outline-none transition-all focus:bg-black/60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono tracking-widest text-gray-400 uppercase">Project Details</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your tech stack, goals, and timeline..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-700 input-glow outline-none transition-all resize-none focus:bg-black/60"
                  />
                </div>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center justify-center gap-2 font-bold"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message received. I&apos;ll be in touch!
                  </motion.div>
                ) : (
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full btn-primary py-4 text-base tracking-wide flex items-center justify-center gap-2 rounded-xl border border-primary/20 hover:border-white shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">Sending <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" /></span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Start a Project <Sparkles className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
