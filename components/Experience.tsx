"use client";
import { useState } from "react";

const academicExperience = [
  {
    id: 1,
    title: "Monitoria Bienestar Universitario",
    description: "Colabore con el area de Bienestar Universitario en la Universidad de la Universidad Cooperativa de Colombia, donde estuve acargo de diseñar y crear imagenes para las redes sociales de la universidad, donde aprendi principios basicos de UI",
    date: "Febrero - Mayo 2024"
  },
];

const workExperience = [
  {
    id: 2,
    title: "Café Express",
    description: "Creé un sistema web para subir imágenes de granos de café y clasificar el nivel de tostado con IA.",
    date: "Febrero - Mayo 2024"
  }
];

export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<'academica' | 'laboral'>("academica");
  const renderContent = () => {
    const timelineData = activeTab === "academica" ? academicExperience : workExperience;
    return (
      <article className="relative w-full flex flex-col md:items-center md:justify-center">
        <figure className="hidden md:flex absolute left-1/2 top-[110px] w-[60%] h-1 bg-gradient-to-r from-[#46367C] to-[#4A2FBD] z-0" style={{transform: 'translateX(-50%)'}} aria-hidden="true" />
        <figure className="block md:hidden absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#46367C] to-[#4A2FBD] z-0" style={{transform: 'translateX(-50%)'}} aria-hidden="true" />
        
        <ul className="flex flex-col md:flex-row items-center md:justify-center w-full relative z-10 gap-8 md:gap-8 transition-all duration-500">
          {timelineData.map((item, idx) => (
            <li key={item.id} className="flex flex-col items-center md:w-auto md:px-2 mb-12 md:mb-0">
              <figure className="z-20 flex items-center justify-center w-16 h-16 rounded-full bg-[#17072B] text-white text-2xl font-bold border-4 border-[#4A2FBD] mb-4 md:mb-8 md:mt-0 md:mx-auto" aria-hidden="true">
                {idx + 1}
              </figure>
              
              <article className="bg-[#2d1b4d] text-white rounded-2xl px-8 py-6 shadow-lg max-w-xs text-center mt-2 md:mt-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl" style={{ minWidth: '260px' }}>
                <header>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                </header>
                <p className="text-sm mb-2">{item.description}</p>
                {item.date && <time className="text-xs text-gray-300">{item.date}</time>}
              </article>
            </li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <section className="container mx-auto px-4 py-16" aria-label="Experiencia profesional">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Experiencia</h2>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Filtros de experiencia">
          <button
            className={`group px-8 py-2 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'academica' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('academica')}
            aria-pressed={activeTab === 'academica'}
          >
            <span className="relative z-10">Académica</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'laboral' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('laboral')}
            aria-pressed={activeTab === 'laboral'}
          >
            <span className="relative z-10">Laboral</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

        </nav>
      </header>

      {renderContent()}
    </section>
  );
}