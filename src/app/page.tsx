import Welcome from "../../components/Welcome";
import Aboutme from "../../components/Aboutme";
import Portfolio from "../../components/Portfolio";
import NoCode from "../../components/NoCode";
import Experience from "../../components/Experience";
import Contact from "../../components/Contact";
import CoverParticles from "../../components/cover-particles";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main className="bg-[#17072B] min-h-screen overflow-x-hidden relative">
      {/* Particles en el fondo */}
      <div className="fixed inset-0 z-0">
        <CoverParticles />
      </div>

      {/* Navbar fijo en la parte superior */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Sección de Bienvenida */}
        <section id="welcome" className="min-h-screen">
          <Welcome />
        </section>

        {/* Sección Sobre Mí */}
        <section id="about" className="min-h-screen">
          <Aboutme />
        </section>

        {/* Sección Portafolio */}
        <section id="portfolio" className="min-h-screen">
          <Portfolio />
        </section>

        {/* Sección No Code */}
        <section id="nocode" className="min-h-screen">
          <NoCode />
        </section>

        {/* Sección Experiencia */}
        <section id="experience" className="min-h-screen">
          <Experience />
        </section>

        {/* Sección Contacto */}
        <section id="contact" className="min-h-screen">
          <Contact />
        </section>
      </div>
    </main>
  );
}


