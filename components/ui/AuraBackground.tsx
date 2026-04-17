"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuraBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smoothly track mouse position to offset the aura
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Primary elegant aura */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(138,43,226,0) 70%)",
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 20,
          mass: 2,
        }}
      />
      
      {/* Static secondary aura for depth */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[1000px] h-[1000px] rounded-full opacity-10 blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(138,43,226,0.6) 0%, rgba(0,0,0,0) 70%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Architectural grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  );
}
