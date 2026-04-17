"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

const FRAME_COUNT = 300;
const REDUCED_MOTION_FRAME = Math.floor(FRAME_COUNT * 0.62);

function getFramePath(frameNumber: number) {
  return `/cyberframes/male${String(frameNumber).padStart(4, "0")}.png`;
}

function drawCoverImage(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  viewportWidth: number,
  viewportHeight: number
) {
  if (!img.naturalWidth || !img.naturalHeight) return;
  if (!viewportWidth || !viewportHeight) return;

  const hRatio = viewportWidth / img.naturalWidth;
  const vRatio = viewportHeight / img.naturalHeight;
  const ratio = Math.min(hRatio, vRatio) * 0.9;
  const drawWidth = img.naturalWidth * ratio;
  const drawHeight = img.naturalHeight * ratio;
  const centerShiftX = (viewportWidth - drawWidth) / 2;
  const centerShiftY = (viewportHeight - drawHeight) / 2;

  ctx.clearRect(0, 0, viewportWidth, viewportHeight);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    0,
    0,
    img.naturalWidth,
    img.naturalHeight,
    centerShiftX,
    centerShiftY,
    drawWidth,
    drawHeight
  );
}

export default function CyberAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // High-performance Framer Motion hook to manage stable mobile scrolling!
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let rafId = 0;
    let hasMounted = true;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Smooth frame interpolation state
    let currentFrame = 1;
    let targetFrame = 1;
    let lastTime = performance.now();
    let lastRenderedIndex = -1;
    let renderWidth = 0;
    let renderHeight = 0;

    // Time-independent exponential damping (higher = snappier, lower = silkier)
    const DAMPING = 12;

    const updateCanvasSize = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = stage.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      // Cache dimensions to prevent layout thrashing (forces layout calc otherwise)
      renderWidth = width;
      renderHeight = height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      // Force a redraw
      lastRenderedIndex = -1;
    };

    const getFrameFromPageScroll = () => {
      if (mediaQuery.matches) return REDUCED_MOTION_FRAME;

      // scrollYProgress.get() is incredibly stable on mobile and protects against
      // sudden layout shifts when the URL bar expands/collapses
      const progress = scrollYProgress.get();

      return Math.min(
        FRAME_COUNT,
        Math.max(1, Math.round(progress * (FRAME_COUNT - 1)) + 1)
      );
    };

    const renderFrame = (frameNum: number) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(frameNum) - 1));
      
      // CRITICAL OPTIMIZATION: Do not issue GPU draw command if frame hasn't changed.
      if (idx === lastRenderedIndex) return;

      const frameImage = imagesRef.current[idx];
      if (!frameImage || !frameImage.complete) return;

      drawCoverImage(frameImage, ctx, renderWidth, renderHeight);
      lastRenderedIndex = idx;
    };

    // Ultra-smooth 200+ FPS delta-time based animation loop
    const animate = (time: number) => {
      if (!hasMounted) return;

      // Cap delta time to prevent huge jumps if tab was inactive
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      targetFrame = getFrameFromPageScroll();
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) > 0.01) {
        // Time-independent exponential smoothing formula
        // Works identically on a 60hz or 240hz monitor
        const factor = 1 - Math.exp(-DAMPING * dt);
        currentFrame += diff * factor;
        renderFrame(currentFrame);
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      updateCanvasSize();
      renderFrame(currentFrame);
    };

    updateCanvasSize();

    // Preload images with priority loading for first visible frames
    imagesRef.current = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const img = new Image();
      if (index < 30) {
        img.fetchPriority = "high";
      }
      img.decoding = "async";
      img.src = getFramePath(index + 1);
      img.onload = () => {
        if (!hasMounted) return;
        if (index + 1 === Math.round(targetFrame)) {
          renderFrame(index + 1);
        }
      };
      return img;
    });

    // We no longer need manual scroll event listeners!
    // Framer Motion automatically orchestrates updates to scrollYProgress
    window.addEventListener("resize", handleResize);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", () => {
        targetFrame = getFrameFromPageScroll();
      });
    }

    // Start animation loop
    rafId = requestAnimationFrame(animate);

    return () => {
      hasMounted = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollYProgress]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-3 md:px-8"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <div
        ref={stageRef}
        className="relative w-[88vw] max-w-[680px] sm:w-[78vw] sm:max-w-[720px] md:w-[70vw] md:max-w-[760px] lg:w-[62vw] lg:max-w-[820px] aspect-[16/9]"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full rounded-[1.2rem] md:rounded-[1.6rem] opacity-[0.94]"
          style={{ willChange: "contents" }}
        />
        <div className="absolute inset-0 rounded-[1.2rem] md:rounded-[1.6rem] border border-white/10 shadow-[0_0_70px_rgba(0,240,255,0.14)]" />
        <div className="absolute inset-0 rounded-[1.2rem] md:rounded-[1.6rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(0,0,0,0.28)_76%)]" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(0,240,255,0.08),transparent_45%),radial-gradient(circle_at_78%_75%,rgba(112,0,255,0.08),transparent_48%)]" />
    </div>
  );
}
