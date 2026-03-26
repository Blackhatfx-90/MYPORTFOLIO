"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 bg-black border-t border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <span className="text-primary font-bold text-xs font-mono">P</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              PRIYANSHU<span className="text-primary">.DEV</span>
            </span>
          </Link>
          <div className="text-sm text-gray-500 font-mono">
            © {new Date().getFullYear()} Architecting the web.
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { href: "#", icon: <Github className="w-4 h-4" />, label: "GitHub" },
            { href: "https://x.com/TheeeRakeee", icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
            { href: "https://www.linkedin.com/in/priyanshu-shukla-35630b332/", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
            { href: "mailto:priyanshushukla.up26@gmail.com", icon: <Mail className="w-4 h-4" />, label: "Email" },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10 hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Back to top btn */}
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-1 text-gray-500 hover:text-primary transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
            <ArrowUp className="w-4 h-4" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-mono">Top</span>
        </button>

      </div>
    </footer>
  );
}
