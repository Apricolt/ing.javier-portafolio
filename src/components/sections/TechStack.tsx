"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { stackRows, type Tech } from "@/data/profile";

const DARK_ICONS = new Set(["nextjs.svg", "github.svg"]);

function Chip({ tech }: { tech: Tech }) {
  return (
    <li className="group mr-4 flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 transition-colors duration-300 hover:border-volt/50 hover:bg-volt/[0.06] sm:px-6 sm:py-3.5">
      {tech.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/icons/${tech.icon}`}
          alt=""
          width={22}
          height={22}
          className={`h-[22px] w-[22px] ${DARK_ICONS.has(tech.icon) ? "icon-mono" : "opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"}`}
        />
      ) : (
        <span className="h-2 w-2 rounded-full bg-volt shadow-[0_0_8px_1px_rgb(47_107_255/0.8)]" />
      )}
      <span className="whitespace-nowrap font-display text-base font-medium text-bone/90 sm:text-lg">{tech.name}</span>
    </li>
  );
}

function Row({ items, reverse }: { items: Tech[]; reverse?: boolean }) {
  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/row:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3`}
        style={{ ["--marquee-duration" as string]: `${items.length * 4.5}s` }}
      >
        <ul className="flex">
          {items.map((t) => (
            <Chip key={t.name} tech={t} />
          ))}
        </ul>
        {/* Copia para que el bucle sea continuo */}
        <ul className="flex motion-reduce:hidden" aria-hidden="true">
          {items.map((t) => (
            <Chip key={t.name} tech={t} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative overflow-hidden bg-black py-24 md:py-32" aria-labelledby="stack-title">
      <div className="px-5 sm:px-8">
        <SectionHeading
          id="stack-title"
          eyebrow="Stack"
          title="Con qué construyo"
          subtitle="Del core bancario al navegador."
        />
      </div>
      <div className="mt-16 space-y-4 md:mt-20">
        <Row items={stackRows[0]} />
        <Row items={stackRows[1]} reverse />
      </div>
    </section>
  );
}
