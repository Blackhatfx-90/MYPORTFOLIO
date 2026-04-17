"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly via transform (GPU-accelerated)
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const animate = () => {
      // Smooth lerp for ring — 0.15 = responsive yet fluid trail
      const dx = mouseX - ringX - 20;
      const dy = mouseY - ringY - 20;
      ringX += dx * 0.15;
      ringY += dy * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animFrame = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => ring.classList.add("hovering");
    const onMouseLeaveLink = () => ring.classList.remove("hovering");

    // Debounced hover listener registration
    let hoverTimeout: ReturnType<typeof setTimeout>;
    const addHoverListeners = () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
        interactables.forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterLink);
          el.addEventListener("mouseleave", onMouseLeaveLink);
        });
      }, 100);
    };

    // Start hidden
    dot.style.opacity = "0";
    ring.style.opacity = "0";

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    addHoverListeners();
    animFrame = requestAnimationFrame(animate);

    // Observe DOM changes with debounce
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
      clearTimeout(hoverTimeout);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ willChange: "transform" }} />
      <div ref={ringRef} className="cursor-ring" style={{ willChange: "transform" }} />
    </>
  );
}
