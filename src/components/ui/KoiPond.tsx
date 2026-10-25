"use client";

import { useEffect, useRef } from "react";

/**
 * Dos peces koi que nadan en círculo persiguiéndose (como un yin-yang).
 * Todo se dibuja con canvas en cada cuadro: el cuerpo ondula, las aletas
 * aletean y la cola fluye. El centro queda libre para poner texto encima.
 */

type Pt = { x: number; y: number };
/** Mancha: posición a lo largo del cuerpo (s), lado (-1..1), tamaño y semilla de forma */
type Patch = { s: number; side: number; rx: number; ry: number; seed: number };
type Look = {
  dark: string;
  base: string;
  light: string;
  patch: string;
  patches: Patch[];
  fin: string; // "r,g,b"
  glow: string;
  scale: string;
};

const LOOKS: Look[] = [
  // Koi azul eléctrico con manchas perla
  {
    dark: "#081a5c",
    base: "#2f6bff",
    light: "#b7ccff",
    patch: "#eef3ff",
    patches: [
      { s: 0.13, side: 0.15, rx: 0.08, ry: 1.1, seed: 1 },
      { s: 0.19, side: -0.55, rx: 0.05, ry: 0.6, seed: 2 },
      { s: 0.38, side: 0.4, rx: 0.12, ry: 1.0, seed: 3 },
      { s: 0.45, side: -0.25, rx: 0.06, ry: 0.65, seed: 4 },
      { s: 0.66, side: -0.45, rx: 0.09, ry: 0.95, seed: 5 },
      { s: 0.74, side: 0.3, rx: 0.045, ry: 0.55, seed: 6 },
    ],
    fin: "122,162,255",
    glow: "rgba(47,107,255,0.85)",
    scale: "rgba(255,255,255,0.18)",
  },
  // Koi perla con una mancha azul redonda en la cabeza
  {
    dark: "#7f95cf",
    base: "#e9eeff",
    light: "#ffffff",
    patch: "#2f6bff",
    // Estilo "tancho": una sola mancha redonda en la cabeza, más un toque en el lomo
    patches: [
      { s: 0.13, side: 0, rx: 0.062, ry: 0.6, seed: 7 },
      { s: 0.5, side: 0.55, rx: 0.07, ry: 0.55, seed: 8 },
    ],
    fin: "214,226,255",
    glow: "rgba(150,185,255,0.7)",
    scale: "rgba(30,60,150,0.16)",
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

/** Aleta en forma de abanico con radios */
function fin(ctx: CanvasRenderingContext2D, base: Pt, dir: Pt, len: number, spread: number, rgb: string, alpha: number, lw: number) {
  const a = Math.atan2(dir.y, dir.x);
  const at = (ang: number, d: number): Pt => ({ x: base.x + Math.cos(ang) * d, y: base.y + Math.sin(ang) * d });
  const p1 = at(a - spread, len);
  const p2 = at(a + spread, len);
  const tip = at(a, len * 1.3);
  const grad = ctx.createLinearGradient(base.x, base.y, tip.x, tip.y);
  grad.addColorStop(0, `rgba(${rgb},${alpha})`);
  grad.addColorStop(1, `rgba(${rgb},${alpha * 0.22})`);

  ctx.beginPath();
  ctx.moveTo(base.x, base.y);
  const c1 = at(a - spread * 1.15, len * 0.55);
  const c2 = at(a + spread * 1.15, len * 0.55);
  ctx.quadraticCurveTo(c1.x, c1.y, p1.x, p1.y);
  ctx.quadraticCurveTo(tip.x, tip.y, p2.x, p2.y);
  ctx.quadraticCurveTo(c2.x, c2.y, base.x, base.y);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.lineWidth = lw;
  ctx.strokeStyle = `rgba(${rgb},${alpha * 0.9})`;
  ctx.stroke();

  ctx.strokeStyle = `rgba(${rgb},${alpha * 0.5})`;
  for (let r = -2; r <= 2; r++) {
    const e = at(a + (r / 2.4) * spread, len * (1.05 - Math.abs(r) * 0.06));
    ctx.beginPath();
    ctx.moveTo(base.x, base.y);
    ctx.lineTo(e.x, e.y);
    ctx.stroke();
  }
}

function drawKoi(ctx: CanvasRenderingContext2D, i: number, t: number, S: number) {
  const look = LOOKS[i];
  const L = S * 0.4; // largo del cuerpo
  const W = L * 0.135; // medio ancho máximo
  const lw = Math.max(1, S * 0.0013);
  const { p, tg, n } = spine(i, t, S, L);
  const w = (k: number) => bodyWidth(Math.min(1, k / BODY)) * W;
  const back = (k: number): Pt => ({ x: -tg[k].x, y: -tg[k].y });

  // --- Cola (debajo del cuerpo) ---
  const tl: Pt[] = [];
  const tr: Pt[] = [];
  const tw: number[] = [];
  for (let k = BODY; k <= BODY + TAIL; k++) {
    const q = (k - BODY) / TAIL;
    const wt = W * (0.13 + 1.35 * Math.pow(q, 1.05));
    tw.push(wt);
    tl.push(add(p[k], n[k], wt));
    tr.push(add(p[k], n[k], -wt));
  }
  const endK = BODY + TAIL;
  const notch = add(p[endK], tg[endK], L * TAIL_LEN * 0.34);
  const tailShape = [...tl, notch, ...[...tr].reverse()];
  const tailGrad = ctx.createLinearGradient(p[BODY].x, p[BODY].y, p[endK].x, p[endK].y);
  tailGrad.addColorStop(0, `rgba(${look.fin},0.75)`);
  tailGrad.addColorStop(1, `rgba(${look.fin},0.14)`);
  ctx.save();
  ctx.beginPath();
  trace(ctx, tailShape);
  ctx.closePath();
  ctx.fillStyle = tailGrad;
  ctx.fill();
  ctx.lineWidth = lw;
  ctx.strokeStyle = `rgba(${look.fin},0.45)`;
  ctx.stroke();
  // Radios de la cola: siguen la ondulación
  ctx.clip();
  ctx.strokeStyle = `rgba(${look.fin},0.32)`;
  for (let f = -1; f <= 1.001; f += 0.25) {
    const ray: Pt[] = [];
    for (let k = BODY; k <= endK; k++) ray.push(add(p[k], n[k], tw[k - BODY] * f * 0.96));
    ctx.beginPath();
    trace(ctx, ray);
    ctx.stroke();
  }
  ctx.restore();

  // --- Aletas pectorales y pélvicas (debajo del cuerpo) ---
  const flap = (ph: number) => 0.22 * Math.sin(t * 3.1 + ph + i);
  for (const side of [1, -1]) {
    const kp = Math.round(0.21 * BODY);
    const ap = 0.9 + flap(side > 0 ? 0 : Math.PI * 0.6);
    const dp = add({ x: back(kp).x * Math.cos(ap), y: back(kp).y * Math.cos(ap) }, n[kp], side * Math.sin(ap));
    fin(ctx, add(p[kp], n[kp], side * w(kp) * 0.8), dp, L * 0.25, 0.5, look.fin, 0.5, lw);

    const kv = Math.round(0.55 * BODY);
    const av = 0.7 + flap(side > 0 ? 1.2 : 2) * 0.6;
    const dv = add({ x: back(kv).x * Math.cos(av), y: back(kv).y * Math.cos(av) }, n[kv], side * Math.sin(av));
    fin(ctx, add(p[kv], n[kv], side * w(kv) * 0.75), dv, L * 0.13, 0.4, look.fin, 0.45, lw);
  }

  // --- Cuerpo ---
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
  ctx.shadowBlur = W * 1.5;
  bodyPath();
  ctx.fillStyle = look.base;
  ctx.fill();
  ctx.restore();

  ctx.save();
  bodyPath();
  ctx.clip();

  // Manchas irregulares (el recorte del cuerpo hace que "envuelvan" el lomo)
  ctx.fillStyle = look.patch;
  for (const pa of look.patches) {
    const k = Math.round(pa.s * BODY);
    const ww = w(k);
    const c = add(p[k], n[k], pa.side * ww);
    const ang = Math.atan2(tg[k].y, tg[k].x);
    blob(ctx, c, pa.rx * L, pa.ry * ww, ang, pa.seed);
  }

  // Volumen: bordes más oscuros y un brillo suave sobre el lomo
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = W * 0.7;
  ctx.strokeStyle = look.dark;
  bodyPath();
  ctx.stroke();
  ctx.globalAlpha = 1;
  const ridge = p.slice(3, BODY - 5);
  for (const [wd, al] of [
    [0.6, 0.12],
    [0.34, 0.16],
    [0.14, 0.22],
  ] as const) {
    ctx.beginPath();
    trace(ctx, ridge);
    ctx.lineWidth = W * wd;
    ctx.lineCap = "round";
    ctx.strokeStyle = look.light;
    ctx.globalAlpha = al;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Escamas: arcos que miran hacia la cola
  ctx.lineWidth = lw;
  ctx.strokeStyle = look.scale;
  for (let k = 4; k < BODY - 2; k++) {
    const ww = w(k);
    const r = ww * 0.26;
    const ang = Math.atan2(tg[k].y, tg[k].x);
    for (let j = -2; j <= 2; j++) {
      const off = (j * 0.42 + (k % 2 ? 0.21 : 0)) * ww;
      if (Math.abs(off) > ww * 0.92) continue;
      const c = add(p[k], n[k], off);
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, ang + Math.PI * 0.5, ang + Math.PI * 1.5);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Contorno fino
  bodyPath();
  ctx.lineWidth = lw;
  ctx.strokeStyle = `rgba(${look.fin},0.5)`;
  ctx.stroke();

  // Aleta dorsal: una cresta translúcida sobre el lomo
  const dorsal = p.slice(Math.round(0.3 * BODY), Math.round(0.62 * BODY));
  ctx.lineCap = "round";
  ctx.beginPath();
  trace(ctx, dorsal);
  ctx.lineWidth = W * 0.22;
  ctx.strokeStyle = `rgba(${look.fin},0.35)`;
  ctx.stroke();
  ctx.beginPath();
  trace(ctx, dorsal);
  ctx.lineWidth = W * 0.05;
  ctx.strokeStyle = `rgba(255,255,255,0.55)`;
  ctx.stroke();

  // Ojos y barbillas
  const ke = 2;
  for (const side of [1, -1]) {
    const e = add(p[ke], n[ke], side * w(ke) * 0.62);
    ctx.beginPath();
    ctx.arc(e.x, e.y, W * 0.085, 0, Math.PI * 2);
    ctx.fillStyle = "#040818";
    ctx.fill();
    const h = add(e, tg[ke], W * 0.03);
    ctx.beginPath();
    ctx.arc(h.x, h.y, W * 0.03, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();

    const b0 = add(p[1], n[1], side * w(1) * 0.55);
    const b1 = add(add(b0, tg[1], W * 0.45), n[1], side * W * 0.35);
    const bc = add(b0, tg[1], W * 0.35);
    ctx.beginPath();
    ctx.moveTo(b0.x, b0.y);
    ctx.quadraticCurveTo(bc.x, bc.y, b1.x, b1.y);
    ctx.lineWidth = W * 0.045;
    ctx.strokeStyle = `rgba(${look.fin},0.7)`;
    ctx.stroke();
  }
}

/** Ondas suaves en el agua que salen del centro */
function ripples(ctx: CanvasRenderingContext2D, t: number, S: number) {
  ctx.lineWidth = Math.max(1, S * 0.0015);
  for (let r = 0; r < 3; r++) {
    const ph = (t * 0.05 + r / 3) % 1;
    const alpha = 0.16 * Math.sin(ph * Math.PI);
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S * (0.1 + ph * 0.38), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(122,162,255,${alpha.toFixed(3)})`;
    ctx.stroke();
  }
}

function drawPond(ctx: CanvasRenderingContext2D, t: number, S: number) {
  ctx.clearRect(0, 0, S, S);
  ripples(ctx, t, S);
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
