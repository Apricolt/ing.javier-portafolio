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
    <section className="container mx-auto px-4 py-16" aria-labelledby="hobbies-heading">
      <header className="text-center mb-16">
        <h2 id="hobbies-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mis Pasatiempos
        </h2>
        <p className="text-white text-lg mb-8">
          Aspectos que dan color y significado a mi vida
        </p>

        <nav className="flex justify-center gap-4 mb-12" aria-label="Categorías de pasatiempos">
          {hobbies.map((hobby) => (
            <button
              key={hobby.id}
              onClick={() => setSelectedCategory(hobby.title)}
              className={`group px-6 py-3 rounded-full text-lg font-medium transition-all duration-500 ease-in-out transform md:hover:scale-105 active:scale-105 focus:outline-none relative overflow-hidden ${
                selectedCategory === hobby.title
                  ? 'bg-[#2d1b4d] text-white'
                  : 'bg-[#2d1b4d]/40 text-white'
              }`}
              aria-pressed={selectedCategory === hobby.title}
            >
              <span className="relative z-10">{hobby.title}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true"></span>
            </button>
          ))}
        </nav>
      </header>

      <main className="flex justify-center items-center">
        <section className="w-full max-w-3xl" aria-labelledby={`${selectedCategory.toLowerCase().replace(' ', '-')}-heading`}>
          {filteredHobbies.map((hobby) => (
            <motion.article
              key={hobby.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setActiveHobby(hobby.id)}
              onHoverEnd={() => setActiveHobby(null)}
            >
              <div className="bg-[#2d1b4d] rounded-2xl p-20 flex flex-col items-center justify-center text-center  transform transition-all duration-500 md:group-hover:scale-105 group-active:scale-105 min-h-[500px] md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                {hobby.title === "Mi Familia" && (
                  <figure className="mb-6 w-full rounded-xl">
                    <img 
                      src="/CollageGFamilia.png" 
                      alt="Collage familiar mostrando momentos especiales" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 md:group-hover:scale-105 group-active:scale-105"
                    />
                  </figure>
                )}
                {hobby.title === "Boxeo" && (
                  <figure className="mb-6 w-full rounded-xl">
                    <img 
                      src="/Boxeo.png" 
                      alt="Imagen relacionada con el boxeo" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 md:group-hover:scale-105 group-active:scale-105"
                    />
                  </figure>
                )}
                {hobby.title === "Docencia" && (
                  <figure className="mb-6 w-full rounded-xl">
                    <img 
                      src="/Docencia.jpeg" 
                      alt="Imagen relacionada con la docencia" 
                      className="mx-auto w-full object-contain max-h-96 transition-transform duration-300 md:group-hover:scale-105 group-active:scale-105"
                    />
                  </figure>
                )}
                
                <h3 id={`${hobby.title.toLowerCase().replace(' ', '-')}-heading`} className="text-2xl font-bold text-white mb-4">
                  {hobby.title}
                </h3>
                
                <p className="text-white mb-6">
                  {hobby.description}
                </p>

                <motion.aside
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeHobby === hobby.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-label="Detalles adicionales"
                >
                  <ul className="space-y-2 list-none">
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
                </motion.aside>

                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 md:group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              </div>
            </motion.article>
          ))}
        </section>
      </main>
    </section>
  );
};

export default NoCode;