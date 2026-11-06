import { motion } from "framer-motion";

// Datos de los presskits originales
const presskits = [
  {
    id: 1,
    name: "URIEL GALEANO",
    designers: "Lucas Nicolas Bengochea - Juan Francisco Arias",
    image: "/presskits/presskit (1).png", 
    url: "https://drive.google.com/file/d/1SCTdv-7YGYAFckJc21scFGeyBDY76tOD/view?usp=sharing" 
  },
  {
    id: 2,
    name: "ANGUIS",
    designers: "Lucas Nicolas Bengochea - Juan Francisco Arias", 
    image: "/presskits/presskit (2).png", 
    url: "https://drive.google.com/file/d/1x8DdAEzGIS2ElfPxVNBsAjF8FBRKWlxe/view?usp=sharing" 
  }
];

export default function PresskitsSection() {
  return (
    <section className="py-32 px-6 md:px-16 wavy-grid relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="font-mono-tight text-muted-foreground mb-2">BOOKINGS / INFO</div>
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-foreground uppercase tracking-wide"
          >
            Presskits
          </motion.h2>
        </div>

        {/* Grilla dividida en 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          {presskits.map((p, i) => (
            <motion.a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block cursor-pointer flex flex-col"
            >
              {/* Nombre del artista */}
              <div className="mb-4 border-b border-border pb-4 flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-bold tracking-wider text-foreground uppercase">
                  {p.name}
                </h3>
                <span className="font-mono-tight text-muted-foreground text-xs tracking-widest uppercase hidden md:block">
                  PDF / INFO
                </span>
              </div>

              {/* Contenedor de la foto de previsualización */}
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-border relative">
                <img
                  src={p.image}
                  alt={`Presskit ${p.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay mágico al hacer hover */}
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-mono-tight border border-foreground px-8 py-3 bg-background text-foreground tracking-widest text-sm uppercase">
                    Abrir Documento
                  </span>
                </div>
              </div>

              {/* Nombre de los diseñadores */}
              <div className="mt-6 text-center w-full border-t border-foreground/20 pt-4">
                <p className="font-mono-tight text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  {p.designers}
                </p>
              </div>

            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}