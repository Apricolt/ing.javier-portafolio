"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/layout/Providers";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BrowserMockup from "@/components/ui/BrowserMockup";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/Icons";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const { t } = useApp();
  const projects = t.projects;
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
      className="relative z-10 overflow-hidden bg-abyss px-5 pb-24 pt-28 sm:px-8 md:pb-36 md:pt-40"
      aria-labelledby="proyectos-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-volt/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="proyectos-title"
          title={t.headings.projects.title}
          subtitle={t.headings.projects.subtitle}
          echo
        />

        <ul className="mt-20 space-y-10 md:mt-28 md:space-y-14">
          {projects.map((p, i) => {
            // Tarjetas horizontales: texto a un lado y captura al otro, alternando
            const flip = i % 2 === 1;
            return (
              <li key={p.image}>
                <SpotlightCard className="pj-card group grid items-center gap-8 overflow-hidden rounded-[28px] border border-line/10 bg-gradient-to-b from-graphite to-coal p-5 transition-[border-color,box-shadow] duration-500 hover:border-volt/40 hover:shadow-[0_40px_120px_-50px_rgb(47_107_255/0.65)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12 lg:p-10">
                  <div className={flip ? "lg:order-2" : ""}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t.ui.codeOf(p.title)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-line/15 bg-line/5 text-bone transition-colors hover:border-line/40"
                          >
                            <GithubIcon className="h-[18px] w-[18px]" />
                          </a>
                        )}
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-opacity hover:opacity-90"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
                            {t.ui.liveSite}
                            {/* Texto oculto: dice a qué proyecto lleva el enlace (accesibilidad y SEO) */}
                            <span className="sr-only">: {p.title}</span>
                            <ArrowUpRightIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <span className="font-mono text-xs text-volt-light">
                        {String(i + 1).padStart(2, "0")} / {total}
                      </span>
                    </div>

                    <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ash">{p.kind}</p>
                    <h3 className="mt-2 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight text-bone">
                      {p.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-ash">{p.description}</p>

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.ui.technologies}>
                      {p.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line/10 bg-line/[0.04] px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-bone/80"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`transition-transform duration-700 ease-out group-hover:-translate-y-1 ${
                      flip ? "lg:order-1" : ""
                    }`}
                  >
                    <BrowserMockup src={p.image} alt={p.imageAlt} url={p.live} />
                  </div>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
