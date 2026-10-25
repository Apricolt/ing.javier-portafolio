// Todo el contenido del portafolio vive aquí, en español (es) e inglés (en).
// Para cambiar un texto, edítalo en los dos idiomas.

export type Locale = "es" | "en";

export const site = {
  // Dominio público. Para cambiarlo sin tocar código, define NEXT_PUBLIC_SITE_URL en Vercel.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://javordev.vercel.app").replace(/\/+$/, ""),
  // Título y descripción para Google (≈60 y ≈155 caracteres, lo que muestra el buscador)
  title: "Javier Ordoñez | Ingeniero de Software en Pasto, Colombia",
  description:
    "Ingeniero de Software en Pasto, Colombia. Desarrollo software con Inteligencia Artificial, GeneXus, SQL Server, automatización de pruebas y Next.js.",
};

/** Datos que no cambian con el idioma */
export const me = {
  name: "Javier Ordoñez",
  fullName: "Javier Alejandro Ordoñez Sapuyes",
  initials: "JO",
  heroWord: "JAVIER",
  email: "notapricolt@gmail.com",
};

export type Social = { label: string; href: string; icon: "github" | "linkedin" };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Apricolt", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/javier-ordo%C3%B1ez-4b136a2b8/",
    icon: "linkedin",
  },
];

export type StackIcon =
  | "genexus"
  | "sqlserver"
  | "bantotal"
  | "python"
  | "fastapi"
  | "django"
  | "postgresql"
  | "nextjs"
  | "react"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "git"
  | "github"
  | "aws"
  | "figma"
  | "scrum";

export type Tech = { name: string; icon: StackIcon };

export const stackRows: Tech[][] = [
  [
    { name: "GeneXus 18", icon: "genexus" },
    { name: "SQL Server", icon: "sqlserver" },
    { name: "Bantotal", icon: "bantotal" },
    { name: "Python", icon: "python" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Django", icon: "django" },
    { name: "PostgreSQL", icon: "postgresql" },
  ],
  [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "AWS", icon: "aws" },
    { name: "Figma", icon: "figma" },
    { name: "Scrum", icon: "scrum" },
  ],
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

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  highlight: string;
  highlightLabel: string;
  description: string;
  url?: string;
};

export type ExperienceItem = {
  /** Opcionales: si no se ponen, no se muestran */
  period?: string;
  org?: string;
  type: string;
  role: string;
  description: string;
  highlights: string[];
  tags: string[];
};

export type Content = {
  ui: {
    home: string;
    explore: string;
    close: string;
    menu: string;
    socials: string;
    loading: string;
    viewProjects: string;
    talk: string;
    scroll: string;
    expandHint: string;
    liveSite: string;
    codeOf: (project: string) => string;
    technologies: string;
    verify: string;
    backToTop: string;
    footer: string;
    lang: { current: string; target: string; targetName: string; aria: string };
    theme: { toLight: string; toDark: string };
  };
  profile: {
    role: string;
    location: string;
    availability: string;
    eyebrow: string;
    tagline: string;
    intro: string;
    approachTitle: [string, string];
    approach: string;
  };
  nav: { label: string; href: string }[];
  headings: {
    projects: { title: string; subtitle: string };
    certifications: { title: string; subtitle: string };
    stack: { eyebrow: string; title: string; subtitle: string };
    experience: { eyebrow: string; title: string; subtitle: string; partTime: string };
    contact: { eyebrow: string; title: string; subtitle: string };
  };
  contact: {
    details: string;
    email: string;
    location: string;
    availability: string;
    socials: string;
    name: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    configError: string;
    errors: { name: string; email: string; message: string };
  };
  projects: Project[];
  certifications: Certification[];
  experience: ExperienceItem[];
  /** Bloque "Actividades de tiempo parcial", debajo de la experiencia principal */
  partTime: ExperienceItem[];
};

