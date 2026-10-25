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
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { content, type Content, type Locale } from "@/data/content";

export type Theme = "dark" | "light";

type AppState = {
  /** true cuando el preloader terminó y el hero puede animar su entrada */
  introDone: boolean;
  finishIntro: () => void;
  /** Bloquea o libera el scroll (preloader y menú) */
  setScrollLocked: (locked: boolean) => void;
  /** Desplaza a un ancla o posición usando el scroll suave si está activo */
  scrollTo: (target: string | number) => void;
  locale: Locale;
  /** Textos del idioma actual */
  t: Content;
  toggleLocale: () => void;
  theme: Theme;
  /** Cambia el tema; el origen es el punto desde donde crece el círculo de la transición */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const AppContext = createContext<AppState | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <Providers>");
  return ctx;
}

const canTransition = () =>
  typeof document !== "undefined" && "startViewTransition" in document && !prefersReducedMotion();

const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* modo privado: no se guarda la preferencia */
  }
};

// Preferencias (idioma y tema) en un pequeño store externo.
// En el servidor siempre valen español/oscuro; en el navegador se leen de lo guardado.
type Prefs = { locale: Locale; theme: Theme };
const DEFAULT_PREFS: Prefs = { locale: "es", theme: "dark" };
let prefs: Prefs | null = null;
const listeners = new Set<() => void>();

const readPrefs = (): Prefs => {
  if (prefs) return prefs;
  let locale: Locale = "es";
  try {
    if (localStorage.getItem("locale") === "en") locale = "en";
  } catch {
    /* sin acceso a localStorage */
  }
  // El tema ya lo aplicó el script de layout.tsx antes de pintar
  const theme: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  prefs = { locale, theme };
  return prefs;
};
const setPrefs = (patch: Partial<Prefs>) => {
  prefs = { ...readPrefs(), ...patch };
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const { locale, theme } = useSyncExternalStore(subscribe, readPrefs, () => DEFAULT_PREFS);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    // Reactiva las transiciones CSS cuando el tema ya quedó aplicado (dos cuadros después)
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => document.documentElement.classList.remove("no-transitions"));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, []);

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

  // Idioma: fundido suave de toda la página mientras cambian los textos
  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "es" ? "en" : "es";
    const root = document.documentElement;
    const apply = () => {
      flushSync(() => setPrefs({ locale: next }));
      root.lang = next;
    };
    save("locale", next);

    if (!canTransition()) {
      apply();
      ScrollTrigger.refresh();
      return;
    }
    root.dataset.vt = "lang";
    const vt = document.startViewTransition(apply);
    vt.finished.finally(() => {
      delete root.dataset.vt;
      ScrollTrigger.refresh();
    });
  }, [locale]);

  // Tema: el nuevo tema se revela en un círculo que crece desde el botón
  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;
      const apply = () => {
        root.dataset.theme = next;
        flushSync(() => setPrefs({ theme: next }));
      };
      save("theme", next);

      if (!canTransition()) {
        apply();
        return;
      }
      root.dataset.vt = "theme";
      const vt = document.startViewTransition(apply);
      vt.ready.then(() => {
        const x = origin?.x ?? window.innerWidth - 80;
        const y = origin?.y ?? 40;
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
      vt.finished.finally(() => delete root.dataset.vt);
    },
    [theme],
  );

  const value = useMemo(
    () => ({
      introDone,
      finishIntro,
      setScrollLocked,
      scrollTo,
      locale,
      t: content[locale],
      toggleLocale,
      theme,
      toggleTheme,
    }),
    [introDone, finishIntro, setScrollLocked, scrollTo, locale, toggleLocale, theme, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
