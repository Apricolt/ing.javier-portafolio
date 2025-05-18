"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

const hobbies = [
  {
    id: 1,
    title: "Mi Familia",
    description:"Es el pilar fundamental de mi vida. Amo pasar tiempo con las personas que quiero y que me apoyan en cada momento. Es una de mis prioridades, si no la más importante.",
    color: "from-pink-500 to-purple-600",
    details: [
      "Tiempo de calidad juntos",
      "Celebraciones familiares",
      "Crear recuerdos duraderos"
    ]
  },
  {
    id: 2,
    title: "Boxeo",
    description: "Este deporte me enseño que la verdadera derrota ocurre cuando no lo vuelves a intentar. Llegue a representar a mi departamento a nivel nacional y es algo de lo que me siento orgulloso.",
    color: "from-red-500 to-orange-600",
    details: [
      "Entrenamiento diario",
      "Desarrollo físico y mental",
      "Superación constante"
    ]
  },
  {
    id: 3,
    title: "Docencia",
    description: "Una de mis metas es ayudar a las demas personas y pienso que la mejor forma de hacerlo es compartiendo mis conocimientos, por eso me gusta enseñar desde mis propias experiencias.",
    color: "from-blue-500 to-cyan-600",
    details: [
      "Mentoría personalizada",
      "Desarrollo de habilidades",
      "Aprendizaje continuo"
    ]
  }
];

const NoCode = () => {
  const [activeHobby, setActiveHobby] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Mi Familia");

  const filteredHobbies = hobbies.filter(hobby => hobby.title === selectedCategory);

  return (
    <section className="container mx-auto px-4 py-16" aria-label="Pasatiempos">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mis Pasatiempos
        </h2>
        <p className="text-white text-lg mb-8">
          Aspectos que dan color y significado a mi vida
        </p>

        <div className="flex justify-center gap-4 mb-12">
          {hobbies.map((hobby) => (
            <button
              key={hobby.id}
              onClick={() => setSelectedCategory(hobby.title)}
              className={`group px-6 py-3 rounded-full text-lg font-semibold transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none relative overflow-hidden ${
                selectedCategory === hobby.title
                  ? 'bg-[#2d1b4d] text-white'
                  : 'bg-[#2d1b4d]/40 text-white'
              }`}
            >
              <span className="relative z-10">{hobby.title}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>
      </header>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-3xl">
          {filteredHobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setActiveHobby(hobby.id)}
              onHoverEnd={() => setActiveHobby(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
              
              <div className="relative bg-[#2d1b4d] rounded-2xl p-8 flex flex-col items-center justify-center text-center transform transition-all duration-300 group-hover:scale-105 min-h-[500px]">
                {hobby.title === "Mi Familia" && (
                  <div className="mb-6 w-full rounded-xl">
                    <img 
                      src="/CollageGFamilia.png" 
                      alt="Collage de mi familia" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {hobby.title === "Boxeo" && (
                  <div className="mb-6 w-full rounded-xl">
                    <img 
                      src="/Boxeo.png" 
                      alt="Imagen de boxeo" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {hobby.title === "Docencia" && (
                  <div className="mb-6 w-full rounded-xl">
                    <img 
                      src="/Docencia.jpeg" 
                      alt="Imagen de docencia" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                {hobby.title !== "Mi Familia" && (
                  <span className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  </span>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {hobby.title}
                </h3>
                
                <p className="text-white mb-6 font-semibold">
                  {hobby.description}
                </p>

                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeHobby === hobby.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-2">
                    {hobby.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        className="text-purple-300 text-sm"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        • {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoCode;