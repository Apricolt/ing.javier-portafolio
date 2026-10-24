import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Josefin_Sans, JetBrains_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { profile, site } from "@/data/profile";

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
    "GeneXus",
    "Bantotal",
    "SQL Server",
    "Automatización de pruebas",
    "Next.js",
    "Pasto",
    "Colombia",
  ],
  authors: [{ name: profile.fullName, url: site.url }],
  creator: profile.fullName,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: profile.name,
    type: "website",
    locale: "es_CO",
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
  themeColor: "#050505",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${space.variable} ${josefin.variable} ${jetbrains.variable} ${flex.variable}`}
    >
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
