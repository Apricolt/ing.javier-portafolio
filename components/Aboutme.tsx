"use client";

const Aboutme = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="container mx-auto px-4 pt-16" aria-label="Sobre mí">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Sobre mi 
        </h2>

        <div className="max-w-3xl mx-auto mb-8 p-4 bg-[#2d1b4d]  rounded-xl shadow-lg">
          <article className="text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium">
              Amante de la tecnología y la programación. Me gusta aprender constantemente y compartir los pasos que
              voy dando en este mundo tan amplio.
              Disfruto crear proyectos que aporten valor a la sociedad y ayuden a las personas de forma práctica.
            </p>
          </article>
        </div>
      </header>

      <nav className="flex flex-col md:flex-row gap-4 justify-center items-center" aria-label="Navegación de secciones">
        <button
          onClick={() => scrollToSection('portfolio')}
          className="group w-full md:w-48 py-3 px-6 rounded-full bg-[#2d1b4d] hover:bg-[#3d2b5d] transition-all duration-300 text-white text-lg relative overflow-hidden transform hover:scale-105"
          aria-label="Ir a proyectos"
        >
          <span className="relative z-10">Projects</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          onClick={() => scrollToSection('experience')}
          className="group w-full md:w-48 py-3 px-6 rounded-full bg-[#2d1b4d] hover:bg-[#3d2b5d] transition-all duration-300 text-white text-lg relative overflow-hidden transform hover:scale-105"
          aria-label="Ir a experiencia"
        >
          <span className="relative z-10">Experience</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </nav>
    </section>
  );
};

export default Aboutme;
