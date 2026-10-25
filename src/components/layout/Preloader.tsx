"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "./Providers";
import { me } from "@/data/content";

// Ruedas del contador tipo odómetro: centenas (0-1), decenas y unidades (0-9 con un 0 extra
// al final para que el giro de 9 a 0 sea continuo)
const WHEELS = [[0, 1], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]];
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export default function Preloader() {
  const { finishIntro, setScrollLocked, t } = useApp();
  const root = useRef<HTMLDivElement>(null);
  // Los dígitos nunca cambian de texto: solo se desplazan (así el navegador no repinta el
  // elemento más grande en cada número, lo que retrasaba el LCP en móvil)
  const wheels = useRef<HTMLSpanElement[]>([]);
  const [hidden, setHidden] = useState(false);

  useGSAP(
    () => {
      setScrollLocked(true);
      const reduced = prefersReducedMotion();
      const progress = { value: 0 };

      const done = () => {
        setScrollLocked(false);
        setHidden(true);
      };

      const tl = gsap.timeline({ onComplete: done });

      tl.from(".pl-name span", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.025,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          progress,
          {
            value: 100,
            duration: reduced ? 0.3 : 2,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = progress.value;
              // Unidades giran siempre; decenas y centenas giran durante el último paso
              const pos = [
                v >= 100 ? 1 : clamp01(v - 99),
                Math.floor(v / 10) + clamp01((v % 10) - 9),
                v % 10,
              ];
              wheels.current.forEach((w, i) => {
                if (w) w.style.transform = `translateY(${-pos[i]}em)`;
              });
            },
          },
          0,
        )
        .fromTo(
          ".pl-line",
          { scaleX: 0 },
          { scaleX: 1, duration: reduced ? 0.3 : 2, ease: "power2.inOut" },
          0,
        )
        .to(".pl-content", { yPercent: -30, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.15")
        // El hero arranca mientras el telón sube
        .add(finishIntro, "-=0.1")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");
    },
    { scope: root },
  );

  if (hidden) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      role="status"
      aria-label={t.ui.loading}
    >
      <div className="pl-content flex w-[min(86vw,520px)] flex-col items-center">
        {/* Contador tipo odómetro: cada rueda muestra un dígito a la vez */}
        <span
          aria-hidden="true"
          className="flex font-display text-[clamp(7rem,32vw,16rem)] font-bold leading-none tabular-nums tracking-tight text-bone"
        >
          {WHEELS.map((digits, col) => (
            <span key={col} className="block h-[1em] overflow-hidden">
              <span
                ref={(node) => {
                  if (node) wheels.current[col] = node;
                }}
                className="block will-change-transform"
              >
                {digits.map((d, i) => (
                  <span key={i} className="block h-[1em]">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </span>
        <p
          className="pl-name mt-4 overflow-hidden font-spaced text-xs tracking-[0.45em] text-ash sm:text-sm"
          aria-hidden="true"
        >
          {me.name.toUpperCase().split("").map((ch, i) => (
            <span key={i} className="inline-block whitespace-pre">
              {ch}
            </span>
          ))}
        </p>
        <div className="mt-7 h-px w-full bg-line/10">
          <div className="pl-line h-full w-full origin-left bg-volt shadow-[0_0_12px_2px_rgb(47_107_255/0.6)]" />
        </div>
      </div>
    </div>
  );
}
