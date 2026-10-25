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
// Fuente variable: el nombre del hero anima su ancho y peso con el cursor
const flex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-flex",
  axes: ["wdth", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "Javier Ordoñez",
    "Ingeniero de Software",
    "Software Engineer",
    "Inteligencia Artificial",
    "GeneXus",
    "Bantotal",
    "SQL Server",
    "Automatización de pruebas",
    "Next.js",
    "Pasto",
    "Colombia",
  ],
  authors: [{ name: me.fullName, url: site.url }],
  creator: me.fullName,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: me.name,
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
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
      className={`${inter.variable} ${space.variable} ${josefin.variable} ${jetbrains.variable} ${flex.variable}`}
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
