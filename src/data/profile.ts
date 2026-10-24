// Todo el contenido del portafolio vive aquí.
// Para actualizar textos, proyectos o experiencia, edita solo este archivo.

export const site = {
  url: "https://ing.jaos-portafolio.vercel.app",
  title: "Javier Ordoñez — Ingeniero de Software",
  description:
    "Portafolio de Javier Alejandro Ordoñez Sapuyes, Ingeniero de Software en Pasto, Colombia. Backend con GeneXus y SQL Server, automatización de pruebas e interfaces web modernas.",
};

export const profile = {
  name: "Javier Ordoñez",
  fullName: "Javier Alejandro Ordoñez Sapuyes",
  initials: "JO",
  heroWord: "JAVIER",
  role: "Ingeniero de Software",
  location: "San Juan de Pasto, Nariño, Colombia",
  email: "notapricolt@gmail.com",
  availability: "Abierto a oportunidades",
  eyebrow: "De la idea al código en producción.",
  tagline: "Construyo software que resuelve problemas reales.",
  intro:
    "Ingeniero de Software en Pasto, Colombia. Desarrollo backend con GeneXus y SQL Server, automatizo pruebas y diseño interfaces web modernas.",
  approachTitle: ["MI", "ENFOQUE"],
  approach:
    "Antes de escribir una línea de código busco entender el problema. Automatizo lo repetitivo, cuido los datos como si fueran míos y diseño pensando en quien va a usar la herramienta: así convierto procesos manuales en soluciones que la gente sí quiere usar.",
};

export type Social = { label: string; href: string; icon: "github" | "linkedin" | "mail" };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Apricolt", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/javier-ordo%C3%B1ez-4b136a2b8/",
    icon: "linkedin",
  },
  { label: "Correo", href: "mailto:notapricolt@gmail.com", icon: "mail" },
];

export const navItems = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Certificaciones", href: "#certificaciones" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export type Project = {
  title: string;
  kind: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Cafenar — Café de Colombia",
    kind: "Proyecto web",
    description:
      "Aplicación web que muestra los departamentos con mayor producción de café en Colombia e integra un chatbot para resolver preguntas sobre el café y sus regiones.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chatbot"],
    image: "/projects/cafe.png",
    imageAlt: "Página de inicio de Cafenar",
    live: "https://diseno-cafe.vercel.app/",
    repo: "https://github.com/Apricolt/Dise-o-Cafe",
  },
  {
    title: "Portafolio profesional — Ingeniero en Oracle",
    kind: "Cliente freelance",
    description:
      "Portafolio de servicios para Joseph Grijalva, ingeniero de software en Oracle. Lo desarrollé de punta a punta: planeación con el cliente, diseño, desarrollo y despliegue.",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    image: "/projects/oracle.png",
    imageAlt: "Página de inicio del portafolio de Joseph Grijalva",
    live: "https://portfolio-jhosgri.vercel.app/",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  highlight: string;
  highlightLabel: string;
  description: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    title: "GeneXus 18 Junior Analyst",
    issuer: "GeneXus Training",
    date: "Oct 2026",
    highlight: "100%",
    highlightLabel: "de puntaje",
    description:
      "Certificación oficial de GeneXus 18 aprobada con el puntaje máximo. Respalda mi trabajo diario sobre el core bancario Bantotal.",
  },
  {
    title: "Scrum Foundation Professional",
    issuer: "Certione",
    date: "2025",
    highlight: "SFP",
    highlightLabel: "Scrum",
    description:
      "Fundamentos de Scrum: roles, eventos y artefactos para gestionar proyectos de software de forma ágil e iterativa.",
    url: "https://certione.org/certificate-verification/36E115E-36E1094-3125F23/",
  },
  {
    title: "Inteligencia Artificial — Nivel Básico",
    issuer: "MinTIC · Talento Tech",
    date: "Feb 2026",
    highlight: "159 h",
    highlightLabel: "de bootcamp",
    description:
      "Bootcamp del Ministerio TIC con la Universidad Tecnológica de Pereira y FaceIT sobre fundamentos y aplicaciones de la IA.",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM",
    date: "May 2023",
    highlight: "IBM",
    highlightLabel: "Skills Network",
    description:
      "Scripts en Python y análisis de datos práctico con Pandas en el entorno de laboratorio Jupyter de IBM.",
    url: "https://www.credly.com/badges/5df6ecdd-e39d-408c-8af6-861e50df9db0/public_url",
  },
];

export type Tech = { name: string; icon?: string };

export const stackRows: Tech[][] = [
  [
    { name: "GeneXus 18" },
    { name: "SQL Server", icon: "sql.svg" },
    { name: "Bantotal" },
    { name: "Python", icon: "python.svg" },
    { name: "Android / ADB" },
    { name: "Java", icon: "java.svg" },
    { name: "Spring", icon: "spring.svg" },
    { name: "Django", icon: "django.svg" },
    { name: "PostgreSQL", icon: "postgresql.svg" },
  ],
  [
    { name: "Next.js", icon: "nextjs.svg" },
    { name: "React" },
    { name: "TypeScript" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "Tailwind CSS", icon: "tailwind.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "GitHub", icon: "github.svg" },
    { name: "AWS", icon: "icons8-aws.svg" },
    { name: "Figma", icon: "icons8-figma.svg" },
    { name: "Scrum" },
  ],
];

export type ExperienceItem = {
  period: string;
  org: string;
  type: "Laboral" | "Freelance" | "Educación";
  role: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "May 2026 — Oct 2026",
    org: "Banco Contactar",
    type: "Laboral",
    role: "Ingeniero de Software",
    description:
      "Desarrollo y automatización en el banco, trabajando con el área de Canales y el área de Operaciones sobre el core bancario Bantotal.",
    highlights: [
      "Implementé la automatización de las pruebas funcionales de la app móvil Mi Contactar, un proceso que el banco no tenía y que antes se hacía a mano en cada versión.",
      "Desarrollé un panel web para que el área de Canales conecte su dispositivo Android, elija las pruebas y las ejecute con un clic, viendo los resultados en tiempo real.",
      "Construí reportes, consultas y servicios sobre Bantotal para ambientes productivos con grandes volúmenes de datos.",
    ],
    tags: ["GeneXus", "SQL Server", "Bantotal", "Python", "Automatización"],
  },
  {
    period: "Sep 2025 — Nov 2025",
    org: "Freelance",
    type: "Freelance",
    role: "Desarrollador Front-end",
    description:
      "Proyecto de punta a punta para un cliente: el portafolio de servicios de un ingeniero de software en Oracle.",
    highlights: [
      "Definí el alcance y la estructura del sitio junto con el cliente.",
      "Diseñé y desarrollé el sitio con Next.js, adaptable a cualquier pantalla.",
      "Lo publiqué en Vercel y lo entregué listo para producción.",
    ],
    tags: ["Next.js", "React", "Vercel"],
  },
  {
    period: "2023 — 2026",
    org: "Universidad Cooperativa de Colombia",
    type: "Educación",
    role: "Ingeniería de Software",
    description: "Pregrado en Ingeniería de Software en San Juan de Pasto.",
    highlights: [
      "Formación complementaria en Scrum, Inteligencia Artificial y GeneXus 18.",
    ],
    tags: ["Pregrado"],
  },
];
