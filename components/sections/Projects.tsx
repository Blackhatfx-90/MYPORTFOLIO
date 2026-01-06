"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        title: "Forex & Crypto Algo Bot",
        description: "Automated trading system utilizing advanced algorithms for market analysis and signal generation. Consistent profitability in Forex & Crypto markets.",
        tags: ["Python", "MQL5", "Binance API", "MetaTrader"],
        image: "/project-1.png",
        links: { demo: "#", code: "#" },
    },
    {
        title: "Vercel AI SDK Integration",
        description: "A comprehensive dashboard for managing AI agents and workflows. Features real-time streaming and model selection.",
        tags: ["Next.js", "Vercel AI", "Tailwind", "Shadcn"],
        image: "/project-2.png",
        links: { demo: "#", code: "#" },
    },
    {
        title: "FinTech Dashboard",
        description: "High-performance financial analytics platform with real-time WebSocket data feeds and interactive charts.",
        tags: ["React", "D3.js", "WebSockets", "Framer Motion"],
        image: "/project-3.png",
        links: { demo: "#", code: "#" },
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 relative bg-black">
            <div className="container px-6 mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Selected <span className="text-primary">Works</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        A collection of projects where design meets engineering excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-primary/50 transition-colors"
                        >
                            <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-black relative">
                                {/* Fallback for missing image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-xs">
                                    PROJECT PREVIEW
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <Link
                                        href={project.links.demo}
                                        className="p-3 rounded-full bg-white text-black hover:scale-110 transition-transform"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={project.links.code}
                                        className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
                                    >
                                        <Github className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
