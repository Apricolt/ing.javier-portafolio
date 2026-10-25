"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  echo?: boolean;
  align?: "center" | "left";
};

/** Título grande con palabras que suben al entrar y un eco en contorno detrás. */
export default function SectionHeading({ id, eyebrow, title, subtitle, echo = false, align = "center" }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const centered = align === "center";
  const words = title.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
      tl.from(".sh-word", { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.08, ease: "expo.out" });
      if (echo) tl.from(".sh-echo", { opacity: 0, scale: 0.92, duration: 1.4, ease: "power2.out" }, 0);
      if (eyebrow || subtitle) {
        tl.from(".sh-fade", { opacity: 0, y: 20, duration: 0.9, stagger: 0.1, ease: "power2.out" }, 0.25);
      }
    },
    { scope: root, dependencies: [title, subtitle], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={`relative ${centered ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p
          className={`sh-fade mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-volt-light ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_10px_2px_rgb(47_107_255/0.7)]" />
          {eyebrow}
        </p>
      )}
      <div className="relative">
        {echo && (
          <span
            aria-hidden="true"
            className="sh-echo text-outline pointer-events-none absolute inset-x-0 -top-[0.5em] select-none font-display text-[clamp(2.6rem,9vw,7.5rem)] font-bold uppercase leading-none tracking-tight"
          >
            {title}
          </span>
        )}
        <h2
          id={id}
          className="relative font-display text-[clamp(2.4rem,7.5vw,6.25rem)] font-bold uppercase leading-[0.95] tracking-tight text-bone"
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
              <span className="sh-word inline-block">{word}</span>
              {i < words.length - 1 && <span className="inline-block">{" "}</span>}
            </span>
          ))}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`sh-fade mt-6 max-w-2xl font-spaced text-sm uppercase leading-relaxed tracking-[0.22em] text-ash sm:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
