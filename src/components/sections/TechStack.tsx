"use client";

import { useApp } from "@/components/layout/Providers";
import SectionHeading from "@/components/ui/SectionHeading";
import { TechIcon } from "@/components/ui/TechIcons";
import { stackRows, type Tech } from "@/data/content";

function Chip({ tech }: { tech: Tech }) {
  return (
    <li className="mr-4 flex shrink-0 items-center gap-3 rounded-full border border-line/10 bg-line/[0.03] px-5 py-3 text-bone transition-colors duration-300 hover:border-volt/50 hover:bg-volt/[0.06] sm:px-6 sm:py-3.5">
      <TechIcon name={tech.icon} className="h-[22px] w-[22px] shrink-0" />
      <span className="whitespace-nowrap font-display text-base font-medium text-bone/90 sm:text-lg">{tech.name}</span>
    </li>
  );
}

function Row({ items, reverse }: { items: Tech[]; reverse?: boolean }) {
  // Cada copia repite la lista dos veces para cubrir pantallas anchas sin huecos
  const loop = [...items, ...items];
  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/row:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3`}
        style={{ ["--marquee-duration" as string]: `${loop.length * 4.5}s` }}
      >
        <ul className="flex">
          {loop.map((tech, i) => (
            <Chip key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </ul>
        {/* Copia para que el bucle sea continuo */}
        <ul className="flex motion-reduce:hidden" aria-hidden="true">
          {loop.map((tech, i) => (
            <Chip key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TechStack() {
  const { t } = useApp();
  return (
    <section id="stack" className="relative overflow-hidden bg-abyss py-24 md:py-32" aria-labelledby="stack-title">
      <div className="px-5 sm:px-8">
        <SectionHeading
          id="stack-title"
          eyebrow={t.headings.stack.eyebrow}
          title={t.headings.stack.title}
          subtitle={t.headings.stack.subtitle}
        />
      </div>
      <div className="mt-16 space-y-4 md:mt-20">
        <Row items={stackRows[0]} />
        <Row items={stackRows[1]} reverse />
      </div>
    </section>
  );
}
