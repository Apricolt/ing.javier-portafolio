"use client";

const interests = [
  {
    id: 1,
    title: "Desarrollo de Software",
    description: "Creación de aplicaciones y soluciones tecnológicas innovadoras utilizando las mejores prácticas y tecnologías modernas.",
    icon: "💻"
  },
  {
    id: 2,
    title: "Inteligencia Artificial",
    description: "Exploración y aplicación de técnicas de IA y machine learning para resolver problemas complejos.",
    icon: "🤖"
  },
  {
    id: 3,
    title: "Cloud Computing",
    description: "Diseño e implementación de soluciones en la nube para optimizar recursos y escalabilidad.",
    icon: "☁️"
  },
  {
    id: 4,
    title: "Docencia",
    description: "Compartir conocimientos y experiencias para formar a las nuevas generaciones de profesionales tecnológicos.",
    icon: "📚"
  }
];

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

        <div className="max-w-3xl mx-auto mb-8 p-4 bg-[#2d1b4d] rounded-xl shadow-lg">
          <article className="text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium">
              Amante de la tecnología y la programación. Me gusta aprender constantemente y compartir los pasos que
              voy dando en este mundo tan amplio.
              Disfruto crear proyectos que aporten valor a la sociedad y ayuden a las personas de forma práctica.
            </p>
          </article>
        </div>
      </header>

      {/* Grid de intereses */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Intereses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {interests.map((interest) => (
            <article
              key={interest.id}
              className="bg-[#2d1b4d] p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{interest.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{interest.title}</h3>
              <p className="text-gray-300 text-sm">{interest.description}</p>
            </article>
          ))}
        </div>
      </div>

      <nav className="flex flex-wrap justify-center gap-4">
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
