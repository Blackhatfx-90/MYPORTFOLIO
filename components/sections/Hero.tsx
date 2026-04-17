"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from "lucide-react";

const roles = [
  "Full Stack Architect",
  "AI Systems Engineer",
  "Digital Experience Creator",
];

const stats = [
  { value: "3+", label: "Years in Code", subtitle: "Building the Future" },
  { value: "15+", label: "Projects Deployed", subtitle: "Across 8+ Industries" },
  { value: "5+", label: "AI Systems Shipped", subtitle: "Used by 200+ Users" },
];

// Reduced particle count for better perf
const PARTICLE_COUNT = 40;
const CONNECTION_DISTANCE = 90;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

// Smooth spring config reused across components
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect for the entire hero on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), smoothSpring);
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.6], [1, 0]), smoothSpring);

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

  // Optimized particle canvas with RAF batching
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const colors = ["rgba(0,240,255,", "rgba(112,0,255,", "rgba(0,255,157,"];
    
    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const particles = particlesRef.current;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      }

      // Draw connections — batch line drawing
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,240,255,${0.05 * (1 - dist / CONNECTION_DISTANCE)})`;
            ctx.stroke();
          }
        }
      }

      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      setCanvasSize();
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ willChange: "contents" }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Ambient Orbs — reduced blur for perf */}
      <div className="orb w-[700px] h-[700px] bg-primary/8 top-[-20%] left-[-15%] animate-float" />
      <div className="orb w-[600px] h-[600px] bg-accent/8 bottom-[-20%] right-[-10%] animate-float-reverse" />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 pt-24 text-center w-full"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={childVariants} className="flex items-center gap-3 w-fit">
            <div className="section-badge">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              ✦ Online — Ready to Build
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={childVariants} className="space-y-2">
            <h1
              className="text-5xl md:text-6xl xl:text-8xl font-black tracking-[-0.03em] leading-[1.05]"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              Crafting the
              <br />
              <span className="text-gradient-primary">Digital Future</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            variants={childVariants}
            className="flex items-center justify-center gap-3 text-xl md:text-2xl font-medium text-gray-300"
          >
            <span className="text-gray-500">{">"}</span>
            <span className="text-primary font-bold font-mono">
              {displayed}
              <span className="animate-pulse ml-0.5 border-r-2 border-primary">&nbsp;</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={childVariants}
            className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            I engineer next-gen web experiences powered by AI — where code meets creativity and every pixel has purpose. From autonomous agents to cinematic interfaces, I turn bold visions into reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 text-sm font-bold relative z-10"
            >
              Explore My Work <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="btn-outline flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
            >
              Start a Mission
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={childVariants} className="flex items-center gap-4 pt-2">
            <span className="text-xs text-gray-600 uppercase tracking-widest font-mono">Connect</span>
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
                  className="p-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12 mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1 + i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="text-3xl font-black text-gradient-primary">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
              <div className="text-[10px] text-primary/60 mt-2 font-mono">{stat.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-300 group">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
