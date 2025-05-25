"use client";
import { useState } from "react";

const academicExperience = [
  {
    id: 1,
    title: "Monitoria Bienestar Universitario",
    description: "Colabore con el area de Bienestar Universitario en la Universidad de la Universidad Cooperativa de Colombia, donde estuve acargo de diseñar y crear imagenes para las redes sociales de la universidad, donde aprendi principios basicos de UI",
    date: "Febrero - Mayo 2024",
    technologies: ["Canva", "Figma", "UI Design"]
  },
];

const workExperience = [
  {
    id: 2,
    title: "Café Express",
    description: "Creé una pagina web donde se muestran los departamentos que mas producen cafe del pais, y le implemente un chatbot para que los usuarios pueden solicitar informacion sobre el cafe y los departamentos.",
    date: "Febrero - Mayo 2024",
    technologies: ["Next.js",]
  }
];

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<'academica' | 'laboral'>("academica");
  
  const renderContent = () => {
    const timelineData = activeTab === "academica" ? academicExperience : workExperience;
    return (
      <section className="relative w-full flex flex-col md:items-center md:justify-center" aria-labelledby={`${activeTab}-experience-heading`}>
        <h3 id={`${activeTab}-experience-heading`} className="sr-only">
          Experiencia {activeTab === 'academica' ? 'académica' : 'laboral'}
        </h3>
        
        {/* Línea de tiempo */}
        <div className="hidden md:flex absolute left-1/2 top-[110px] w-[60%] h-1 bg-gradient-to-r from-[#46367C] to-[#4A2FBD] z-0" style={{transform: 'translateX(-50%)'}} aria-hidden="true" />
        <div className="block md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#46367C] to-[#4A2FBD] z-0" style={{transform: 'translateX(-50%)'}} aria-hidden="true" />
        
        <ol className="flex flex-col md:flex-row items-center md:justify-center w-full relative z-10 gap-8 md:gap-8 transition-all duration-500 list-none">
          {timelineData.map((item, idx) => (
            <li key={item.id} className="flex flex-col items-center md:w-auto md:px-2 mb-12 md:mb-0">
              <div className="z-20 flex items-center justify-center w-16 h-16 rounded-full bg-[#17072B] text-white text-2xl font-bold border-4 border-[#4A2FBD] mb-4 md:mb-8 md:mt-0 md:mx-auto" aria-hidden="true">
                {idx + 1}
              </div>
              
              <article className="bg-[#2d1b4d] text-white rounded-2xl px-8 py-6 max-w-xs text-center mt-2 md:mt-8 transform transition-all duration-500 md:hover:scale-105 active:scale-105 md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:shadow-[0_0_30px_rgba(147,51,234,0.5)]" style={{ minWidth: '260px' }}>
                <header>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                </header>
                <p className="text-sm mb-3">{item.description}</p>
                {item.technologies && (
                  <ul className="flex flex-wrap gap-1 justify-center mb-3 list-none">
                    {item.technologies.map((tech) => (
                      <li key={tech}>
                        <span className="px-2 py-1 bg-[#3d2b5d] text-purple-300 text-xs rounded-full">
                          {tech}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.date && <time className="text-xs text-gray-300" dateTime={item.date}>{item.date}</time>}
              </article>
            </li>
          ))}
        </ol>
      </section>
    );
  };

  return (
    <section className="container mx-auto px-4 py-16" aria-labelledby="experience-heading">
      <header className="text-center mb-12">
        <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-white mb-8">Experiencia</h2>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Filtros de experiencia">
          <button
            className={`group px-8 py-2 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'academica' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('academica')}
            aria-pressed={activeTab === 'academica'}
          >
            <span className="relative z-10">Académica</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'laboral' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('laboral')}
            aria-pressed={activeTab === 'laboral'}
          >
            <span className="relative z-10">Laboral</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
          </button>
        </nav>
      </header>

      {renderContent()}
    </section>
  );
}