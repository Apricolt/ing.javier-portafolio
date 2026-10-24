"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type AppState = {
  /** true cuando el preloader terminó y el hero puede animar su entrada */
  introDone: boolean;
  finishIntro: () => void;
  /** Bloquea o libera el scroll (preloader y menú) */
  setScrollLocked: (locked: boolean) => void;
  /** Desplaza a un ancla o posición usando el scroll suave si está activo */
  scrollTo: (target: string | number) => void;
};

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <Providers>");
  return ctx;
}

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Siempre empezar arriba: el preloader y el hero esperan esa posición
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Recalcular posiciones cuando cargan las fuentes (cambian alturas)
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const setScrollLocked = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const value = useMemo(
    () => ({ introDone, finishIntro, setScrollLocked, scrollTo }),
    [introDone, finishIntro, setScrollLocked, scrollTo],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
