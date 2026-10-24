"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BrowserMockup from "@/components/ui/BrowserMockup";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/profile";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const total = String(projects.length).padStart(2, "0");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".pj-card").forEach((card) => {
        gsap.from(card, {
          y: 90,
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
        // Parallax suave de la captura dentro del mockup
        const img = card.querySelector(".bm-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section
      id="proyectos"
      ref={root}
      className="relative z-10 overflow-hidden bg-black px-5 pb-24 pt-28 sm:px-8 md:pb-36 md:pt-40"
      aria-labelledby="proyectos-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-volt/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="proyectos-title"
          title="Proyectos destacados"
          subtitle="Del cliente freelance a la aplicación con chatbot: soluciones web pensadas, construidas y publicadas de punta a punta."
          echo
        />

        <ul className="mt-20 space-y-10 md:mt-28 md:space-y-14">
          {projects.map((p, i) => (
            <li key={p.title}>
              <SpotlightCard className="pj-card group overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-graphite to-coal p-5 transition-[border-color,box-shadow] duration-500 hover:border-volt/40 hover:shadow-[0_40px_120px_-50px_rgb(47_107_255/0.65)] sm:p-8 md:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Código de ${p.title} en GitHub`}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-bone transition-colors hover:border-white/40"
                      >
                        <GithubIcon className="h-[18px] w-[18px]" />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-white"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                        Ver sitio
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <span className="font-mono text-xs text-volt-light">
                    {String(i + 1).padStart(2, "0")} / {total}
                  </span>
                </div>

                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">{p.kind}</p>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,4.2vw,3rem)] font-bold leading-tight tracking-tight text-bone">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-ash">{p.description}</p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologías">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-bone/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 transition-transform duration-700 ease-out group-hover:-translate-y-1">
                  <BrowserMockup src={p.image} alt={p.imageAlt} url={p.live} />
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
