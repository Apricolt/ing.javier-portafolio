"use client";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Contact Me
      </h2>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[#2d1b4d] text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors text-white text-lg font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 