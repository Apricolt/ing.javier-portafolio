"use client";

import { useEffect, useRef } from "react";

/**
 * Dos peces koi minimalistas que nadan en círculo persiguiéndose (como un yin-yang).
 * Son siluetas limpias dibujadas con canvas: el cuerpo ondula, las aletas
 * aletean y la cola fluye. El centro queda libre para poner texto encima.
 */

type Pt = { x: number; y: number };
/** Mancha: posición a lo largo del cuerpo (s), lado (-1..1), tamaño y semilla de forma */
type Patch = { s: number; side: number; rx: number; ry: number; seed: number };
type Look = {
  base: string;
  light: string;
  patch: string;
  patches: Patch[];
  fin: string; // "r,g,b"
  glow: string;
};

const LOOKS: Look[] = [
  // Koi azul eléctrico con manchas perla
  {
    base: "#2f6bff",
    light: "#9db8ff",
    patch: "#eef3ff",
    patches: [
      { s: 0.14, side: 0.15, rx: 0.08, ry: 1.1, seed: 1 },
      { s: 0.4, side: 0.4, rx: 0.12, ry: 1.0, seed: 3 },
      { s: 0.68, side: -0.45, rx: 0.09, ry: 0.95, seed: 5 },
    ],
    fin: "122,162,255",
    glow: "rgba(47,107,255,0.55)",
  },
  // Koi perla con una mancha azul redonda en la cabeza
  {
    base: "#e9eeff",
    light: "#ffffff",
    patch: "#2f6bff",
    patches: [{ s: 0.13, side: 0, rx: 0.062, ry: 0.6, seed: 7 }],
    fin: "214,226,255",
    glow: "rgba(150,185,255,0.45)",
  },
];

const BODY = 30; // segmentos del cuerpo
const TAIL = 14; // segmentos de la cola
const TAIL_LEN = 0.44; // largo de la cola respecto al cuerpo
const ORBIT = (Math.PI * 2) / 32; // una vuelta cada 32 s

/** Ancho del cuerpo (0 = hocico, 1 = base de la cola): cabeza redonda, hombros anchos y cola fina */
function bodyWidth(s: number) {
  const f =
    s < 0.36 ? 0.7 + 0.3 * Math.sin((s / 0.36) * (Math.PI / 2)) : 1 - 0.88 * Math.pow((s - 0.36) / 0.64, 1.25);
  return f * Math.sqrt(Math.min(1, s / 0.08));
}

/** Calcula la columna del pez: puntos, tangentes (hacia la cabeza) y normales */
function spine(i: number, t: number, S: number, L: number) {
  const c = S / 2;
  const R = S * (0.335 + 0.012 * Math.sin(0.27 * t + i * 1.7));
  const head = ORBIT * t + i * Math.PI + 0.05 * Math.sin(0.35 * t + i * 2);
  const p: Pt[] = [];
  for (let k = 0; k <= BODY + TAIL; k++) {
    const s = k <= BODY ? k / BODY : 1 + ((k - BODY) / TAIL) * TAIL_LEN;
    const th = head - (s * L) / R;
    // Onda que viaja de la cabeza a la cola, más amplia hacia atrás
    const u = L * (0.012 + 0.065 * s * s) * Math.sin(s * 5.4 - t * 5.6 + i * 1.3);
    p.push({ x: c + (R + u) * Math.cos(th), y: c + (R + u) * Math.sin(th) });
  }
  const tg: Pt[] = [];
  const n: Pt[] = [];
  for (let k = 0; k < p.length; k++) {
    const a = p[Math.max(0, k - 1)];
    const b = p[Math.min(p.length - 1, k + 1)];
    const len = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    const tx = (a.x - b.x) / len;
    const ty = (a.y - b.y) / len;
    tg.push({ x: tx, y: ty });
    n.push({ x: -ty, y: tx });
  }
  return { p, tg, n };
}

