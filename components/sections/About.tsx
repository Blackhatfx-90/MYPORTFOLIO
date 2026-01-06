"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Globe } from "lucide-react";

const features = [
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Full-Stack Engineer",
        description: "Building scalable applications with Next.js, TypeScript, and Node.js.",
    },
    {
        icon: <Cpu className="w-8 h-8 text-accent" />,
        title: "AI Integrator",
        description: "Embedding LLMs and intelligent agents into everyday workflows.",
    },
    {
        icon: <Globe className="w-8 h-8 text-green-400" />,
        title: "System Architect",
        description: "Designing robust cloud infrastructure and microservices.",
    },
];

export default function About() {
    return (
        <section id="about" className="py-24 relative bg-black/50 overflow-hidden">
            <div className="container px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Beyond the <span className="text-primary">Code</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I'm a passionate developer with a knack for creating intuitive, dynamic user experiences. My work bridges the gap between clean code and creative design, ensuring every project not only functions perfectly but feels alive.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
                        >
                            <div className="mb-4 p-4 rounded-full bg-white/5 w-fit group-hover:bg-primary/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
