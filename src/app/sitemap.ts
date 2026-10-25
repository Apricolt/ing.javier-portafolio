import type { MetadataRoute } from "next";
import { content, site } from "@/data/content";

// Mapa del sitio para buscadores (se publica en /sitemap.xml).
// Incluye las imágenes principales para que también aparezcan en Google Imágenes.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/opengraph-image`, ...content.es.projects.map((p) => `${site.url}${p.image}`)],
    },
  ];
}