const es: Content = {
  ui: {
    home: "inicio",
    explore: "Explorar",
    close: "Cerrar",
    menu: "Menú principal",
    socials: "Redes",
    loading: "Cargando portafolio",
    viewProjects: "Ver proyectos",
    talk: "Hablemos",
    scroll: "Scroll",
    expandHint: "Desliza para expandir",
    liveSite: "Ver sitio",
    codeOf: (p) => `Código de ${p} en GitHub`,
    technologies: "Tecnologías",
    verify: "Verificar credencial",
    backToTop: "Volver arriba",
    footer: "Diseñado y desarrollado por mí.",
    lang: { current: "ES", target: "EN", targetName: "English", aria: "Switch to English" },
    theme: { toLight: "Activar modo claro", toDark: "Activar modo oscuro" },
  },
  profile: {
    role: "Ingeniero de Software",
    location: "San Juan de Pasto, Nariño, Colombia",
    availability: "Abierto a oportunidades",
    eyebrow: "La mejor manera de predecir el futuro es inventarlo.",
    tagline: "Tus problemas son mis oportunidades.",
    intro:
      "Ingeniero de Software en Pasto, Colombia. Desarrollador de software enfocado en integración con Inteligencia Artificial.",
    approachTitle: ["MI", "ENFOQUE"],
    approach:
      "Me apasiona la tecnología y aprendo de forma constante, compartiendo lo que descubro en el camino. Mi propósito con el software es hacerle más fácil el trabajo a otras personas. Me pongo en el lugar de quien va a usar cada herramienta.",
  },
  nav: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Certificaciones", href: "#certificaciones" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Contacto", href: "#contacto" },
  ],
  headings: {
    projects: {
      title: "Proyectos destacados",
      subtitle:
        "Del cliente freelance a la aplicación web: soluciones pensadas, construidas y publicadas de punta a punta.",
    },
    certifications: {
      title: "Certificaciones",
      subtitle: "Formación que respalda lo que construyo todos los días.",
    },
    stack: { eyebrow: "Stack", title: "Con qué construyo", subtitle: "Del core bancario al navegador." },
    experience: {
      eyebrow: "Trayectoria",
      title: "Dónde he trabajado",
      subtitle: "Mi recorrido profesional y académico.",
      partTime: "Actividades de tiempo parcial",
    },
    contact: {
      eyebrow: "Contacto",
      title: "Construyamos algo juntos",
      subtitle: "¿Tienes un proyecto, una vacante o una idea? Escríbeme y conversemos.",
    },
  },
  contact: {
    details: "Datos de contacto",
    email: "Correo",
    location: "Ubicación",
    availability: "Disponibilidad",
    socials: "Redes",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tu@correo.com",
    message: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto o propuesta…",
    send: "Enviar mensaje",
    sending: "Enviando…",
    success: "¡Mensaje enviado! Te responderé pronto.",
    error: `No se pudo enviar. Escríbeme directamente a ${me.email}.`,
    configError: `El formulario no está configurado todavía. Escríbeme a ${me.email}.`,
    errors: {
      name: "Escribe tu nombre (mínimo 2 caracteres).",
      email: "Escribe un correo válido.",
      message: "Cuéntame un poco más (mínimo 10 caracteres).",
    },
  },
  projects: [
    {
      title: "Cafenar — Café de Colombia",
      kind: "Proyecto web",
      description:
        "Aplicación web que muestra los departamentos con mayor producción de café en Colombia y las características del café de cada región.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
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
      tech: ["Next.js", "Tailwind CSS", "Vercel"],
      image: "/projects/oracle.png",
      imageAlt: "Página de inicio del portafolio de Joseph Grijalva",
      live: "https://portfolio-jhosgri.vercel.app/",
    },
  ],
  certifications: [
    {
      title: "GeneXus 18 Junior Analyst",
      issuer: "GeneXus Training",
      date: "Oct 2026",
      highlight: "100%",
      highlightLabel: "de puntaje",
      description: "Certificación oficial de GeneXus 18 como analista junior, aprobada con el puntaje máximo.",
      url: "https://training.genexus.com/es/aprender/tecnicos-certificados",
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
      url: "https://www.acreditta.com/credential/9e53b62b-d1fd-4113-8fb1-5c899b337b2c",
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
  ],
  experience: [
    {
      period: "May 2026 — Oct 2026",
      org: "Banco Contactar",
      type: "Laboral",
      role: "Ingeniero de Software",
      description:
        "Desarrollo y automatización en el banco, trabajando con el área de Canales y el área de Operaciones sobre el core bancario Bantotal.",
      highlights: [
        "Implementé la automatización de las pruebas funcionales de la app móvil Mi Contactar, un proceso que el banco no tenía, y desarrollé un panel web desde el que el área de Canales conecta su dispositivo Android, elige las pruebas y las ejecuta con un clic, viendo los resultados en tiempo real.",
        "Desarrollé en GeneXus web panels que consumen procedimientos almacenados de SQL Server para generar reportes en Excel, además de consultas y servicios sobre Bantotal para ambientes productivos con grandes volúmenes de datos.",
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
      tags: ["Next.js", "Tailwind CSS", "Vercel"],
    },
    {
      period: "Feb 2024 — May 2024",
      org: "Universidad Cooperativa de Colombia",
      type: "Monitoría",
      role: "Monitor de Bienestar Universitario",
      description: "Apoyo al área de Bienestar Universitario en San Juan de Pasto con el diseño de piezas digitales.",
      highlights: [
        "Diseño de interfaces visuales: piezas gráficas digitales (e-cards e invitaciones) aplicando composición, tipografía y teoría del color para mejorar la legibilidad y el engagement.",
        "Fundamentos de UX/UI: jerarquía visual y accesibilidad en piezas de comunicación masiva.",
        "Colaboración creativa con el área de Bienestar en la conceptualización de campañas digitales, cuidando la consistencia de marca de la universidad.",
        "Desarrollé una mentalidad orientada al detalle visual que hoy me permite implementar maquetas (mockups) fieles al diseño original.",
      ],
      tags: ["UI", "UX", "Diseño gráfico"],
    },
  ],
  partTime: [
    {
      type: "Tiempo parcial",
      role: "Profesor de Matemáticas",
      description: "Enseñanza de matemáticas para grupos de distintas edades y contextos sociales.",
      highlights: [
        "Preparé y adapté material didáctico y planes de clase según la edad, el nivel y las necesidades de cada grupo.",
        "Acompañé a poblaciones vulnerables y a estudiantes de 11 a 16 años, con explicaciones claras y un ritmo ajustado a cada persona.",
        "Fortalecí habilidades que hoy aplico en el desarrollo de software: comunicar ideas complejas de forma sencilla y ponerme en el lugar de quien aprende.",
      ],
      tags: ["Docencia", "Matemáticas", "Pedagogía"],
    },
  ],
};

const en: Content = {
  ui: {
    home: "home",
    explore: "Explore",
    close: "Close",
    menu: "Main menu",
    socials: "Socials",
    loading: "Loading portfolio",
    viewProjects: "View projects",
    talk: "Let's talk",
    scroll: "Scroll",
    expandHint: "Scroll to expand",
    liveSite: "Live site",
    codeOf: (p) => `${p} source code on GitHub`,
    technologies: "Technologies",
    verify: "Verify credential",
    backToTop: "Back to top",
    footer: "Designed and built by me.",
    lang: { current: "EN", target: "ES", targetName: "Español", aria: "Cambiar a español" },
    theme: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  },
  profile: {
    role: "Software Engineer",
    location: "San Juan de Pasto, Nariño, Colombia",
    availability: "Open to opportunities",
    eyebrow: "The best way to predict the future is to invent it.",
    tagline: "Your problems are my opportunities.",
    intro:
      "Software Engineer in Pasto, Colombia. Developer focused on integrating Artificial Intelligence into software.",
    approachTitle: ["MY", "APPROACH"],
    approach:
      "I'm passionate about technology and I keep learning every day, sharing what I discover along the way. My purpose with software is to make other people's work easier. I put myself in the shoes of whoever will use each tool.",
  },
  nav: [
    { label: "Projects", href: "#proyectos" },
    { label: "Certifications", href: "#certificaciones" },
    { label: "Experience", href: "#experiencia" },
    { label: "Contact", href: "#contacto" },
  ],
  headings: {
    projects: {
      title: "Featured projects",
      subtitle: "From freelance clients to web apps: solutions planned, built and shipped end to end.",
    },
    certifications: {
      title: "Certifications",
      subtitle: "Training that backs what I build every day.",
    },
    stack: { eyebrow: "Stack", title: "What I build with", subtitle: "From the banking core to the browser." },
    experience: {
      eyebrow: "Journey",
      title: "Where I've worked",
      subtitle: "My professional and academic path.",
      partTime: "Part-time activities",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something together",
      subtitle: "Have a project, a job opening or an idea? Write to me and let's talk.",
    },
  },
  contact: {
    details: "Contact details",
    email: "Email",
    location: "Location",
    availability: "Availability",
    socials: "Socials",
    name: "Name",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    message: "Message",
    messagePlaceholder: "Tell me about your project or proposal…",
    send: "Send message",
    sending: "Sending…",
    success: "Message sent! I'll get back to you soon.",
    error: `It couldn't be sent. Email me directly at ${me.email}.`,
    configError: `The form isn't set up yet. Email me at ${me.email}.`,
    errors: {
      name: "Enter your name (at least 2 characters).",
      email: "Enter a valid email.",
      message: "Tell me a bit more (at least 10 characters).",
    },
  },
  projects: [
    {
      ...es.projects[0],
      title: "Cafenar — Colombian Coffee",
      kind: "Web project",
      description:
        "Web app that showcases Colombia's top coffee-producing departments and what makes each region's coffee unique.",
      imageAlt: "Cafenar home page",
    },
    {
      ...es.projects[1],
      title: "Professional portfolio — Oracle engineer",
      kind: "Freelance client",
      description:
        "Services portfolio for Joseph Grijalva, a software engineer at Oracle. I built it end to end: planning with the client, design, development and deployment.",
      imageAlt: "Home page of Joseph Grijalva's portfolio",
    },
  ],
  certifications: [
    {
      ...es.certifications[0],
      highlightLabel: "score",
      description: "Official GeneXus 18 Junior Analyst certification, passed with a perfect score.",
    },
    {
      ...es.certifications[1],
      description:
        "Scrum fundamentals: roles, events and artifacts to manage software projects in an agile, iterative way.",
    },
    {
      ...es.certifications[2],
      title: "Artificial Intelligence — Basic Level",
      highlightLabel: "bootcamp",
      description:
        "Bootcamp by Colombia's Ministry of ICT with Universidad Tecnológica de Pereira and FaceIT on AI fundamentals and applications.",
    },
    {
      ...es.certifications[3],
      description: "Python scripting and hands-on data analysis with Pandas in IBM's Jupyter-based lab environment.",
    },
  ],
  experience: [
    {
      ...es.experience[0],
      type: "Work",
      role: "Software Engineer",
      description:
        "Development and automation at the bank, working with the Channels and Operations teams on the Bantotal core banking system.",
      highlights: [
        "I automated the functional tests of the Mi Contactar mobile app, a process the bank didn't have, and built a web panel where the Channels team connects an Android device, picks the tests and runs them in one click, watching the results in real time.",
        "I built GeneXus web panels that call SQL Server stored procedures to generate Excel reports, along with queries and services on Bantotal for production environments with large data volumes.",
      ],
      tags: ["GeneXus", "SQL Server", "Bantotal", "Python", "Automation"],
    },
    {
      ...es.experience[1],
      role: "Front-end Developer",
      description: "End-to-end project for a client: the services portfolio of a software engineer at Oracle.",
      highlights: [
        "Defined the site's scope and structure together with the client.",
        "Designed and built the site with Next.js, responsive on any screen.",
        "Deployed it on Vercel and delivered it production-ready.",
      ],
    },
    {
      ...es.experience[2],
      type: "Student assistant",
      role: "University Wellbeing Student Assistant",
      description: "Supported the University Wellbeing office in San Juan de Pasto with the design of digital pieces.",
      highlights: [
        "Visual interface design: digital pieces (e-cards and invitations) applying composition, typography and color theory to improve readability and engagement.",
        "UX/UI fundamentals: visual hierarchy and accessibility in mass-communication pieces.",
        "Creative collaboration with the Wellbeing team on digital campaign concepts, keeping the university's brand consistent.",
        "Built an eye for visual detail that now helps me implement mockups faithful to the original design.",
      ],
      tags: ["UI", "UX", "Graphic design"],
    },
  ],
  partTime: [
    {
      type: "Part-time",
      role: "Math Teacher",
      description: "Math teaching for groups of different ages and social backgrounds.",
      highlights: [
        "Prepared and adapted teaching materials and lesson plans to each group's age, level and needs.",
        "Supported vulnerable communities and students aged 11 to 16, with clear explanations at a pace suited to each learner.",
        "Built skills I now apply to software development: explaining complex ideas simply and putting myself in the learner's shoes.",
      ],
      tags: ["Teaching", "Mathematics", "Pedagogy"],
    },
  ],
};

export const content: Record<Locale, Content> = { es, en };
