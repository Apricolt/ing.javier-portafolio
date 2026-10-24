"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "./Providers";
import { navItems, profile, socials } from "@/data/profile";
import { PlusIcon } from "@/components/ui/Icons";

export default function Header() {
  const { setScrollLocked, scrollTo } = useApp();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Timeline del menú: capas que entran escalonadas + ítems que suben
  useGSAP(
    () => {
      gsap.set(".mn-layer, .mn-panel", { xPercent: 100 });
      gsap.set(".mn-item-inner", { yPercent: 140, rotate: 6 });
      gsap.set(".mn-num, .mn-foot", { opacity: 0, y: 12 });

      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.out" } })
        .set(menuRef.current, { visibility: "visible" })
        .to(".mn-backdrop", { opacity: 1, duration: 0.4 }, 0)
        .to(".mn-layer", { xPercent: 0, duration: 0.55, stagger: 0.08 }, 0)
        .to(".mn-panel", { xPercent: 0, duration: 0.65 }, 0.14)
        .to(".mn-item-inner", { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.07 }, 0.3)
        .to(".mn-num", { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, 0.45)
        .to(".mn-foot", { opacity: 1, y: 0, duration: 0.5 }, 0.6);

      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(menuRef.current, { visibility: "hidden" });
      });
    },
    { scope: menuRef },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      t.timeScale(1).play();
      setScrollLocked(true);
      const id = window.setTimeout(() => firstLink.current?.focus(), 450);
      return () => window.clearTimeout(id);
    }
    t.timeScale(1.6).reverse();
    setScrollLocked(false);
  }, [open, setScrollLocked]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Espera a que se libere el scroll antes de desplazar
    window.setTimeout(() => scrollTo(href), 120);
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
          aria-label={`${profile.name} — inicio`}
        >
          {profile.initials}
          <span className="text-volt">.</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`pointer-events-auto group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition-[background-color,border-color,box-shadow,color] duration-300 ${
            open
              ? "border-volt/50 bg-volt/10 text-volt-light shadow-[0_0_28px_-4px_rgb(47_107_255/0.6)]"
              : "border-white/15 bg-black/40 text-bone hover:border-white/30"
          }`}
        >
          <span className="relative block h-5 overflow-hidden">
            <span
              className={`block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                open ? "-translate-y-5" : "translate-y-0"
              }`}
            >
              <span className="block h-5 leading-5">Explorar</span>
              <span className="block h-5 leading-5">Cerrar</span>
            </span>
          </span>
          <PlusIcon
            className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              open ? "rotate-[135deg]" : "group-hover:rotate-90"
            }`}
          />
        </button>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        className="invisible fixed inset-0 z-40"
        inert={!open}
        aria-label="Menú principal"
      >
        <div
          className="mn-backdrop absolute inset-0 bg-black/60 opacity-0 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="absolute inset-y-0 right-0 w-full md:w-[min(64vw,760px)]">
          <div className="mn-layer absolute inset-0 bg-volt-deep" />
          <div className="mn-layer absolute inset-0 bg-volt" />
          <nav className="mn-panel grain absolute inset-0 flex flex-col justify-between overflow-y-auto bg-graphite px-7 pb-10 pt-28 sm:px-12 md:px-16">
            <ul className="space-y-1 sm:space-y-2">
              {navItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={item.href}
                    onClick={go(item.href)}
                    className="group inline-flex items-start gap-3"
                  >
                    <span className="mn-item-inner inline-block origin-bottom-left font-display text-[clamp(1.9rem,8.5vw,3rem)] font-bold md:text-[clamp(2.4rem,5vw,4.25rem)] uppercase leading-[1.02] tracking-tight text-bone transition-[color,transform] duration-300 group-hover:translate-x-3 group-hover:text-volt-light">
                      {item.label}
                    </span>
                    <span className="mn-num mt-2 font-mono text-sm text-volt-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mn-foot mt-12 border-t border-white/10 pt-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-volt-light">Redes</p>
              <ul className="flex flex-wrap gap-x-7 gap-y-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.icon === "mail" ? undefined : "_blank"}
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
