import { Link } from "react-router-dom";
import { crewNames } from "@/data/credits";

// Cierre de la Home: papel, Newsreader grande, título Microgramma y crew en Anton (ancla #crew).
export default function AboutSection() {
  return (
    <section id="about" className="surface-paper scroll-mt-20 px-5 md:px-12 py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="label text-muted-foreground mb-4">Sobre BADDER</div>
        <h2 className="f-micro text-[clamp(2rem,7vw,6.5rem)] leading-[0.95]">Quiénes somos</h2>

        <div className="mt-10 grid md:grid-cols-12 gap-x-12 gap-y-8">
          <p className="md:col-span-7 f-news text-[clamp(1.5rem,1rem+1.8vw,2.4rem)] leading-[1.2]">
            BADDER es un espacio creativo multidisciplinario de La Plata, nacido en 2024 alrededor de la música electrónica underground.
          </p>
          <p className="md:col-span-5 f-news italic text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] leading-snug self-end">
            Produce música, diseña gráfica e indumentaria, fotografía y filma eventos, y guarda todo eso en un archivo abierto.
          </p>
        </div>

        <div id="crew" className="scroll-mt-24 mt-16 pt-6 border-t-2 border-border grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="label">Crew y créditos</h3>
            <p className="mt-3 text-muted-foreground max-w-xs">Las personas que hicieron BADDER, pasado y presente.</p>
            <Link to="/contact#bookings" className="inline-flex items-center min-h-[44px] mt-3 label underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground">
              Conocé a los integrantes →
            </Link>
          </div>
          <ul className="md:col-span-8">
            {crewNames.map((name) => (
              <li key={name} className="border-b border-border">
                <span className="f-anton block text-[clamp(1.6rem,1rem+2.4vw,3rem)] leading-[1.15] py-1 px-1 transition-colors hover:bg-[hsl(var(--a))] hover:text-[hsl(var(--a-fg))]">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
