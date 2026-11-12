import { motion } from "framer-motion";
import { crewNames as names } from "@/data/credits";



export default function CreditsSection() {
  return (
    <section className="py-32 px-5 md:px-12 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-serif text-6xl md:text-8xl tracking-tight text-foreground mb-6">
          Créditos
        </h2>
        <p className="label text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
          Un archivo de los operativos, creativos, amigos y conocidos que forjaron la experiencia Badder. Pasado y presente. Este es nuestro registro. <br /> Muchas Gracias.
        </p>
      </motion.div>

      <div className="mt-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6">
          {names.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.5 }}
              className="font-mono text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
