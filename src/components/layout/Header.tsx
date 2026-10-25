"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "./Providers";
import { me, socials } from "@/data/content";
import { GlobeIcon, MoonIcon, PlusIcon, SunIcon } from "@/components/ui/Icons";

const pill =
  "pointer-events-auto rounded-full border border-line/15 bg-ink/40 text-bone backdrop-blur-md transition-[background-color,border-color,box-shadow,color] duration-300 hover:border-volt/50";

export default function Header() {
  const { setScrollLocked, scrollTo, t, toggleLocale, theme, toggleTheme } = useApp();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Timeline del menú: capas que entran escalonadas + ítems que suben (rápido, < 1 s)
  useGSAP(
    () => {
      gsap.set(".mn-layer, .mn-panel", { xPercent: 100 });
      gsap.set(".mn-item-inner", { yPercent: 120 });
      gsap.set(".mn-num, .mn-foot", { opacity: 0, y: 10 });

      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .set(menuRef.current, { visibility: "visible" })
        .to(".mn-backdrop", { opacity: 1, duration: 0.25 }, 0)
        .to(".mn-layer", { xPercent: 0, duration: 0.35, stagger: 0.05 }, 0)
        .to(".mn-panel", { xPercent: 0, duration: 0.4 }, 0.08)
        .to(".mn-item-inner", { yPercent: 0, duration: 0.5, stagger: 0.04 }, 0.16)
        .to(".mn-num", { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 }, 0.26)
        .to(".mn-foot", { opacity: 1, y: 0, duration: 0.3 }, 0.3);

      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(menuRef.current, { visibility: "hidden" });
      });
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (open) {
      timeline.timeScale(1).play();
      setScrollLocked(true);
      const id = window.setTimeout(() => firstLink.current?.focus(), 300);
      return () => window.clearTimeout(id);
    }
    timeline.timeScale(1.5).reverse();
    setScrollLocked(false);
  }, [open, setScrollLocked]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Espera a que se libere el scroll antes de desplazar
    window.setTimeout(() => scrollTo(href), 100);
  };

  const onTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8 md:px-10">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink/85 via-ink/40 to-transparent transition-opacity duration-500 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <a
          href="#inicio"
          onClick={go("#inicio")}
          className="pointer-events-auto font-display text-xl font-bold tracking-tight text-bone"
          aria-label={`${me.name} — ${t.ui.home}`}
        >
          {me.initials}
          <span className="text-volt">.</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Idioma: al pasar el cursor se ve a qué idioma cambia */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.ui.lang.aria}
            className={`${pill} group flex h-[42px] items-center gap-2 px-3.5 text-sm font-semibold`}
          >
            <GlobeIcon className="h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-180" />
            <span className="relative block h-5 overflow-hidden">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-5">
                <span className="block h-5 leading-5">{t.ui.lang.current}</span>
                <span className="block h-5 leading-5 text-volt-light">{t.ui.lang.target}</span>
              </span>
            </span>
            <span className="hidden max-w-0 overflow-hidden whitespace-nowrap font-medium text-ash opacity-0 transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:max-w-[72px] group-hover:opacity-100 sm:block">
              {t.ui.lang.targetName}
            </span>
          </button>

          {/* Tema claro / oscuro */}
          <button
            type="button"
            onClick={onTheme}
            aria-label={theme === "dark" ? t.ui.theme.toLight : t.ui.theme.toDark}
            className={`${pill} grid h-[42px] w-[42px] place-items-center`}
          >
            <span className="relative block h-[18px] w-[18px]">
              <SunIcon
                className={`absolute inset-0 h-full w-full transition-[transform,opacity] duration-500 ${
                  theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                }`}
              />
              <MoonIcon
                className={`absolute inset-0 h-full w-full transition-[transform,opacity] duration-500 ${
                  theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
                }`}
              />
            </span>
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={`${pill} group flex h-[42px] items-center gap-2 px-5 text-sm font-semibold ${
              open ? "!border-volt/50 !bg-volt/10 text-volt-light shadow-[0_0_28px_-4px_rgb(47_107_255/0.6)]" : ""
            }`}
          >
            <span className="relative block h-5 overflow-hidden">
              <span
                className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  open ? "-translate-y-5" : "translate-y-0"
                }`}
              >
                <span className="block h-5 leading-5">{t.ui.explore}</span>
                <span className="block h-5 leading-5">{t.ui.close}</span>
              </span>
            </span>
            <PlusIcon
              className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open ? "rotate-[135deg]" : "group-hover:rotate-90"
              }`}
            />
          </button>
        </div>
      </header>

      <div ref={menuRef} id="site-menu" className="invisible fixed inset-0 z-40" inert={!open} aria-label={t.ui.menu}>
        <div className="mn-backdrop absolute inset-0 bg-black/60 opacity-0" onClick={() => setOpen(false)} />
        <div className="absolute inset-y-0 right-0 w-full md:w-[min(64vw,760px)]">
          <div className="mn-layer absolute inset-0 bg-volt-deep" />
          <div className="mn-layer absolute inset-0 bg-volt" />
          <nav className="mn-panel grain absolute inset-0 flex flex-col justify-between overflow-y-auto bg-graphite px-7 pb-10 pt-28 sm:px-12 md:px-16">
            <ul className="space-y-1 sm:space-y-2">
              {t.nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={go(item.href)}
                    className="group inline-flex items-start gap-3"
                  >
                    {/* GSAP anima el span exterior; el hover va en el interior para no chocar con su transición */}
                    <span className="mn-item-inner inline-block will-change-transform">
                      <span className="inline-block font-display text-[clamp(1.9rem,8.5vw,3rem)] font-bold uppercase leading-[1.02] tracking-tight text-bone transition-[color,transform] duration-300 group-hover:translate-x-3 group-hover:text-volt-light md:text-[clamp(2.4rem,5vw,4.25rem)]">
                        {item.label}
                      </span>
                    </span>
                    <span className="mn-num mt-2 font-mono text-sm text-volt-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mn-foot mt-12 border-t border-line/10 pt-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-volt-light">{t.ui.socials}</p>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-ash transition-colors hover:text-bone"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
