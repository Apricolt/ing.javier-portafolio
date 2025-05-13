"use client";

import { useState } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('#welcome');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#welcome', label: 'Bienvenido' },
    { href: '#about', label: 'Sobre mi' },
    { href: '#portfolio', label: 'Portafolio' },
    { href: '#nocode', label: 'Pasatiempos' },
    { href: '#experience', label: 'Experiencia' },
    { href: '#contact', label: 'Contacto' }
  ];

  const handleClick = (href: string) => {
    setActiveSection(href);
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <button
      onClick={() => handleClick(href)}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-out
        ${activeSection === href 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
        }
        group
      `}
    >
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#46367C] to-[#4A2FBD] transform origin-left transition-transform duration-300 ease-out
        ${activeSection === href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
      `}/>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-[#17072B]/80 border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-white">
            &lt;JAVORD/&gt;
          </div>

          {/* Botón de menú móvil */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-[#4A2FBD] transition-colors duration-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menú desktop */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar móvil */}
      <div
        className={`fixed top-20 right-0 h-[calc(100vh-5rem)] w-72 backdrop-blur-md bg-[#17072B] transform transition-all duration-300 ease-in-out lg:hidden border-l border-white/10
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Links del sidebar */}
          <div className="flex-1 px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.href} className="group">
                  <button
                    onClick={() => handleClick(item.href)}
                    className={`relative block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 
                      ${activeSection === item.href 
                        ? 'text-white' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <span className="relative z-10 text-sm font-medium">{item.label}</span>
                    {activeSection === item.href && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#46367C] to-[#4A2FBD] rounded-l-lg" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer del sidebar */}
          <div className="p-6 border-t border-white/10">
            <div className="text-center text-sm text-white">
              <span className="font-medium">
                Developed by JAVORD
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 