import Welcome from "@/components/Welcome";
import Aboutme from "@/components/Aboutme";
import Portfolio from "@/components/Portfolio";
import NoCode from "@/components/NoCode";
import Experience from "@/components/Experience";
import Contact from "../../components/Contact";
import CoverParticles from "@/components/cover-particles";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <LoadingScreen />
      
      {/* Particles en el fondo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CoverParticles />
      </div>

      {/* Navbar fijo en la parte superior */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Sección de Bienvenida */}
        <section id="welcome" className="min-h-screen">
          <div className="pt-20">
            <Welcome />
          </div>
        </section>

        {/* Sección Sobre Mí */}
        <section id="about" className="min-h-screen">
          <div className="pt-20">
            <Aboutme />
          </div>
        </section>

        {/* Sección Portafolio */}
        <section id="portfolio" className="min-h-screen">
          <div className="pt-20">
            <Portfolio />
          </div>
        </section>

        {/* Sección No Code */}
        <section id="nocode" className="min-h-screen">
          <div className="pt-20">
            <NoCode />
          </div>
        </section>

        {/* Sección Experiencia */}
        <section id="experience" className="min-h-screen">
          <div className="pt-20">
            <Experience />
          </div>
        </section>

        {/* Sección Contacto */}
        <section id="contact" className="min-h-screen">
          <div className="pt-20">
            <Contact />
          </div>
        </section>
      </div>
    </main>
  );
}


