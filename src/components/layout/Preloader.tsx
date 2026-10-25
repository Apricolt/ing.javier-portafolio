"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "./Providers";
import { me } from "@/data/content";

export default function Preloader() {
  const { finishIntro, setScrollLocked, t } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
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
              const v = Math.round(progress.value);
              if (counter.current) counter.current.textContent = String(v).padStart(3, "0");
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
      <div className="pl-content flex w-[min(80vw,420px)] flex-col items-center">
        <span
          ref={counter}
          className="font-display text-7xl font-bold tabular-nums tracking-tight text-bone sm:text-8xl"
        >
          000
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
