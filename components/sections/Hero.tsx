"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow delay-1000" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">

                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start gap-6"
                >
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-gray-300">Available for work</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
                        Building the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-accent animate-gradient-x">
                            Future
                        </span>{" "}
                        with Code.
                    </h1>

                    <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
                        I craft ultra-modern digital experiences that define the next generation of the web. high-performance, cinematic, and engineering-driven.
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                        <MagneticButton className="bg-primary text-black hover:bg-white hover:text-black border-none">
                            <span className="flex items-center gap-2 font-bold">
                                View Projects <ArrowRight className="w-4 h-4" />
                            </span>
                        </MagneticButton>
                        <MagneticButton>
                            Contact Me
                        </MagneticButton>
                    </div>
                </motion.div>

                {/* Right: Profile Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-6" />
                        <div className="relative h-full w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden">
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <img
                                    src="/profile.jpg"
                                    alt="Priyanshu Shukla"
                                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white">Priyanshu Shukla</h3>
                                    <p className="text-primary font-medium">Full Stack Developer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
