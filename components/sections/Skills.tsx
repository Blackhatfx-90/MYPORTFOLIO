"use client";

import { motion } from "framer-motion";

const skills = [
    "JavaScript", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "Node.js", "Python", "PostgreSQL",
    "GraphQL", "Docker", "AWS", "Framer Motion"
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 relative bg-black">
            <div className="container px-6 mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Tech <span className="text-accent">Stack</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl">
                        The tools and technologies I use to build world-class applications.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
                            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm md:text-base font-medium text-gray-300 cursor-default hover:text-white transition-colors hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
