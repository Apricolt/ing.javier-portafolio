/**
 * Ouroboros decorativo: una serpiente que forma un círculo y se muerde la cola.
 * Ilustración original en SVG (estilo grabado) con la paleta azul eléctrico.
 * Toda la geometría se calcula una sola vez al cargar el módulo, sin azar,
 * así el servidor y el cliente generan exactamente el mismo marcado.
 */

type Pt = [number, number];

const CX = 250;
const CY = 250;
const R = 180; // radio de la línea central del cuerpo
const TAU = Math.PI * 2;

const n2 = (n: number) => n.toFixed(2);
const polar = (ang: number, r: number): Pt => [CX + r * Math.cos(ang), CY + r * Math.sin(ang)];
const toPath = (pts: Pt[], close = false) =>
  pts.map((p, i) => `${i ? "L" : "M"}${n2(p[0])} ${n2(p[1])}`).join("") + (close ? "Z" : "");
const smoothstep = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

/* ---------- Posición de la cabeza ---------- */

// Coordenadas locales de la cabeza: u avanza hacia el hocico, v sale hacia afuera del anillo.
const HS = 1.4; // escala de la cabeza
const HEAD_MID = 34; // centro de la cabeza (queda arriba)
const A0 = -Math.PI / 2 - (HEAD_MID * HS) / R;
const local = (u: number, v: number): Pt => polar(A0 + (u * HS) / R, R + v * HS);

/* ---------- Cuerpo ---------- */

const U_START = 6 * HS; // el cuello empieza escondido bajo la cabeza
const U_TIP = 10 * HS; // la punta de la cola termina dentro de la boca
const SPAN = TAU - (U_TIP - U_START) / R; // recorrido angular del cuerpo
const LEN = SPAN * R;
const angleAt = (s: number) => A0 + U_START / R - s * SPAN; // s: 0 = cuello, 1 = punta de la cola
const sAtU = (u: number) => (U_START - u) / LEN; // s del cuello para una u local (u <= U_START)

const W_MAX = 22; // medio ancho máximo
const W_TAIL = 6; // medio ancho de la cola al entrar a la boca
const S_MOUTH = (U_START + TAU * R - 64 * HS) / LEN; // donde la cola entra a la boca
const TAIL_DROP = -2.1; // la cola baja un poco para quedar centrada entre las mandíbulas

// Medio ancho del cuerpo: grueso tras la cabeza, fino en la cola
function halfW(s: number) {
  if (s <= S_MOUTH) {
    const x = s / S_MOUTH;
    const neck = 1 - 0.16 * Math.exp(-((s / 0.035) ** 2)); // cuello algo más fino que la cabeza
    return (W_TAIL + (W_MAX - W_TAIL) * Math.pow(1 - x, 1.1) * (1 + 0.6 * x)) * neck;
  }
  // dentro de la boca: se afila hasta la punta (queda oculta)
  const x = (s - S_MOUTH) / (1 - S_MOUTH);
  return x < 0.7 ? W_TAIL : W_TAIL * Math.sqrt(Math.max(0, 1 - ((x - 0.7) / 0.3) ** 2));
}
const spine = (s: number) => R + TAIL_DROP * smoothstep(S_MOUTH - 0.05, S_MOUTH, s);

// Punto del cuerpo: t = -1 borde interior (vientre), t = 1 borde exterior (lomo)
const bodyPt = (s: number, t: number) => polar(angleAt(s), spine(s) + t * halfW(s));
const bodyLine = (t: number, sEnd = 1, n = 180) =>
  Array.from({ length: n + 1 }, (_, i) => bodyPt((i / n) * sEnd, t));

const BODY_D = toPath([...bodyLine(1), ...bodyLine(-1).reverse()], true);

const T_BELLY = -0.45; // línea del vientre
const BELLY_LINE_D = toPath(bodyLine(T_BELLY, 0.985));
const SHEEN_D = toPath(bodyLine(0.6, 0.95)); // brillo a lo largo del lomo

