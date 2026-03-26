"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3" : "py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
              isScrolled
                ? "bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : ""
            )}
          >
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <span className="text-primary font-bold text-sm font-mono">P</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                PRIYANSHU
                <span className="text-primary">.</span>
                <span className="text-gradient-primary">DEV</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                    activeSection === item.href.replace("#", "")
                      ? "text-primary"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {activeSection === item.href.replace("#", "") && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Resume Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 z-40 mx-6 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-xl p-6"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <span className="text-primary text-xs font-mono">0{i + 1}.</span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
