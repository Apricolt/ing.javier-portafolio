"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number; blue: boolean };

/** Polvo de luz que flota lentamente detrás del hero. */
export default function ParticlesField({ className = "", active = true }: { className?: string; active?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Mientras no esté activo (p. ej. detrás del preloader) no se anima: ahorra procesador en la carga
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;

    const seed = () => {
      const count = Math.round(Math.min(110, (w * h) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.3,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.04 - Math.random() * 0.12,
        a: 0.15 + Math.random() * 0.55,
        tw: Math.random() * Math.PI * 2,
        blue: Math.random() < 0.3,
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      // En modo claro las partículas son oscuras para que se sigan viendo
      const light = document.documentElement.dataset.theme === "light";
      const base = light ? "17,17,20" : "237,237,240";
      const blue = light ? "36,80,214" : "122,162,255";
      for (const p of particles) {
        const alpha = p.a * (0.6 + 0.4 * Math.sin(t * 0.0015 + p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.blue ? `rgba(${blue},${alpha})` : `rgba(${base},${alpha * (light ? 0.5 : 0.8)})`;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !activeRef.current) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) p.y = h + 4;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
      }
      draw(t);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    resize();
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />;
}