// Escamas: un "contador" que avanza más rápido donde el cuerpo es fino
const GRID = 1600;
const SCALE_K = 0.4; // largo de cada escama respecto al ancho
const PHI: number[] = [0];
for (let i = 1; i <= GRID; i++) {
  const w0 = Math.max(2 * halfW((i - 1) / GRID), 13);
  const w1 = Math.max(2 * halfW(i / GRID), 13);
  PHI.push(PHI[i - 1] + (LEN / GRID) * 0.5 * (1 / (SCALE_K * w0) + 1 / (SCALE_K * w1)));
}
function sAtPhi(p: number) {
  let lo = 0;
  let hi = GRID;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (PHI[mid] < p) lo = mid;
    else hi = mid;
  }
  return (lo + (p - PHI[lo]) / (PHI[hi] - PHI[lo])) / GRID;
}
const PHI_END = PHI[Math.round(0.985 * GRID)];

// Traza una línea del patrón: para cada t del ancho calcula en qué s cae
function patternLine(offset: (t: number) => number, base: number, ts: number[]) {
  const pts: Pt[] = [];
  for (const t of ts) {
    const p = base + offset(t);
    if (p >= 0.6 && p <= PHI_END) pts.push(bodyPt(sAtPhi(p), t));
  }
  return pts.length > 1 ? toPath(pts) : "";
}

// Escamas del flanco: chevrones curvos que apuntan hacia la cola
const T_RIDGE = 0.3; // vértice del chevrón
const CHEVRON_T = [T_BELLY + 0.04, -0.2, 0.05, T_RIDGE, 0.5, 0.72, 0.94];
const chevron = (t: number) => -0.62 * Math.pow(Math.abs(t - T_RIDGE), 1.35);
let scales = "";
for (let n = 0; n <= Math.ceil(PHI_END) + 1; n++) {
  scales += patternLine(chevron, n, CHEVRON_T);
}
const SCALES_D = scales;

// Bandas en chevrón más claras (una cada dos filas de escamas)
let bands = "";
for (let n = 2; n <= PHI_END - 1; n += 2) {
  const row = (base: number) => CHEVRON_T.map((t) => bodyPt(sAtPhi(base + chevron(t)), t));
  bands += toPath([...row(n), ...row(n + 0.45).reverse()], true);
}
const BANDS_D = bands;

// Placas del vientre: continúan el extremo de cada chevrón
const ARM_END = chevron(CHEVRON_T[0]);
let scutes = "";
for (let m = 1; m <= Math.ceil(PHI_END) + 1; m++) {
  scutes += patternLine((t) => ARM_END - 0.12 * (T_BELLY - t), m, [-0.93, T_BELLY]);
}
const SCUTES_D = scutes;

/* ---------- Cabeza ---------- */

