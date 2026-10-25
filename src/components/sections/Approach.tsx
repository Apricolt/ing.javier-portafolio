"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import AbstractVisual from "@/components/ui/AbstractVisual";
import Ouroboros from "@/components/ui/Ouroboros";
import { useApp } from "@/components/layout/Providers";

/**
 * "Mi enfoque": una ventana pequeña con el visual generativo que crece
 * hasta ocupar toda la pantalla mientras se hace scroll.
 */
export default function Approach() {
  const root = useRef<HTMLElement>(null);
  const ouroRef = useRef<HTMLDivElement>(null);
  const { t } = useApp();
  const [w1, w2] = t.profile.approachTitle;

  // Pausa el giro del ouroboros mientras la sección no se ve (ahorra batería)
  useEffect(() => {
    const section = root.current;
    const ouro = ouroRef.current;
    if (!section || !ouro) return;
    const io = new IntersectionObserver(([e]) => ouro.classList.toggle("anim-paused", !e.isIntersecting));
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const small = () => window.innerWidth < 768;
        gsap.set(".ap-copy", { opacity: 0, y: 40 });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            ".ap-frame",
            {
              width: () => (small() ? window.innerWidth * 0.72 : Math.min(window.innerWidth * 0.34, 500)),
              height: () => window.innerHeight * (small() ? 0.36 : 0.44),
              borderRadius: 28,
            },
            { width: () => window.innerWidth, height: () => window.innerHeight, borderRadius: 0, duration: 0.6 },
            0,
          )
          .to(".ap-w1", { xPercent: -70, opacity: 0, duration: 0.45 }, 0)
          .to(".ap-w2", { xPercent: 45, opacity: 0, duration: 0.45 }, 0)
          .to(".ap-hint", { opacity: 0, duration: 0.1 }, 0)
          .fromTo(".ap-ouro-inner", { scale: 0.92 }, { scale: 1.06, duration: 0.85 }, 0)
          .to(".ap-ouro", { opacity: 0.22, duration: 0.25 }, 0.5)
          .to(".ap-scrim", { opacity: 1, duration: 0.25 }, 0.5)
          .to(".ap-copy", { opacity: 1, y: 0, duration: 0.25 }, 0.6)
          .to({}, { duration: 0.15 });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".ap-frame", { width: "100%", height: "100%", borderRadius: 0 });
        gsap.set(".ap-title, .ap-hint", { autoAlpha: 0 });
        gsap.set(".ap-scrim", { opacity: 1 });
        gsap.set(".ap-ouro", { opacity: 0.22 });
        gsap.set(".ap-copy", { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="enfoque" ref={root} className="relative h-[260vh] bg-[#050505]" aria-labelledby="enfoque-title">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="ap-frame absolute left-1/2 top-1/2 h-[44vh] w-[34vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/10 [container-type:size]">
          {/* El lienzo mide siempre lo mismo que la pantalla; el marco actúa como ventana */}
          <div className="grain absolute left-1/2 top-1/2 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2">
            <AbstractVisual />
          </div>
          {/* El ouroboros crece con la ventana: siempre ocupa el 84% de su lado más corto */}
          <div ref={ouroRef} className="ap-ouro pointer-events-none absolute inset-0 grid place-items-center">
            <div className="ap-ouro-inner aspect-square w-[min(84cqw,84cqh)]">
              <Ouroboros />
            </div>
          </div>
          <div className="ap-scrim absolute inset-0 bg-black/55 opacity-0" />
        </div>

        <h2
          id="enfoque-title"
          className="ap-title pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-[0.25em] font-display text-[clamp(3rem,11vw,10.5rem)] font-bold uppercase leading-none tracking-tight text-white [text-shadow:0_8px_40px_rgb(0_0_0/0.55)]"
        >
          <span className="ap-w1 inline-block">{w1}</span>
          <span className="ap-w2 inline-block">{w2}</span>
        </h2>

        <div className="ap-copy absolute inset-0 z-30 flex flex-col items-center justify-center gap-7 px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-[#7aa2ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
            {w1} {w2}
          </span>
          <p className="max-w-3xl font-display text-[clamp(1.35rem,2.6vw,2.25rem)] font-medium leading-snug text-white">
            {t.profile.approach}
          </p>
        </div>

        <p className="ap-hint absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/55">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt" />
          {t.ui.expandHint}
        </p>
      </div>
    </section>
  );
}
