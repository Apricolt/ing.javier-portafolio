"use client";

import { useRef } from "react";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { useApp } from "@/components/layout/Providers";

export default function Certifications() {
  const root = useRef<HTMLElement>(null);
  const { t } = useApp();
  useReveal(root);

  return (
    <section
      id="certificaciones"
      ref={root}
      className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8 md:py-36"
      aria-labelledby="certificaciones-title"
    >
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="certificaciones-title"
          title={t.headings.certifications.title}
          subtitle={t.headings.certifications.subtitle}
          echo
        />

        <ul className="mt-20 grid gap-5 md:mt-24 md:grid-cols-2 md:gap-6">
          {t.certifications.map((c, i) => (
            <li key={c.title} data-reveal className="flex">
              <SpotlightCard className="flex w-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-graphite/70 p-7 transition-[border-color,box-shadow] duration-500 hover:border-volt/40 hover:shadow-[0_30px_90px_-45px_rgb(47_107_255/0.7)] sm:p-9">
                <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em]">
                  <span className="text-volt-light">{c.issuer}</span>
                  <span className="text-ash">{c.date}</span>
                </div>

                <div className="mt-10 flex items-end gap-3">
                  <span className="bg-gradient-to-br from-bone via-bone to-volt-light bg-clip-text font-display text-6xl font-bold leading-none tracking-tight text-transparent sm:text-7xl">
                    {c.highlight}
                  </span>
                  <span className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                    {c.highlightLabel}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-xl font-semibold text-bone sm:text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">{c.description}</p>

                <div className="mt-auto flex items-center justify-between pt-8">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-bone transition-colors hover:text-volt-light"
                    >
                      {t.ui.verify}
                      <span className="sr-only">: {c.title}</span>
                      <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <span />
                  )}
                  <span className="font-mono text-xs text-line/25">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
