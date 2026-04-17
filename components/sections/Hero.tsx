"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, ChevronDown } from "lucide-react";

const roles = [
  "Full Stack Architect",
  "UI / UX Engineer",
  "Digital Experience Creator",
];

const stats = [
  { value: "3+", label: "Years Experience", subtitle: "Engineering the Web" },
  { value: "15+", label: "Platforms Shipped", subtitle: "For Startups & Enterprise" },
  { value: "100%", label: "Client Satisfaction", subtitle: "Delivering Excellence" },
];

// Smooth spring config reused across components
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Stagger container variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Smoother cinematic stagger
      delayChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax effect for the entire hero on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), smoothSpring);
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0]), smoothSpring);

  // Elegant Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 70);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 3000); // Wait longer on full text
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 pt-32 text-center w-full"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          {/* Badge */}
          <motion.div variants={childVariants} className="flex items-center justify-center w-full">
            <div className="section-badge px-6 py-2">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for New Opportunities
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={childVariants} className="space-y-4 tracking-tight">
            <h1
              className="text-6xl md:text-7xl xl:text-[7rem] font-bold tracking-[-0.04em] leading-[1.05] text-[#FAFAFA]"
            >
              Building Digital
              <br />
              <span className="text-gradient-primary relative">
                Excellence
              </span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div
            variants={childVariants}
            className="flex items-center justify-center gap-3 text-lg md:text-2xl font-medium text-[#a1a1aa] h-8"
          >
            <span className="text-[#a1a1aa] font-mono tracking-tight">
              {displayed}
              <span className="animate-pulse ml-0.5 border-r border-[#ffffff]">&nbsp;</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl leading-relaxed mt-4"
          >
            I engineer elite spatial web experiences and scalable architectures. 
            Blending absolute precision with creative design to turn bold visions into flawless reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap items-center justify-center gap-5 mt-6"
          >
            <a
              href="#projects"
              className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5 text-[15px]"
            >
              Explore Portfolio <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="btn-outline flex items-center justify-center gap-2 px-8 py-3.5 text-[15px]"
            >
              Start a Conversation
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={childVariants} className="flex items-center gap-5 pt-8">
            <span className="text-xs text-[#555555] uppercase tracking-[0.2em] font-medium">Connect</span>
            <div className="flex items-center gap-3">
              {[
                { href: "#", icon: <Github className="w-[18px] h-[18px]" /> },
                { href: "https://www.linkedin.com/in/priyanshu-shukla-35630b332/", icon: <Linkedin className="w-[18px] h-[18px]" /> },
                { href: "https://x.com/TheeeRakeee", icon: <Twitter className="w-[18px] h-[18px]" /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/5 bg-white/[0.02] text-[#a1a1aa] hover:text-[#fff] hover:border-white/20 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Row Dropdown (Cinematic Cards) */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
              className="glass rounded-[20px] p-8 text-center border border-white/[0.04] hover:border-white/[0.1] transition-colors duration-500 card-shine"
            >
              <div className="text-4xl font-black text-[#ffffff] tracking-tighter">{stat.value}</div>
              <div className="text-xs text-[#a1a1aa] mt-3 font-medium uppercase tracking-[0.1em]">{stat.label}</div>
              <div className="text-[11px] text-[#777777] mt-2 font-mono tracking-tight">{stat.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-[#555555] hover:text-[#ffffff] transition-colors duration-500">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
