"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from "lucide-react";

const roles = [
  "Full Stack Engineer",
  "AI Integrator",
  "Next.js Specialist",
];

const stats = [
  { value: "3+", label: "Years Experience", subtitle: "$500K+ Volume Backtested" },
  { value: "15+", label: "Projects Built", subtitle: "Across 8+ Industries" },
  { value: "5+", label: "AI Tools Shipped", subtitle: "Used by 200+ Users" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["rgba(0,240,255,", "rgba(112,0,255,", "rgba(0,255,157,"];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,240,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Ambient Orbs */}
      <div className="orb w-[700px] h-[700px] bg-primary/10 top-[-20%] left-[-15%] animate-float" />
      <div className="orb w-[600px] h-[600px] bg-accent/10 bottom-[-20%] right-[-10%] animate-float-reverse" />
      <div className="orb w-[300px] h-[300px] bg-highlight/5 top-[40%] left-[60%]" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 w-fit"
          >
            <div className="section-badge">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              ✦ Available — IST / EST / GMT
            </div>
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black tracking-[-0.03em] leading-[1.05]"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              Building
              <br />
              <span className="text-gradient-primary">Tomorrow&apos;s</span>
              <br />
              Web. Today.
            </motion.h1>
          </div>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 text-xl md:text-2xl font-medium text-gray-300"
          >
            <span className="text-gray-500">I am a</span>
            <span className="text-primary font-bold font-mono">
              {displayed}
              <span className="animate-pulse ml-0.5 border-r-2 border-primary">&nbsp;</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 max-w-lg leading-relaxed"
          >
            I craft high-performance, cinematic digital experiences — blending engineering precision with creative design. From intelligent AI agents to scalable web platforms, I build things that matter.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 text-sm font-bold relative z-10"
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="btn-outline flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
            >
              Let&apos;s Talk
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex items-center gap-4 pt-2"
          >
            <span className="text-xs text-gray-600 uppercase tracking-widest font-mono">Find me on</span>
            <div className="flex items-center gap-3">
              {[
                { href: "#", icon: <Github className="w-4 h-4" /> },
                { href: "https://www.linkedin.com/in/priyanshu-shukla-35630b332/", icon: <Linkedin className="w-4 h-4" /> },
                { href: "https://x.com/TheeeRakeee", icon: <Twitter className="w-4 h-4" /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Rotating ring */}
          <div className="absolute w-[420px] h-[420px] border border-dashed border-primary/20 rounded-full animate-spin-slow" />
          <div className="absolute w-[350px] h-[350px] border border-dashed border-accent/15 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />

          {/* Orbit dots */}
          {[0, 120, 240].map((deg, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-primary/80 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(200px) translateY(-50%)`,
              }}
            />
          ))}

          {/* Profile card */}
          <div className="relative w-[300px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-1.5 glow-primary card-shine">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src="/profile.jpg"
                  alt="Priyanshu Shukla"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-2xl p-4">
                    <p className="text-xs font-mono text-primary mb-1">// Full Stack Developer</p>
                    <h3 className="text-xl font-bold">Priyanshu Shukla</h3>
                    <p className="text-sm text-gray-400 mt-0.5">India 🇮🇳 · Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-primary/20 transition-colors">
              <div className="text-3xl font-black text-gradient-primary">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
              <div className="text-[10px] text-primary/60 mt-2 font-mono">{stat.subtitle}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-600 hover:text-primary transition-colors group">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
