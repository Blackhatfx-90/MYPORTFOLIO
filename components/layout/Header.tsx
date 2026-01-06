"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "py-4" : "py-6"
            )}
        >
            <div className="container mx-auto px-6">
                <div
                    className={cn(
                        "flex items-center justify-between rounded-full border border-transparent px-6 py-3 transition-all duration-300",
                        isScrolled &&
                        "bg-black/50 border-white/10 backdrop-blur-md shadow-lg shadow-primary/5"
                    )}
                >
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tighter text-foreground"
                    >
                        DEV<span className="text-primary">.</span>PORTFOLIO
                    </Link>

                    <nav className="hidden md:flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:glow-text"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <button className="hidden md:block rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-black transition-all">
                        RESUME
                    </button>

                    {/* Mobile Menu Toggle would go here */}
                </div>
            </div>
        </header>
    );
}
