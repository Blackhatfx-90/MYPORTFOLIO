"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        year: "2023 - Present",
        role: "Algo Trading Developer & Quant",
        company: "Self-Employed",
        description: "Specialized in Forex (3+ years) and Crypto (2+ years) markets. Developed automated trading bots, signal generators, and backtested strategies using Python and MQL.",
    },
    {
        year: "2024 - Present",
        role: "Senior Frontend Engineer",
        company: "TechCorp Inc.",
        description: "Leading the frontend team in building next-gen scalable web applications. Implemented micro-frontend architecture.",
    },
    {
        year: "2021 - 2024",
        role: "Full Stack Developer",
        company: "StartUp Lab",
        description: "Developed and deployed critical features for high-growth startups. Utilized Next.js and Supabase.",
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 relative bg-black/50">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-20 pointer-events-none" />
            <div className="container px-6 mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Work <span className="text-primary">Experience</span>
                    </h2>
                </div>

                <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />

                            <div className="flex flex-col md:flex-row gap-2 md:items-center mb-2">
                                <span className="text-sm font-mono text-primary">{exp.year}</span>
                                <span className="hidden md:block text-gray-700 mx-2">/</span>
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            </div>

                            <div className="text-lg text-gray-400 font-medium mb-2">{exp.company}</div>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                                {exp.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
