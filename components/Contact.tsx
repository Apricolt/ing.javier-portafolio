"use client";

const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-16" aria-label="Formulario de contacto">
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Contact Me
        </h2>
      </header>

      <article className="max-w-2xl mx-auto">
        <form className="space-y-6" aria-label="Formulario de contacto">
          <fieldset className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 resize-none"
                placeholder="Your message"
                required
              ></textarea>
            </div>
          </fieldset>

          <button
            type="submit"
            className="group w-full py-3 px-6 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white text-lg font-medium relative overflow-hidden transform hover:scale-105"
          >
            <span className="relative z-10">Send Message</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </article>
    </section>
  );
};

export default Contact; 