import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Josefin_Sans, JetBrains_Mono, Roboto_Flex } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { me, site } from "@/data/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const josefin = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
// Fuente variable: el nombre del hero anima su ancho y peso con el cursor (solo el eje de ancho, más liviana)
const flex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-flex",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${me.name}` },
  description: site.description,
  applicationName: me.name,
  keywords: [
    "Javier Ordoñez",
    "Javier Alejandro Ordoñez Sapuyes",
    "Ingeniero de Software",
    "Ingeniero de Software Pasto",
    "Desarrollador de software Colombia",
    "Software Engineer",
    "Inteligencia Artificial",
    "GeneXus",
    "Bantotal",
    "SQL Server",
    "Automatización de pruebas",
    "Next.js",
    "Pasto",
    "Nariño",
    "Colombia",
  ],
  authors: [{ name: me.fullName, url: site.url }],
  creator: me.fullName,
  publisher: me.fullName,
  category: "technology",
  // URL oficial de la página (evita contenido duplicado entre dominios)
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Javier",
    lastName: "Ordoñez",
    title: site.title,
    description: site.description,
    url: "/",
    siteName: me.name,
    locale: "es_CO",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Código de Google Search Console: se pone como variable en Vercel (GOOGLE_SITE_VERIFICATION)
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f1" },
  ],
};

// Aplica el tema guardado antes de pintar, para que no haya parpadeo
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`no-transitions ${inter.variable} ${space.variable} ${josefin.variable} ${jetbrains.variable} ${flex.variable}`}
    >
      <body className="antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
