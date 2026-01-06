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

                {/* Right: Abstract Visual / Terminal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl transform rotate-6" />
                        <div className="relative h-full w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
                            {/* Fake Terminal Header */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>

                            {/* Code Content */}
                            <div className="font-mono text-sm text-gray-400 space-y-1">
                                <p><span className="text-purple-400">const</span> <span className="text-yellow-300">portfolio</span> = <span className="text-blue-400">new</span> <span className="text-green-400">Experience</span>({`{`}</p>
                                <p className="pl-4"><span className="text-blue-300">mode</span>: <span className="text-orange-300">"cinematic"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">theme</span>: <span className="text-orange-300">"ultra-dark"</span>,</p>
                                <p className="pl-4"><span className="text-blue-300">tech</span>: [<span className="text-orange-300">"Next.js"</span>, <span className="text-orange-300">"Tailwind"</span>],</p>
                                <p className="pl-4"><span className="text-blue-300">performance</span>: <span className="text-purple-400">100</span></p>
                                <p>{`}`});</p>
                                <p className="text-gray-600 animate-pulse">_</p>
                            </div>

                            <div className="absolute bottom-0 right-0 p-6 opacity-20">
                                <Terminal className="w-32 h-32" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