// Curva suave (Catmull-Rom) que pasa por los puntos dados
function smooth(pts: Pt[], steps = 6): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < steps; k++) {
      const t = k / steps;
      const t2 = t * t;
      const t3 = t2 * t;
      const c = (j: 0 | 1) =>
        0.5 *
        (2 * p1[j] +
          (p2[j] - p0[j]) * t +
          (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 +
          (3 * p1[j] - p0[j] - 3 * p2[j] + p3[j]) * t3);
      out.push([c(0), c(1)]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const mapLocal = (pts: Pt[]) => pts.map(([u, v]) => local(u, v));
const curve = (pts: Pt[], close = false) => toPath(mapLocal(smooth(pts)), close);

// Altura v de una curva suavizada en una u dada
function vAt(pts: Pt[], u: number) {
  const c = smooth(pts);
  for (let i = 0; i < c.length - 1; i++) {
    const [u0, v0] = c[i];
    const [u1, v1] = c[i + 1];
    if (u0 !== u1 && (u - u0) * (u - u1) <= 0) return v0 + ((u - u0) / (u1 - u0)) * (v1 - v0);
  }
  return c[c.length - 1][1];
}

// Medio ancho del cuello en coordenadas locales de la cabeza
const neckHW = (u: number) => halfW(sAtU(u * HS)) / HS;

// Cráneo y mandíbula superior (sale suave del cuello)
const HEAD_TOP: Pt[] = [
  [-14, neckHW(-14)],
  [-6, neckHW(-6) + 0.5],
  [3, 15.6],
  [14, 19.2],
  [28, 20.8],
  [42, 19.9],
  [53, 16.6],
  [61, 12.6],
  [66.4, 9.3],
  [68.8, 7],
];
const UPPER_LIP: Pt[] = [
  [68.8, 7],
  [66.6, 6.2],
  [58, 6.4],
  [47, 5.8],
  [36, 4.3],
  [26, 2.2],
  [18, 0],
];
const CHEEK: Pt[] = [
  [18, 0],
  [12, -3.6],
  [4, -8.2],
  [-8, -neckHW(-8)],
];
// Borde trasero de la cabeza (nuca)
const NAPE: Pt[] = [
  [-8, -neckHW(-8)],
  [-11.5, -3],
  [-13.4, 5],
  [-14, neckHW(-14)],
];
const HEAD_LINE = [...smooth(HEAD_TOP), ...smooth(UPPER_LIP).slice(1)];
const HEAD_FILL_D = toPath(mapLocal([...HEAD_LINE, ...smooth(CHEEK).slice(1), ...smooth(NAPE).slice(1)]), true);
const HEAD_EDGE_D = toPath(mapLocal(HEAD_LINE));

// Mandíbula inferior (fina, con barbilla redondeada)
const JAW_BOTTOM: Pt[] = [
  [-8, -neckHW(-8)],
  [4, -14.6],
  [18, -16.6],
  [32, -17],
  [45, -15.8],
  [54, -13.8],
  [59.8, -11.6],
  [61.6, -10.2],
];
const LOWER_LIP: Pt[] = [
  [61.6, -10.2],
  [59, -10],
  [51, -9.5],
  [41, -7.5],
  [31, -4.8],
  [24, -2.4],
  [18, 0],
];
const JAW_LINE = [...smooth(JAW_BOTTOM), ...smooth(LOWER_LIP).slice(1)];
const JAW_FILL_D = toPath(mapLocal([...JAW_LINE, ...smooth(CHEEK).reverse().slice(1)]), true);
const JAW_EDGE_D = toPath(mapLocal(JAW_LINE));

// Interior de la boca (oscuro), entre los labios
const MOUTH_D = toPath(
  mapLocal([
    ...smooth(UPPER_LIP.slice(2)).reverse(),
    ...smooth([
      [58, 6.4],
      [55.5, -2],
      [57.5, -9.9],
    ]).slice(1),
    ...smooth(LOWER_LIP.slice(1)).slice(1),
  ]),
  true,
);

// Colmillos y dientes (triángulos curvos)
const tooth = (u: number, v: number, len: number, w: number, dir: 1 | -1) =>
  toPath(
    mapLocal([
      [u - w, v],
      [u + w, v],
      [u + w * 0.15, v + dir * len * 0.6],
      [u - w * 0.35, v + dir * len],
      [u - w * 0.6, v + dir * len * 0.45],
    ]),
    true,
  );
const UPPER_TEETH_D = tooth(56, 6.5, 5.4, 1.9, -1) + tooth(47.5, 6, 2.2, 0.9, -1) + tooth(40, 5, 1.8, 0.8, -1);
const LOWER_TEETH_D = tooth(50, -9.6, 4.8, 1.6, 1) + tooth(42, -7.6, 1.8, 0.8, 1) + tooth(35, -5.8, 1.5, 0.7, 1);

// Líneas de las escamas de los labios, con pequeñas divisiones
const UPPER_LABIAL: Pt[] = [
  [28, 5.4],
  [38, 7.4],
  [48, 8.4],
  [58, 8.7],
  [65, 8.3],
];
const LOWER_LABIAL: Pt[] = [
  [28, -7.4],
  [40, -10.2],
  [50, -11.9],
  [57, -11.6],
];
const labialTicks = (lip: Pt[], labial: Pt[], us: number[], gap: number) =>
  us
    .map((u) =>
      toPath([
        local(u, vAt(lip, u) + gap),
        local(u - 0.8, vAt(labial, u - 0.8)),
      ]),
    )
    .join("");

// Detalles grabados de la cabeza
const HEAD_DETAIL_D =
  curve([
    [31, 16.4],
    [37, 18.2],
    [45, 18.2],
    [51.5, 15.8],
  ]) + // ceja
  curve([
    [33.2, 9.4],
    [27, 6.8],
    [21, 3.2],
  ]) + // línea tras el ojo
  curve([
    [8, 18.6],
    [12, 12.4],
    [20, 9.8],
    [28.5, 10.4],
  ]) + // placa de la sien
  curve(UPPER_LABIAL) + // escamas del labio
  curve([
    [53, 15.4],
    [57, 12.2],
    [63, 9.4],
  ]) + // hocico
  curve(NAPE) + // nuca
  curve(CHEEK.slice(0, 3)) + // pliegue de la comisura
  labialTicks(UPPER_LIP, UPPER_LABIAL, [31, 37, 43, 49, 61], 0.4);

const JAW_DETAIL_D = curve(LOWER_LABIAL) + labialTicks(LOWER_LIP, LOWER_LABIAL, [30, 36, 42, 54], -0.4);

// Ojo almendrado con pupila vertical
const EYE_U = 40;
const EYE_V = 11.6;
const eyeShape = (hl: number, hh: number, n = 24): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * TAU;
    const y = Math.sin(a);
    return [EYE_U + hl * Math.cos(a), EYE_V + hh * Math.sign(y) * Math.pow(Math.abs(y), 0.8)];
  });
const EYE_D = toPath(mapLocal(eyeShape(6.2, 4.3)), true);
const PUPIL_D = toPath(mapLocal(eyeShape(1.05, 3.6)), true);
const [EYE_X, EYE_Y] = local(EYE_U, EYE_V);
const [SHINE_X, SHINE_Y] = local(EYE_U + 1.6, EYE_V + 1.8);
const [NOSE_X, NOSE_Y] = local(62.6, 10);

/* ---------- Marco ---------- */

const R_OUT = 226;
const R_IN = 140;
let majorTicks = "";
let minorTicks = "";
for (let k = 0; k < 60; k++) {
  const a = (k / 60) * TAU - Math.PI / 2;
  if (k % 5 === 0) {
    const long = k % 15 === 0;
    majorTicks += toPath([polar(a, R_OUT - (long ? 9 : 6)), polar(a, R_OUT + (long ? 9 : 6))]);
    majorTicks += toPath([polar(a, R_IN), polar(a, R_IN - (long ? 7 : 4))]);
  } else {
    minorTicks += toPath([polar(a, R_OUT - 1.5), polar(a, R_OUT + 1.5)]);
  }
}
const MAJOR_TICKS_D = majorTicks;
const MINOR_TICKS_D = minorTicks;

// Estrella de 12 puntas muy tenue (tres cuadrados); el núcleo queda libre para texto
const square = (rot: number) =>
  toPath(
    [0, 1, 2, 3].map((k) => polar(rot + (k / 4) * TAU, 118)),
    true,
  );
const STAR_D = square(-Math.PI / 2) + square(-Math.PI / 2 + TAU / 12) + square(-Math.PI / 2 + TAU / 6);

const spinStyle = { transformBox: "fill-box", transformOrigin: "center" } as const;

export default function Ouroboros({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      width="100%"
      height="100%"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="ouro-body" cx="250" cy="250" r="212" gradientUnits="userSpaceOnUse">
          <stop offset="0.73" stopColor="#030820" />
          <stop offset="0.78" stopColor="#061033" />
          <stop offset="0.83" stopColor="#0D2A8A" />
          <stop offset="0.88" stopColor="#1f4fd8" />
          <stop offset="0.93" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#7AA2FF" />
        </radialGradient>
        {/* La cabeza siempre está arriba dentro del grupo que gira */}
        <linearGradient id="ouro-head" x1="250" y1="40" x2="250" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7AA2FF" />
          <stop offset="0.3" stopColor="#2F6BFF" />
          <stop offset="0.56" stopColor="#1f4fd8" />
          <stop offset="0.8" stopColor="#0D2A8A" />
          <stop offset="1" stopColor="#061033" />
        </linearGradient>
        <linearGradient id="ouro-edge" x1="90" y1="40" x2="410" y2="460" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#BED2FF" />
          <stop offset="0.5" stopColor="#7AA2FF" />
          <stop offset="1" stopColor="#2F6BFF" />
        </linearGradient>
        <radialGradient id="ouro-aura" cx="250" cy="250" r="232" gradientUnits="userSpaceOnUse">
          <stop offset="0.6" stopColor="#2F6BFF" stopOpacity="0" />
          <stop offset="0.78" stopColor="#2F6BFF" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ouro-eye">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#BED2FF" />
          <stop offset="1" stopColor="#2F6BFF" />
        </radialGradient>
        <radialGradient id="ouro-eye-halo">
          <stop offset="0" stopColor="#7AA2FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#2F6BFF" stopOpacity="0" />
        </radialGradient>
        <filter id="ouro-glow" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <path id="ouro-body-shape" d={BODY_D} />
      </defs>

      {/* Halo suave detrás del anillo */}
      <circle cx="250" cy="250" r="232" fill="url(#ouro-aura)" />

      {/* Marco: anillos finos con marcas; gira lento al revés */}
      <g className="motion-safe:animate-[spin_160s_linear_infinite_reverse]" style={spinStyle}>
        {/* Círculo invisible: centra la caja del grupo para que gire sobre (250,250) */}
        <circle cx="250" cy="250" r="246" />
        <circle cx="250" cy="250" r={R_OUT} stroke="#7AA2FF" strokeOpacity="0.4" strokeWidth="0.8" />
        <circle cx="250" cy="250" r={R_IN} stroke="#7AA2FF" strokeOpacity="0.3" strokeWidth="0.7" />
        <path d={MAJOR_TICKS_D} stroke="#BED2FF" strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" />
        <path d={MINOR_TICKS_D} stroke="#7AA2FF" strokeOpacity="0.3" strokeWidth="0.6" />
        <circle cx="250" cy="250" r="126" stroke="#7AA2FF" strokeOpacity="0.14" strokeWidth="0.6" strokeDasharray="1 5" />
        <path d={STAR_D} stroke="#7AA2FF" strokeOpacity="0.07" strokeWidth="0.7" />
      </g>

      {/* Serpiente: gira lento sin fin */}
      <g className="motion-safe:animate-[spin_80s_linear_infinite]" style={spinStyle}>
        {/* Círculo invisible para centrar el giro */}
        <circle cx="250" cy="250" r="246" />
        <path d={MOUTH_D} fill="#01030c" />

        {/* Cuerpo */}
        <use href="#ouro-body-shape" fill="url(#ouro-body)" />
        <path d={BANDS_D} fill="#7AA2FF" fillOpacity="0.1" />
        <path d={SCUTES_D} stroke="#BED2FF" strokeOpacity="0.25" strokeWidth="0.55" />
        <path d={SCALES_D} stroke="#7AA2FF" strokeOpacity="0.55" strokeWidth="0.65" strokeLinejoin="round" />
        <path d={BELLY_LINE_D} stroke="#7AA2FF" strokeOpacity="0.55" strokeWidth="0.7" />
        <path d={SHEEN_D} stroke="#BED2FF" strokeOpacity="0.16" strokeWidth="1.6" strokeLinecap="round" />
        <use href="#ouro-body-shape" stroke="url(#ouro-edge)" strokeWidth="1.35" filter="url(#ouro-glow)" />

        {/* Mandíbula inferior */}
        <path d={JAW_FILL_D} fill="url(#ouro-head)" />
        <path d={JAW_DETAIL_D} stroke="#BED2FF" strokeOpacity="0.4" strokeWidth="0.6" />
        <path d={LOWER_TEETH_D} fill="#BED2FF" />
        <path d={JAW_EDGE_D} stroke="url(#ouro-edge)" strokeWidth="1.3" filter="url(#ouro-glow)" />

        {/* Cabeza */}
        <path d={HEAD_FILL_D} fill="url(#ouro-head)" />
        <path d={HEAD_DETAIL_D} stroke="#BED2FF" strokeOpacity="0.5" strokeWidth="0.65" strokeLinecap="round" />
        <path d={UPPER_TEETH_D} fill="#BED2FF" />
        <path d={HEAD_EDGE_D} stroke="url(#ouro-edge)" strokeWidth="1.4" strokeLinejoin="round" filter="url(#ouro-glow)" />
        <circle cx={n2(NOSE_X)} cy={n2(NOSE_Y)} r="1.4" fill="#061033" />

        {/* Ojo con brillo */}
        <circle cx={n2(EYE_X)} cy={n2(EYE_Y)} r="13" fill="url(#ouro-eye-halo)" />
        <path d={EYE_D} fill="url(#ouro-eye)" stroke="#BED2FF" strokeWidth="0.8" filter="url(#ouro-glow)" />
        <path d={PUPIL_D} fill="#061033" />
        <circle cx={n2(SHINE_X)} cy={n2(SHINE_Y)} r="1.1" fill="#ffffff" />
      </g>
    </svg>
  );
}
