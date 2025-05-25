"use client";
import { useState } from 'react';
import TechStack from './TechStack';

const projects = [
  {
    id: 1,
    title: "Portfolio Personal",
    description: "Portfolio personal desarrollado con Next.js y Tailwind CSS, implementando las mejores prácticas de diseño y desarrollo web moderno.",
    image: "/Portafolio.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    url: "https://dise-o-interfaces-portfolio.vercel.app/"
  },
  {
    id: 2,
    title: "Café Colombia",
    description: "Aplicación web que muestra los departamentos que más producen café en Colombia, con un chatbot integrado para que los usuarios puedan solicitar información sobre el café y los departamentos productores.",
    image: "/cafe.png",
    technologies: ["Next.js", "HTML", "Tailwind CSS", "TypeScript"],
    url: "https://diseno-cafe-g6xw8icdy-javier-ordonezs-projects.vercel.app/"
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
          <section className="max-w-3xl mx-auto" aria-labelledby="projects-heading">
            <h3 id="projects-heading" className="sr-only">Lista de proyectos</h3>
            <ul className="flex overflow-x-auto gap-8 pb-6 custom-scrollbar list-none">
              {projects.map((project) => (
                <li key={project.id} className="flex-none w-[350px]">
                  <article 
                    className="group relative h-[500px] bg-[#2d1b4d] rounded-xl overflow-hidden transform transition-all duration-500 md:hover:scale-105 active:scale-105 cursor-pointer md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
                    onClick={() => window.open(project.url, '_blank')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.open(project.url, '_blank');
                      }
                    }}
                    aria-label={`Ver proyecto ${project.title}`}
                  >
                    {project.image && (
                      <figure className="relative h-[200px]">
                        <img
                          src={project.image}
                          alt={`Captura de pantalla del proyecto ${project.title}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </figure>
                    )}
                    <div className="p-6 h-[300px] flex flex-col text-center justify-center">
                      <h4 className="font-bold text-xl mb-2 text-white text-center mt-7">{project.title}</h4>
                      <p className="text-gray-300 text-sm mb-4 flex-grow flex items-center justify-center">{project.description}</p>
                      <ul className="flex flex-wrap gap-2 justify-center list-none">
                        {project.technologies.map((tech) => (
                          <li key={tech}>
                            <span className="px-3 py-1 bg-[#3d2b5d] text-purple-300 text-xs rounded-full">
                              {tech}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );

      case 'certificates':
        return (
          <section className="max-w-3xl mx-auto" aria-labelledby="certificates-heading">
            <h3 id="certificates-heading" className="sr-only">Lista de certificaciones</h3>
            <ul className="flex overflow-x-auto gap-8 pb-6 custom-scrollbar list-none">
              {certificates.map((cert) => (
                <li key={cert.id} className="flex-none w-[350px]">
                  <article 
                    className="group relative h-[500px] bg-[#2d1b4d] rounded-xl overflow-hidden transform transition-all duration-500 md:hover:scale-105 active:scale-105 cursor-pointer md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
                    onClick={() => window.open(cert.url, '_blank')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.open(cert.url, '_blank');
                      }
                    }}
                    aria-label={`Ver certificado ${cert.title}`}
                  >
                    <figure className="relative h-[200px]">
                      <img
                        src={cert.image}
                        alt={`Certificado ${cert.title}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </figure>
                    <div className="p-6 h-[300px] flex flex-col">
                      <h4 className="font-bold text-xl mb-2 text-white">{cert.title}</h4>
                      <p className="text-gray-300 text-sm mb-2 flex-grow">{cert.description}</p>
                      <footer className="flex justify-between items-center mt-auto">
                        <span className="text-purple-400 text-sm">{cert.issuer}</span>
                        <time className="text-gray-400 text-sm" dateTime={cert.date}>{cert.date}</time>
                      </footer>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );

      case 'techstack':
        return <TechStack />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="portfolio-heading">
      <header className="text-center">
        <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
          Portafolio
        </h2>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Filtros del portafolio">
          <button
            className={`group px-8 py-2 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'projects' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('projects')}
            aria-pressed={activeTab === 'projects'}
          >
            <span className="relative z-10">Proyectos</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'certificates' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('certificates')}
            aria-pressed={activeTab === 'certificates'}
          >
            <span className="relative z-10">Certificados</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
          </button>
          <button
            className={`group px-8 py-2 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${activeTab === 'techstack' ? 'bg-[#2d1b4d] text-white' : 'bg-[#2d1b4d]/40 text-gray-300'}`}
            onClick={() => setActiveTab('techstack')}
            aria-pressed={activeTab === 'techstack'}
          >
            <span className="relative z-10">Tech Stack</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
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