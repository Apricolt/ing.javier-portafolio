import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Approach />
        <Projects />
        <Certifications />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
