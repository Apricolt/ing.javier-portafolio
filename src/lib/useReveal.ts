"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Hace aparecer (de abajo hacia arriba) los elementos con [data-reveal]
 * dentro del contenedor, en grupos escalonados al entrar en pantalla.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, selector = "[data-reveal]") {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>(selector);
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 56 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
          }),
      });
    },
    { scope },
  );
}
