"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                syncTouch: false, // Turned off for flawless native mobile momentum scrolling
                wheelMultiplier: 0.9,
                touchMultiplier: 1.5,
                infinite: false,
                autoResize: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