/** Traza una curva suave que pasa por los puntos */
function trace(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let k = 1; k < pts.length - 1; k++) {
    ctx.quadraticCurveTo(pts[k].x, pts[k].y, (pts[k].x + pts[k + 1].x) / 2, (pts[k].y + pts[k + 1].y) / 2);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

const add = (a: Pt, v: Pt, m: number): Pt => ({ x: a.x + v.x * m, y: a.y + v.y * m });

/** Forma orgánica (no una elipse perfecta) para las manchas */
function blob(ctx: CanvasRenderingContext2D, c: Pt, rx: number, ry: number, ang: number, seed: number) {
  const steps = 28;
  const cos = Math.cos(ang);
  const sin = Math.sin(ang);
  ctx.beginPath();
  for (let k = 0; k <= steps; k++) {
    const a = (k / steps) * Math.PI * 2;
    const r = 1 + 0.14 * Math.sin(3 * a + seed * 1.7) + 0.08 * Math.sin(5 * a + seed * 2.9);
    const x = Math.cos(a) * rx * r;
    const y = Math.sin(a) * ry * r;
    const px = c.x + x * cos - y * sin;
    const py = c.y + x * sin + y * cos;
    if (k === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

/** Aleta lisa en forma de abanico (sin radios ni contorno) */
function fin(ctx: CanvasRenderingContext2D, base: Pt, dir: Pt, len: number, spread: number, rgb: string, alpha: number) {
  const a = Math.atan2(dir.y, dir.x);
  const at = (ang: number, d: number): Pt => ({ x: base.x + Math.cos(ang) * d, y: base.y + Math.sin(ang) * d });
  const p1 = at(a - spread, len);
  const p2 = at(a + spread, len);
  const tip = at(a, len * 1.3);
  const c1 = at(a - spread * 1.15, len * 0.55);
  const c2 = at(a + spread * 1.15, len * 0.55);
  const grad = ctx.createLinearGradient(base.x, base.y, tip.x, tip.y);
  grad.addColorStop(0, `rgba(${rgb},${alpha})`);
  grad.addColorStop(1, `rgba(${rgb},${alpha * 0.15})`);
  ctx.beginPath();
  ctx.moveTo(base.x, base.y);
  ctx.quadraticCurveTo(c1.x, c1.y, p1.x, p1.y);
  ctx.quadraticCurveTo(tip.x, tip.y, p2.x, p2.y);
  ctx.quadraticCurveTo(c2.x, c2.y, base.x, base.y);
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawKoi(ctx: CanvasRenderingContext2D, i: number, t: number, S: number) {
  const look = LOOKS[i];
  const L = S * 0.4; // largo del cuerpo
  const W = L * 0.135; // medio ancho máximo
  const { p, tg, n } = spine(i, t, S, L);
  const w = (k: number) => bodyWidth(Math.min(1, k / BODY)) * W;
  const back = (k: number): Pt => ({ x: -tg[k].x, y: -tg[k].y });

  // --- Cola (debajo del cuerpo) ---
  const tl: Pt[] = [];
  const tr: Pt[] = [];
  for (let k = BODY; k <= BODY + TAIL; k++) {
    const q = (k - BODY) / TAIL;
    const wt = W * (0.13 + 1.35 * Math.pow(q, 1.05));
    tl.push(add(p[k], n[k], wt));
    tr.push(add(p[k], n[k], -wt));
  }
  const endK = BODY + TAIL;
  const notch = add(p[endK], tg[endK], L * TAIL_LEN * 0.34);
  const tailGrad = ctx.createLinearGradient(p[BODY].x, p[BODY].y, p[endK].x, p[endK].y);
  tailGrad.addColorStop(0, `rgba(${look.fin},0.7)`);
  tailGrad.addColorStop(1, `rgba(${look.fin},0.08)`);
  ctx.beginPath();
  trace(ctx, [...tl, notch, ...[...tr].reverse()]);
  ctx.closePath();
  ctx.fillStyle = tailGrad;
  ctx.fill();

  // --- Aletas pectorales y pélvicas (debajo del cuerpo) ---
  const flap = (ph: number) => 0.22 * Math.sin(t * 3.1 + ph + i);
  for (const side of [1, -1]) {
    const kp = Math.round(0.21 * BODY);
    const ap = 0.9 + flap(side > 0 ? 0 : Math.PI * 0.6);
    const dp = add({ x: back(kp).x * Math.cos(ap), y: back(kp).y * Math.cos(ap) }, n[kp], side * Math.sin(ap));
    fin(ctx, add(p[kp], n[kp], side * w(kp) * 0.8), dp, L * 0.25, 0.5, look.fin, 0.45);

    const kv = Math.round(0.55 * BODY);
    const av = 0.7 + flap(side > 0 ? 1.2 : 2) * 0.6;
    const dv = add({ x: back(kv).x * Math.cos(av), y: back(kv).y * Math.cos(av) }, n[kv], side * Math.sin(av));
    fin(ctx, add(p[kv], n[kv], side * w(kv) * 0.75), dv, L * 0.13, 0.4, look.fin, 0.4);
  }

  // --- Cuerpo: silueta lisa con un brillo suave ---
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let k = 0; k <= BODY; k++) {
    left.push(add(p[k], n[k], w(k)));
    right.push(add(p[k], n[k], -w(k)));
  }
  const outline = [...left, ...right.reverse()];
  const bodyPath = () => {
    ctx.beginPath();
    trace(ctx, outline);
    ctx.closePath();
  };

  ctx.save();
  ctx.shadowColor = look.glow;
  ctx.shadowBlur = W * 1.1;
  bodyPath();
  ctx.fillStyle = look.base;
  ctx.fill();
  ctx.restore();

  ctx.save();
  bodyPath();
  ctx.clip();
  ctx.fillStyle = look.patch;
  for (const pa of look.patches) {
    const k = Math.round(pa.s * BODY);
    const ww = w(k);
    blob(ctx, add(p[k], n[k], pa.side * ww), pa.rx * L, pa.ry * ww, Math.atan2(tg[k].y, tg[k].x), pa.seed);
  }
  // Un único brillo sobre el lomo para dar algo de volumen
  ctx.beginPath();
  trace(ctx, p.slice(3, BODY - 6));
  ctx.lineCap = "round";
  ctx.lineWidth = W * 0.45;
  ctx.strokeStyle = look.light;
  ctx.globalAlpha = 0.12;
  ctx.stroke();
  ctx.restore();
}

function drawPond(ctx: CanvasRenderingContext2D, t: number, S: number) {
  ctx.clearRect(0, 0, S, S);
  drawKoi(ctx, 0, t, S);
  drawKoi(ctx, 1, t, S);
}

export default function KoiPond({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Resolución fija según la pantalla (no según el contenedor, que cambia al hacer scroll)
    let S = 0;
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      S = Math.round(Math.min(1400, Math.min(window.innerWidth, window.innerHeight) * dpr));
      canvas.width = S;
      canvas.height = S;
    };
    size();

    const start = performance.now() - 9000;
    const render = (now: number) => drawPond(ctx, (now - start) / 1000, S);
    let raf = 0;
    let visible = true;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (visible) render(now);
    };

    const onResize = () => {
      size();
      render(performance.now());
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    render(performance.now());
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
