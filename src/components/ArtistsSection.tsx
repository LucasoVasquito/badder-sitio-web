import { motion } from "framer-motion";
import { people } from "@/data/people";

// Personas vinculadas a BADDER. Sin fotos temporales ni links sin destino:
// se muestra el presskit cuando existe y solo los links cargados en src/data/people.ts.
export default function ArtistsSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-12">
      <div className="wrap">
        <div className="label text-muted-foreground mb-3">Crew / Personas vinculadas</div>
        <h2 className="font-display text-4xl md:text-6xl text-foreground leading-[0.95] tracking-tight mb-12">Integrantes</h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {people.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-6 flex flex-col gap-4"
            >
              <div className="label text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="font-display text-2xl text-foreground leading-tight">{p.name}</h3>
              <p className="label text-muted-foreground leading-relaxed">{p.roles}</p>

              {p.presskit && (
                <a href={p.presskit.url} target="_blank" rel="noopener noreferrer" className="group mt-2 block">
                  <div className="aspect-[4/5] overflow-hidden border border-border bg-secondary">
                    <img src={p.presskit.cover} alt={`Presskit de ${p.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <span className="mt-3 inline-block label text-foreground border-b border-foreground/40 pb-1 group-hover:border-foreground">
                    Presskit (PDF) ↗
                  </span>
                </a>
              )}

              {p.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-auto pt-2">
                  {p.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="label text-muted-foreground hover:text-foreground">
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
