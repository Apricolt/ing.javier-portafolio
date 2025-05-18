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
  },
  {
    id: 2,
    title: "Sistema de Gestión de Tareas",
    description: "Aplicación web full-stack para gestión de tareas con autenticación, roles de usuario y dashboard interactivo. Implementa patrones de diseño y arquitectura limpia.",
    image: "/task-management.jpg",
    technologies: ["Django", "React", "PostgreSQL", "Docker", "AWS"],
    url: "https://github.com/tuusuario/task-management"
  },
  {
    id: 3,
    title: "API REST de E-commerce",
    description: "API RESTful para plataforma de e-commerce con autenticación JWT, paginación, filtrado y documentación con Swagger. Implementa principios SOLID y patrones de diseño.",
    image: "/api-ecommerce.jpg",
    technologies: ["Spring Boot", "Java", "PostgreSQL", "JUnit", "Swagger"],
    url: "https://github.com/tuusuario/ecommerce-api"
  }
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
          <div className="max-w-3xl mx-auto ">
            <div className="flex overflow-x-auto gap-8 pb-6 custom-scrollbar">
              {projects.map((project) => (
                <article 
                  key={project.id}
                  className="flex-none w-[350px] h-[500px] bg-[#2d1b4d] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  {project.image && (
                    <div className="relative h-[200px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 h-[300px] flex flex-col">
                    <h3 className="font-bold text-xl mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
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
          </div>
        );

      case 'certificates':
        return (
          <div className="max-w-3xl mx-auto">
            <div className="flex overflow-x-auto gap-8 pb-6 custom-scrollbar">
              {certificates.map((cert) => (
                <article 
                  key={cert.id}
                  className="flex-none w-[350px] h-[500px] bg-[#2d1b4d] rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => window.open(cert.url, '_blank')}
                >
                  <div className="relative h-[200px]">
                    <img
                      src={cert.image}
                      alt={`Certificado ${cert.title}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 h-[300px] flex flex-col">
                    <h3 className="font-bold text-xl mb-2 text-white">{cert.title}</h3>
                    <p className="text-gray-300 text-sm mb-2 flex-grow">{cert.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-purple-400 text-sm">{cert.issuer}</span>
                      <time className="text-gray-400 text-sm">{cert.date}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      case 'techstack':
        return <TechStack />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-8" aria-label="Portafolio de proyectos">
      <header className="text-center">
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

      <main className="mt-12">
        {renderContent()}
      </main>
    </section>
  );
};

export default Portfolio;