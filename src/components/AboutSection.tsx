import { Link } from "react-router-dom";
import { crewNames } from "@/data/credits";

// Cierre de la Home: qué es BADDER, en concreto, + créditos de la crew (ancla #crew).
export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 px-5 md:px-12 pt-20 md:pt-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-8 pt-4 border-t-2 border-border">
          <div className="md:col-span-4">
            <div className="label text-muted-foreground mb-2">Sobre BADDER</div>
            <h2 className="font-display text-title">Quiénes somos</h2>
          </div>
          <div className="md:col-span-8 grid md:grid-cols-2 gap-x-10 gap-y-5">
            <p className="reading font-serif">
              BADDER es un espacio creativo multidisciplinario de La Plata, nacido en 2024 alrededor de la música electrónica underground.
            </p>
            <p className="reading font-serif">
              Produce música, diseña gráfica e indumentaria, fotografía y filma eventos, y guarda todo eso en un archivo abierto.
            </p>
          </div>
        </div>

        <div id="crew" className="scroll-mt-24 mt-14 pt-4 border-t border-border grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="label">Crew y créditos</h3>
            <p className="mt-3 text-muted-foreground max-w-xs">Las personas que hicieron BADDER, pasado y presente.</p>
            <Link to="/contact#bookings" className="inline-flex items-center min-h-[44px] mt-3 label underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground">
              Conocé a los integrantes →
            </Link>
          </div>
          <ul className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 content-start">
            {crewNames.map((name) => (
              <li key={name} className="label text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
