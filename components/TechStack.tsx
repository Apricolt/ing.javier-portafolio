"use client";

const techStack = {
  languages: [
    { name: "Python", icon: "python.svg" },
    { name: "HTML", icon: "html5.svg" },
    { name: "CSS", icon: "css3.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "Java", icon: "java.svg" },
    { name: "SQL", icon: "sql.svg" }
  ],
  frameworks: [
    { name: "Django", icon: "django.svg" },
    { name: "Next.js", icon: "nextjs.svg" },
    { name: "Tailwind CSS", icon: "tailwind.svg" },
    { name: "Spring", icon: "spring.svg" }
  ],
  tools: [
    { name: "VS Code", icon: "vscode.svg" },
    { name: "Postman", icon: "postman.svg" },
    { name: "PostgreSQL", icon: "postgresql.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "GitHub", icon: "github.svg" },
    { name: "AWS", icon: "icons8-aws.svg" },
    { name: "Vercel", icon: "Vercel_favicon.svg" },
    { name: "Figma", icon: "icons8-figma.svg" }
  ]
};

const TechStack = () => {
  return (
    <section className="max-w-4xl mx-auto" aria-labelledby="techstack-heading">
      <h3 id="techstack-heading" className="sr-only">Stack tecnológico</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Lenguajes */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl transition-all duration-500 md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
          <header className="text-center mb-4 md:mb-8">
            <h4 className="text-xl md:text-2xl font-bold text-white">Lenguajes</h4>
          </header>
          <ul className="grid grid-cols-3 md:grid-cols-2 gap-3 md:gap-6 list-none">
            {techStack.languages.map((tech) => (
              <li key={tech.name}>
                <figure className="flex flex-col items-center p-2 md:p-4 md:hover:bg-[#3d2b5d] active:bg-[#3d2b5d] rounded-lg transition-all duration-300">
                  <img
                    src={`/icons/${tech.icon}`}
                    alt=""
                    className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                    aria-hidden="true"
                  />
                  <figcaption className="text-xs md:text-base text-gray-300 text-center">{tech.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </article>

        {/* Frameworks */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl transition-all duration-500 md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
          <header className="text-center mb-4 md:mb-8">
            <h4 className="text-xl md:text-2xl font-bold text-white">Frameworks</h4>
          </header>
          <ul className="grid grid-cols-2 gap-3 md:gap-6 list-none">
            {techStack.frameworks.map((tech) => (
              <li key={tech.name}>
                <figure className="flex flex-col items-center p-2 md:p-4 md:hover:bg-[#3d2b5d] active:bg-[#3d2b5d] rounded-lg transition-all duration-300">
                  <img
                    src={`/icons/${tech.icon}`}
                    alt=""
                    className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                    aria-hidden="true"
                  />
                  <figcaption className="text-xs md:text-base text-gray-300 text-center">{tech.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </article>

        {/* Herramientas */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl transition-all duration-500 md:hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
          <header className="text-center mb-4 md:mb-8">
            <h4 className="text-xl md:text-2xl font-bold text-white">Herramientas</h4>
          </header>
          <ul className="grid grid-cols-3 md:grid-cols-2 gap-3 md:gap-6 list-none">
            {techStack.tools.map((tech) => (
              <li key={tech.name}>
                <figure className="flex flex-col items-center p-2 md:p-4 md:hover:bg-[#3d2b5d] active:bg-[#3d2b5d] rounded-lg transition-all duration-300">
                  <img
                    src={`/icons/${tech.icon}`}
                    alt=""
                    className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                    aria-hidden="true"
                  />
                  <figcaption className="text-xs md:text-base text-gray-300 text-center">{tech.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default TechStack;
