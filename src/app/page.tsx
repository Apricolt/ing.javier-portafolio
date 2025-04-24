import CoverParticles from "../../components/cover-particles"
import LoadingScreen from "../../components/LoadingScreen";

export default function Home() {
  return (
    <main className={`font-Poppins`}>
      <span className="flex min-h-[100vh] h-full bg-no-repeat bg-gradient-cover">
        <LoadingScreen/>
        <CoverParticles />
        <p className="text-jacarta-500">Hola soy Javier</p>
      </span>
    </main>
  );
}


