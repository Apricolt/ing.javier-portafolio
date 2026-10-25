import type { MetadataRoute } from "next";
import { me, site } from "@/data/content";

// Manifiesto web: nombre, colores e íconos cuando se guarda el sitio en el celular
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: me.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    lang: "es",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
