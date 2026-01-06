"use client";

import { motion } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import { Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 relative bg-black overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />

            <div className="container px-6 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Let's <span className="text-primary">Build</span> Something Extraordinary.
                    </h2>
                    <p className="text-muted-foreground text-lg mb-12">
                        Ready to take your digital presence to the next level? Reach out and let's discuss your vision.
                    </p>

                    <form className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email</label>
                                <input
                                    type="email"
                                    placeholder="priyanshushukla.up26@gmail.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Tell me about your project..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-white/10 resize-none"
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <MagneticButton className="w-full md:w-auto bg-primary text-black hover:bg-white hover:text-black border-none">
                                <span className="flex items-center gap-2 font-bold justify-center">
                                    Send Message <Send className="w-4 h-4 ml-1" />
                                </span>
                            </MagneticButton>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
