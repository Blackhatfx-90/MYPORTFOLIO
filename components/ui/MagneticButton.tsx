"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    className,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.button
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            onClick={onClick}
            className={cn(
                "relative rounded-full border border-border bg-card px-6 py-3 text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary",
                className
            )}
        >
            {children}
        </motion.button>
    );
}
