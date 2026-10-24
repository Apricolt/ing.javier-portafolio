"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/layout/Providers";
import PressureText from "@/components/ui/PressureText";
import ParticlesField from "@/components/ui/ParticlesField";
import Button from "@/components/ui/Button";
import { profile } from "@/data/profile";

export default function Hero() {
  const { introDone } = useApp();
  const root = useRef<HTMLElement>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      // Estado inicial oculto (el preloader lo cubre mientras tanto)
      gsap.set(".pt-letter-wrap > span", { yPercent: reduced ? 0 : 110 });
      gsap.set(".hero-fade", { opacity: 0, y: reduced ? 0 : 26 });
      gsap.set(".hero-tagline", { opacity: 0, letterSpacing: reduced ? "0.35em" : "0.9em" });
      gsap.set(".hero-glow", { opacity: 0 });

      entrance.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .to(".hero-glow", { opacity: 1, duration: 2, ease: "power2.out" }, 0)
        .to(".pt-letter-wrap > span", { yPercent: 0, duration: 1.5, stagger: 0.07 }, 0.05)
        .to(".hero-tagline", { opacity: 1, letterSpacing: "0.35em", duration: 1.6, ease: "power3.out" }, 0.45)
        .to(".hero-fade", { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" }, 0.6);

      if (reduced) return;

      // Al salir del hero, la palabra se aleja y se desvanece
      gsap.to(".hero-word", {
        yPercent: -18,
        scale: 0.94,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-bottom", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "20% top", end: "70% top", scrub: true },
      });
    },
    { scope: root },
  );

  useEffect(() => {
    if (introDone) entrance.current?.play();
  }, [introDone]);

  return (
    <section
      id="inicio"
      ref={root}
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink"
      aria-labelledby="hero-title"
    >
      <ParticlesField className="absolute inset-0" />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[110vmin] animate-glow-pulse rounded-full bg-[radial-gradient(closest-side,rgb(47_107_255/0.42),rgb(13_42_138/0.22)_50%,transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050505_100%)]"
      />

      <div className="relative z-10 flex h-full flex-col px-5 pb-8 pt-24 sm:px-8 md:px-10 md:pb-10">
        <p className="hero-fade flex items-center gap-2.5 font-spaced text-[11px] font-semibold uppercase tracking-[0.3em] text-ash sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_10px_2px_rgb(47_107_255/0.8)]" />
          {profile.eyebrow}
        </p>

        <div className="relative flex flex-1 flex-col justify-center md:flex-row md:items-center">
          <h1 id="hero-title" className="sr-only">
            {profile.fullName} — {profile.role}
          </h1>
          <div className="hero-word w-full will-change-transform">
            <PressureText text={profile.heroWord} />
          </div>
          <p
            aria-hidden="true"
            className="hero-tagline pointer-events-none relative mt-6 text-center font-spaced text-[0.62rem] font-bold uppercase leading-relaxed text-volt drop-shadow-[0_0_14px_rgb(47_107_255/0.7)] md:absolute md:inset-x-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:text-[clamp(0.55rem,1.25vw,0.9rem)]"
          >
            {profile.tagline}
          </p>
        </div>

        <div className="hero-bottom flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[15px] leading-relaxed text-ash md:text-base">
            <span className="font-semibold text-bone">{profile.role}</span>
            {profile.intro.slice(profile.role.length)}
          </p>
          <div className="hero-fade flex flex-wrap items-center gap-3 md:flex-col md:items-end">
            <Button href="#proyectos">Ver proyectos</Button>
            <Button href="#contacto" variant="ghost">
              Hablemos
            </Button>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="hero-fade pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ash/70">Scroll</span>
          <span className="block h-10 w-px animate-scroll-line bg-gradient-to-b from-volt to-transparent" />
        </div>
      </div>
    </section>
  );
}
