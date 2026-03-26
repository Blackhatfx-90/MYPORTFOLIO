"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX - 20) * 0.12;
      ringY += (mouseY - ringY - 20) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => ring.classList.add("hovering");
    const onMouseLeaveLink = () => ring.classList.remove("hovering");

    const addHoverListeners = () => {
      const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    addHoverListeners();
    animFrame = requestAnimationFrame(animate);

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
