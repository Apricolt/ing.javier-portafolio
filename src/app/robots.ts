import type { MetadataRoute } from "next";
import { site } from "@/data/content";

// Reglas para los robots de los buscadores (se publica en /robots.txt):
// todo el sitio se puede indexar y se indica dónde está el mapa del sitio.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
