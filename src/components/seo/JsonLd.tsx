import { content, me, site, socials, stackRows } from "@/data/content";

/**
 * Datos estructurados (schema.org) para buscadores: le dicen a Google quién es
 * Javier, a qué se dedica, dónde está y cuáles son sus perfiles. No se ven en pantalla.
 * Valídalos en https://search.google.com/test/rich-results
 */
export default function JsonLd() {
  const es = content.es;
  const personId = `${site.url}/#person`;
  const websiteId = `${site.url}/#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: me.fullName,
        alternateName: me.name,
        givenName: "Javier Alejandro",
        familyName: "Ordoñez Sapuyes",
        jobTitle: es.profile.role,
        description: es.profile.intro,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        email: `mailto:${me.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Juan de Pasto",
          addressRegion: "Nariño",
          addressCountry: "CO",
        },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Cooperativa de Colombia" },
        knowsAbout: [
          "Ingeniería de Software",
          "Inteligencia Artificial",
          "Automatización de pruebas",
          ...stackRows.flat().map((tech) => tech.name),
        ],
        hasCredential: es.certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.title,
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: c.issuer },
          ...(c.url ? { url: c.url } : {}),
        })),
        sameAs: socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: me.name,
        description: site.description,
        inLanguage: ["es", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profilepage`,
        url: site.url,
        name: site.title,
        inLanguage: "es",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Se escapa "<" para que el JSON no pueda cerrar la etiqueta <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
