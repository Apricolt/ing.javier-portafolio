"use client";

const NoCode = () => {
  return (
    <section className="container mx-auto px-4 py-16" aria-label="Proyectos No Code">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          No Code Projects
        </h2>
      </header>

      <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Aquí irán los proyectos no code */}
        <p className="text-gray-300 text-center col-span-full">Proyectos No Code próximamente...</p>
      </article>
    </section>
  );
};

export default NoCode; 