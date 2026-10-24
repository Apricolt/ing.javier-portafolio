"use client";

import { useApp } from "./Providers";
import { profile } from "@/data/profile";
import { ArrowUpIcon } from "@/components/ui/Icons";

export default function Footer() {
  const { scrollTo } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-ash">
          © {year} {profile.name}. Diseñado y desarrollado por mí.
        </p>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group flex items-center gap-2 text-sm font-medium text-ash transition-colors hover:text-bone"
        >
          Volver arriba
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-volt">
            <ArrowUpIcon className="h-4 w-4" />
          </span>
        </button>
      </div>
    </footer>
  );
}
