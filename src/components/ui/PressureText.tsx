"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  /** Si es false, el efecto queda quieto (p. ej. detrás del preloader) */
  active?: boolean;
};

// Rango de ejes de Roboto Flex
const WDTH = { min: 25, max: 151 };
const WGHT = { min: 120, max: 1000 };

/**
 * Palabra gigante cuyas letras se ensanchan y engrosan según la cercanía del cursor.
 * Sin cursor (táctil o inactivo) un "cursor virtual" recorre la palabra en bucle.
 *
 * Para no provocar saltos de diseño (CLS), cada letra tiene una posición fija
 * (absoluta) y solo cambia su propio ancho; el tamaño se calcula con CSS.
 */
export default function PressureText({ text, className = "", active = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  const spans = useRef<HTMLSpanElement[]>([]);
  const chars = text.split("");
  const n = chars.length;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const letters = spans.current.filter(Boolean);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (i: number, w: number, g: number, o: number) => {
      letters[i].style.fontVariationSettings = `'wdth' ${w.toFixed(1)}, 'wght' ${g.toFixed(0)}`;
      letters[i].style.opacity = o.toFixed(3);
    };

    if (reduced) {
      letters.forEach((_, i) => paint(i, 100, 700, 1));
      return;
    }

    const current = letters.map(() => ({ w: 60, g: 300, o: 0.6 }));
    const pointer = { x: 0, y: 0, last: -Infinity };
    const start = performance.now();
    let raf = 0;
    let visible = true;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.last = performance.now();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || !activeRef.current) return;

      const box = el.getBoundingClientRect();
      let px: number;
      let py: number;
      if (now - pointer.last < 2200) {
        px = pointer.x;
        py = pointer.y;
      } else {
        const t = (now - start) / 1000;
        px = box.left + box.width * (0.5 + 0.48 * Math.sin(t * 0.55));
        py = box.top + box.height * (0.5 + 0.25 * Math.sin(t * 1.3));
      }

      // Primero leer todas las posiciones, luego escribir (evita recalcular layout)
      const centers = letters.map((s) => {
        const r = s.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2] as const;
      });
      const reach = Math.max(box.width * 0.32, 160);

      centers.forEach(([cx, cy], i) => {
        const d = Math.hypot(px - cx, (py - cy) * 1.4);
        const k = Math.max(0, 1 - d / reach);
        const e = k * k * (3 - 2 * k);
        const c = current[i];
        c.w += (WDTH.min + (WDTH.max - WDTH.min) * e - c.w) * 0.1;
        c.g += (WGHT.min + (WGHT.max - WGHT.min) * e - c.g) * 0.1;
        c.o += (0.45 + 0.55 * e - c.o) * 0.1;
        paint(i, c.w, c.g, c.o);
      });
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [text]);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`w-full select-none font-flex uppercase leading-[0.82] text-bone [container-type:inline-size] ${className}`}
    >
      {/* Tamaño solo con CSS: el ancho disponible o el 42% del alto de pantalla, lo que sea menor */}
      <div
        className="relative"
        style={{ fontSize: `min(${(100 / (n * 0.6)).toFixed(2)}cqw, 42vh)`, height: "0.82em" }}
      >
        {chars.map((ch, i) => {
          // Distribuye las letras de borde a borde (como justify-between) sin depender de su ancho
          const p = n > 1 ? i / (n - 1) : 0.5;
          return (
            <span
              key={i}
              className="pt-letter-wrap absolute top-0 inline-block overflow-hidden px-[0.02em]"
              style={{ left: `${p * 100}%`, transform: `translateX(${-p * 100}%)` }}
            >
              <span
                ref={(node) => {
                  if (node) spans.current[i] = node;
                }}
                className="pt-letter inline-block will-change-[font-variation-settings]"
                style={{ fontVariationSettings: "'wdth' 60, 'wght' 300", opacity: 0.6 }}
              >
                {ch}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
