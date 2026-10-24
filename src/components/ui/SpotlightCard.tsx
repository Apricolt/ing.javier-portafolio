"use client";

import type { HTMLAttributes, PointerEvent } from "react";

/** Contenedor con un foco de luz azul que sigue al cursor (ver .spotlight en globals.css). */
export default function SpotlightCard({ className = "", children, ...rest }: HTMLAttributes<HTMLElement>) {
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article onPointerMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </article>
  );
}
