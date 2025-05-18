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
    { name: "GitHub", icon: "github.svg" }
  ]
};

const TechStack = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Lenguajes */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl shadow-lg">
          <header className="text-center mb-4 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Lenguajes</h3>
          </header>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-3 md:gap-6">
            {techStack.languages.map((tech) => (
              <figure
                key={tech.name}
                className="flex flex-col items-center p-2 md:p-4 hover:bg-[#3d2b5d] rounded-lg transition-all duration-300"
              >
                <img
                  src={`/icons/${tech.icon}`}
                  alt={tech.name}
                  className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                />
                <figcaption className="text-xs md:text-base text-gray-300 font-medium text-center">{tech.name}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        {/* Frameworks */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl shadow-lg">
          <header className="text-center mb-4 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Frameworks</h3>
          </header>
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {techStack.frameworks.map((tech) => (
              <figure
                key={tech.name}
                className="flex flex-col items-center p-2 md:p-4 hover:bg-[#3d2b5d] rounded-lg transition-all duration-300"
              >
                <img
                  src={`/icons/${tech.icon}`}
                  alt={tech.name}
                  className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                />
                <figcaption className="text-xs md:text-base text-gray-300 font-medium text-center">{tech.name}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        {/* Herramientas */}
        <article className="bg-[#2d1b4d] p-4 md:p-8 rounded-xl shadow-lg">
          <header className="text-center mb-4 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Herramientas</h3>
          </header>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-3 md:gap-6">
            {techStack.tools.map((tech) => (
              <figure
                key={tech.name}
                className="flex flex-col items-center p-2 md:p-4 hover:bg-[#3d2b5d] rounded-lg transition-all duration-300"
              >
                <img
                  src={`/icons/${tech.icon}`}
                  alt={tech.name}
                  className="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-3"
                />
                <figcaption className="text-xs md:text-base text-gray-300 font-medium text-center">{tech.name}</figcaption>
              </figure>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default TechStack;
