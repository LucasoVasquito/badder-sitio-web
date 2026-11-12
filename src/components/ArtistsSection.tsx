import { motion } from "framer-motion";
import { people } from "@/data/people";

// Personas vinculadas a BADDER. Sin fotos temporales ni links sin destino:
// se muestra el presskit cuando existe y solo los links cargados en src/data/people.ts.
export default function ArtistsSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="label text-muted-foreground mb-3">Crew y personas vinculadas</div>
        <h2 className="font-display text-title mb-12">Integrantes</h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border-2 border-border">
          {people.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-6 flex flex-col gap-4"
            >
                            <h3 className="font-display text-h2">{p.name}</h3>
              <p className="label text-muted-foreground leading-relaxed">{p.roles}</p>

              {p.presskit && (
                <a href={p.presskit.url} target="_blank" rel="noopener noreferrer" className="group mt-2 block">
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img src={p.presskit.cover} alt={`Presskit de ${p.name}`} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                  <span className="mt-3 inline-flex items-center min-h-[44px] label underline underline-offset-4 decoration-2 group-hover:bg-accent">
                    Presskit (PDF) ↗
                  </span>
                </a>
              )}

              {p.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-auto pt-2">
                  {p.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center min-h-[44px] underline underline-offset-4 decoration-2 hover:bg-accent">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
