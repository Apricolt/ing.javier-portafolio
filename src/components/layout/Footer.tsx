"use client";

import { useApp } from "./Providers";
import { me } from "@/data/content";
import { ArrowUpIcon } from "@/components/ui/Icons";

export default function Footer() {
  const { scrollTo, t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line/10 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-ash">
          © {year} {me.name}. {t.ui.footer}
        </p>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group flex items-center gap-2 text-sm font-medium text-ash transition-colors hover:text-bone"
        >
          {t.ui.backToTop}
          <span className="grid h-8 w-8 place-items-center rounded-full border border-line/15 transition-[border-color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-volt">
            <ArrowUpIcon className="h-4 w-4" />
          </span>
        </button>
      </div>
    </footer>
  );
}
