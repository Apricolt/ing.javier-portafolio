"use client";
import Link from 'next/link';
import Image from "next/image";
import { motion } from "framer-motion";

const Welcome = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4">
      <article className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Lado izquierdo - Título y redes sociales */}
        <motion.div 
          className="flex flex-col space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <div>
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.7 }}
            >
              Ingeniero de<br />Software
            </motion.h1>
          </div>
          
          <motion.div 
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.2 }}
          >
            <Link 
              href="https://github.com" 
              target="_blank"
              aria-label="GitHub"
              className="text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            >
              <svg
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="transition-transform duration-300"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>

            <Link 
              href="https://www.linkedin.com" 
              target="_blank"
              aria-label="LinkedIn"
              className="text-white hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
            >
              <svg 
                width="48"
                height="48"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="transition-transform duration-300"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Lado derecho - Imagen */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full overflow-hidden shadow-2xl">
            <Image 
              src="/Foto.jpeg" 
              alt="Foto de perfil" 
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full transition-transform duration-500 hover:scale-110"
              priority
            />
          </div>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.8 }}
          >
            Javier Alejandro Ordoñez Sapuyes
          </motion.h2>
        </motion.div>
      </article>
    </section>
  );
};

export default Welcome;