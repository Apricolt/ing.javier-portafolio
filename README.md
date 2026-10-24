# Portafolio — Javier Ordoñez

Portafolio personal de **Javier Alejandro Ordoñez Sapuyes**, Ingeniero de Software.
Publicado en https://ing.jaos-portafolio.vercel.app

Presentación en video: https://youtu.be/9w82mZpMY0I

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- GSAP + ScrollTrigger (animaciones) y Lenis (scroll suave)
- EmailJS (formulario de contacto)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Dónde cambiar el contenido

Todo el texto del sitio (perfil, proyectos, certificaciones, stack y experiencia) está en
[`src/data/profile.ts`](src/data/profile.ts). Las capturas de los proyectos van en `public/projects/`.

## Estructura

```
src/
  app/          layout, página, estilos globales, SEO (robots, sitemap, imagen OG, ícono)
  data/         profile.ts — contenido del portafolio
  lib/          configuración de GSAP y animación de aparición al hacer scroll
  components/
    layout/     Preloader, Header + menú, Footer, Providers (scroll suave)
    sections/   Hero, Approach, Projects, Certifications, TechStack, Experience, Contact
    ui/         nombre animado, partículas, visual generativo, tarjetas, botones, íconos
```

## Formulario de contacto

Requiere las variables `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` y
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. Ver [EMAILJS_CONFIG.md](EMAILJS_CONFIG.md).
