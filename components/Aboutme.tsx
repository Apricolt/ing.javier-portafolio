"use client";

const Aboutme = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen py-16">
      {/* Flecha de scroll hacia abajo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-white"
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-16">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
          About me
        </h2>

        {/* Descripción */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Soy un estudiante de ingenieria de software que le interesa el desarrollo de software
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group w-full md:w-48 py-3 px-6 rounded-full bg-[#2d1b4d] hover:bg-[#3d2b5d] transition-all duration-300 text-white text-lg relative overflow-hidden"
          >
            <span className="relative z-10">Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => scrollToSection('experience')}
            className="group w-full md:w-48 py-3 px-6 rounded-full bg-[#2d1b4d] hover:bg-[#3d2b5d] transition-all duration-300 text-white text-lg relative overflow-hidden"
          >
            <span className="relative z-10">Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => scrollToSection('certificate')}
            className="group w-full md:w-48 py-3 px-6 rounded-full bg-[#2d1b4d] hover:bg-[#3d2b5d] transition-all duration-300 text-white text-lg relative overflow-hidden"
          >
            <span className="relative z-10">Certificate</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
