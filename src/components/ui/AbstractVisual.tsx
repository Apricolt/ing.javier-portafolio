"use client";

import { useEffect, useRef } from "react";

/**
 * Visual generativo para la sección "Mi enfoque": líneas de flujo azules
 * que ondulan como un mapa de datos. Hecho 100% con canvas, sin imágenes.
 */
export default function AbstractVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const LINES = 34;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = false;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(4000);
    };

    const draw = (ms: number) => {
      const t = ms / 1000;

      // Fondo: profundidad azul con un núcleo de luz que se desplaza
      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#03040a");
      bg.addColorStop(0.55, "#061033");
      bg.addColorStop(1, "#020206");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const ox = w * (0.5 + 0.18 * Math.sin(t * 0.21));
      const oy = h * (0.45 + 0.12 * Math.cos(t * 0.17));
      const orb = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.max(w, h) * 0.55);
      orb.addColorStop(0, "rgba(47,107,255,0.55)");
      orb.addColorStop(0.35, "rgba(13,42,138,0.35)");
      orb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = orb;
      ctx.fillRect(0, 0, w, h);

      // Líneas de flujo
      ctx.globalCompositeOperation = "lighter";
      const step = Math.max(6, w / 140);
      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        const bell = Math.sin(p * Math.PI);
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const nx = x / w;
          const y =
            h * (0.12 + 0.76 * p) +
            Math.sin(nx * 3.1 + t * 0.45 + p * 2.6) * h * 0.09 +
            Math.sin(nx * 7.3 - t * 0.32 + p * 6.1) * h * 0.025 +
            Math.cos(nx * 1.4 + t * 0.18) * h * 0.12 * (1 - p);
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const hue = 218 + p * 16;
        ctx.strokeStyle = `hsla(${hue}, 100%, ${48 + bell * 22}%, ${0.08 + bell * 0.42})`;
        ctx.lineWidth = 0.8 + bell * 1.4;
        ctx.stroke();
      }

      // Nodos que viajan sobre algunas líneas
      for (let i = 0; i < 9; i++) {
        const p = (i * 0.113 + 0.1) % 1;
        const nx = (t * 0.035 * (1 + (i % 3) * 0.4) + i * 0.37) % 1;
        const x = nx * w;
        const y =
          h * (0.12 + 0.76 * p) +
          Math.sin(nx * 3.1 + t * 0.45 + p * 2.6) * h * 0.09 +
          Math.sin(nx * 7.3 - t * 0.32 + p * 6.1) * h * 0.025 +
          Math.cos(nx * 1.4 + t * 0.18) * h * 0.12 * (1 - p);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, "rgba(190,210,255,0.9)");
        g.addColorStop(1, "rgba(47,107,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - 14, y - 14, 28, 28);
      }
    };

    const loop = (ms: number) => {
      raf = requestAnimationFrame(loop);
      if (visible) draw(ms);
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

  return <canvas ref={canvasRef} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
