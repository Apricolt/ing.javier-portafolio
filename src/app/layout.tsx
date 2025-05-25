import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Javier Ordoñez - Ingeniero de Software | Portfolio",
  description: "Portfolio profesional de Javier Alejandro Ordoñez Sapuyes, Ingeniero de Software especializado en desarrollo web con Next.js, React, Python, Java y tecnologías modernas.",
  keywords: "Javier Ordoñez, Ingeniero Software, Desarrollador Web, Next.js, React, Python, Java, Portfolio",
  authors: [{ name: "Javier Alejandro Ordoñez Sapuyes" }],
  creator: "Javier Alejandro Ordoñez Sapuyes",
  openGraph: {
    title: "Javier Ordoñez - Ingeniero de Software",
    description: "Portfolio profesional con proyectos de desarrollo web, certificaciones y experiencia tecnológica",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
