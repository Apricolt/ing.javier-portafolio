import { Urbanist } from "next/font/google";
import CoverParticles from "../../components/cover-particles"

export default function Home() {
  return (
    <main className={`font-Poppins`}>
      <span className="flex min-h-[100vh] h-full bg-no-repeat bg-gradient-cover">
        <CoverParticles />
        <p className="text-jacarta-500">Hola soy Javier</p>
      </span>
    </main>
  );
}


