"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import { useApp } from "@/components/layout/Providers";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ExperienceItem } from "@/data/content";

/** Una fila de experiencia: a la izquierda fechas/lugar/tipo y a la derecha el detalle */
function ExperienceRow({
  item,
  techLabel,
  Heading,
}: {
  item: ExperienceItem;
  techLabel: string;
  Heading: "h3" | "h4";
}) {
  return (
    <li
      data-reveal
      className="group relative flex flex-col gap-5 border-b border-line/10 py-10 last:border-b-0 md:flex-row md:gap-10 md:py-14"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-px w-0 bg-volt transition-[width] duration-700 ease-out group-hover:w-full"
      />
      <div className="shrink-0 md:w-1/3">
        {/* Fechas y lugar son opcionales: solo se muestran si existen */}
        {item.period && <p className="mb-2 font-mono text-xs text-ash">{item.period}</p>}
        {item.org && (
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-volt-light">
            {item.org}
          </p>
        )}
        <span className="inline-block rounded-full border border-line/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
          {item.type}
        </span>
      </div>

      <div className="md:w-2/3">
        <Heading className="font-display text-2xl font-bold tracking-tight text-bone sm:text-3xl">{item.role}</Heading>
        <p className="mt-3 leading-relaxed text-ash">{item.description}</p>
        <ul className="mt-6 space-y-3">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-bone/80">
              <span aria-hidden="true" className="mt-[0.15em] text-xs text-volt">
                ▸
              </span>
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={techLabel}>
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-line/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ash"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const { t } = useApp();
  useReveal(root);

  return (
    <section
      id="experiencia"
      ref={root}
      className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8 md:py-40"
      aria-labelledby="experiencia-title"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-iron to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[340px] w-[90vw] max-w-[680px] -translate-x-1/2 rounded-full bg-volt/[0.08] blur-[110px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="experiencia-title"
          eyebrow={t.headings.experience.eyebrow}
          title={t.headings.experience.title}
          subtitle={t.headings.experience.subtitle}
          align="left"
        />

        <ol className="mt-16 md:mt-20">
          {t.experience.map((item) => (
            <ExperienceRow key={item.role + (item.period ?? "")} item={item} techLabel={t.ui.technologies} Heading="h3" />
          ))}
        </ol>

        {t.partTime.length > 0 && (
          <div className="mt-16 md:mt-20">
            {/* Subtítulo del bloque de tiempo parcial */}
            <div data-reveal className="flex items-center gap-4">
              <h3 className="shrink-0 font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                {t.headings.experience.partTime}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-line/10" />
            </div>
            <ul>
              {t.partTime.map((item) => (
                <ExperienceRow key={item.role} item={item} techLabel={t.ui.technologies} Heading="h4" />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
