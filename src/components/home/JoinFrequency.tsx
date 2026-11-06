import { motion } from "framer-motion";
import { contact } from "@/data/site";

const disciplines = ["Artistas", "DJs", "Productores", "Diseñadores", "Fotógrafos", "Realizadores", "Cultura de club"];

// Solo vías de contacto que funcionan hoy: Instagram y mail.
export default function JoinFrequency() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
      >
        <div className="md:col-span-7">
          <div className="font-mono-tight text-muted-foreground mb-3">
            <span className="text-cobalt">07</span> — Community
          </div>
          <h2 className="font-serif text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight text-foreground">
            Join the
            <br />
            frequency
          </h2>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md">
            BADDER se arma con la gente que lo hace. Si producís, pinchás, diseñás, sacás fotos, filmás o simplemente vivís la pista, escribinos: mostranos lo que hacés.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d} className="font-mono-tight text-muted-foreground border border-border px-2 py-1">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 flex flex-col">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between border-t border-b border-border py-5 hover:bg-foreground hover:text-background transition-colors px-2"
          >
            <span>
              <span className="block font-mono-tight text-muted-foreground group-hover:text-background/60">Instagram / DM</span>
              <span className="font-serif text-2xl">{contact.instagramHandle}</span>
            </span>
            <span aria-hidden className="font-mono-tight">↗</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center justify-between border-b border-border py-5 hover:bg-foreground hover:text-background transition-colors px-2"
          >
            <span className="min-w-0">
              <span className="block font-mono-tight text-muted-foreground group-hover:text-background/60">Mail</span>
              <span className="font-serif text-xl md:text-2xl break-all">{contact.email}</span>
            </span>
            <span aria-hidden className="font-mono-tight">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
