"use client";
import { useState } from 'react';
import TechStack from './TechStack';

const projects = [
  {
    id: 1,
    title: "Portfolio Personal",
    description: "Portfolio personal desarrollado con Next.js y Tailwind CSS, implementando las mejores prácticas de diseño y desarrollo web moderno.",
    image: "",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    url: "https://github.com/tuusuario/portfolio"
  }
  // Agrega más proyectos aquí
];


const certificates = [
  {
    id: 1,
    title: "Python for Data Science",
    issuer: "IBM",
    date: "2023",
    image: "/Python.png",
    url: "https://www.credly.com/badges/5df6ecdd-e39d-408c-8af6-861e50df9db0/public_url",
    description: "Quien obtenga la insignia podrá escribir sus propios scripts en Python y realizar análisis de datos prácticos básicos utilizando el entorno de laboratorio basado en Jupyter de IBM."
  },
  {
    id: 2,
    title: "Metodolias Agiles: SCRUM",
    issuer: "Certione",
    date: "2025",
    image: "/SCRUM.jpg",
    url: "https://certione.org/certificate-verification/36E115E-36E1094-3125F23/",
    description: "Certificación en metodologías ágiles, específicamente en SCRUM, que permite a los participantes comprender y aplicar las mejores prácticas de desarrollo ágil en proyectos de software."
  }
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techstack'>('projects');

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article 
                key={project.id}
                className="bg-[#2d1b4d] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative pb-[56.25%]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-[#3d2b5d] text-purple-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        );

      case 'certificates':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <article 
                key={cert.id}
                className="bg-[#2d1b4d] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                onClick={() => window.open(cert.url, '_blank')}
              >
                <div className="relative pb-[100%]">
                  <img
                    src={cert.image}
                    alt={`Certificado ${cert.title}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-white">{cert.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{cert.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-purple-400 text-sm">{cert.issuer}</span>
                    <time className="text-gray-400 text-sm">{cert.date}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        );

      case 'techstack':
        return <TechStack />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-8" aria-label="Portafolio de proyectos">
      <header className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Portfolio
        </h2>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Secciones del portfolio">
          <button
            className={`group px-8 py-2 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'projects' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('projects')}
            aria-pressed={activeTab === 'projects'}
          >
            <span className="relative z-10">Proyectos</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'certificates' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('certificates')}
            aria-pressed={activeTab === 'certificates'}
          >
            <span className="relative z-10">Certificados</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'techstack' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('techstack')}
            aria-pressed={activeTab === 'techstack'}
          >
            <span className="relative z-10">Tech Stack</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </nav>
      </header>

      <main className="mt-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>
    </section>
  );
};

export default Portfolio;