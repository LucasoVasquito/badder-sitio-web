import { motion } from "framer-motion";

// Módulos de acceso participativo
const communityLinks = [
  { id: "01", title: "Discord Server", desc: "Nuestro foro principal. Discusiones de producción, fechas, visuales y feedback en tiempo real de la crew.", label: "ONLINE", link: "#" },
  { id: "02", title: "Telegram Channel", desc: "Anuncios directos, coordenadas de locaciones secretas y acceso anticipado a drops de indumentaria.", label: "INVITE ONLY", link: "#" },
  { id: "03", title: "Demo Drop", desc: "Buzón siempre abierto. Escuchamos material nuevo para futuros lanzamientos, showcases o podcasts.", label: "SUBMIT", link: "#" },
  { id: "04", title: "Recursos & Samples", desc: "Sample packs, drum kits, presets y assets visuales de código abierto creados por el colectivo.", label: "ARCHIVE", link: "#" },
  { id: "05", title: "Curaduría / Playlists", desc: "Nuestra selección musical actualizada periódicamente. Lo que suena en el estudio y en la pista.", label: "SPOTIFY", link: "#" },
  { id: "06", title: "Convocatorias", desc: "Búsqueda activa de VJs, fotógrafos, realizadores y artistas visuales para colaboraciones futuras.", label: "OPEN", link: "#" },
];

export default function Community() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-border pb-16"
        >
          <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
            Network / Participatory Space
          </div>
          <h1 className="font-microgramma font-bold text-5xl md:text-8xl text-foreground tracking-wider leading-none mb-8">
            Community
          </h1>
          <p className="font-mono text-sm text-muted-foreground max-w-xl leading-relaxed">
            Badder no es solo una marca o un sello. Es una red en movimiento.
            Este es nuestro espacio de conexión directa. Sin algoritmos corporativos, solo intercambio de ideas, música y cultura visual.
          </p>
        </motion.div>

        {/* GRILLA DE ACCESOS (Estilo Directorio/Terminal) */}
        <div className="flex flex-col gap-4">
          {communityLinks.map((item, i) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group block border border-border p-6 md:p-8 hover:bg-foreground hover:text-background transition-colors duration-500 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-6">
                  <span className="font-mono-tight text-muted-foreground group-hover:text-background/50 transition-colors">
                    {item.id}
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl tracking-wide mb-2 group-hover:scale-[1.02] origin-left transition-transform duration-300">
                      {item.title}
                    </h2>
                    <p className="font-mono text-xs text-muted-foreground group-hover:text-background/80 transition-colors max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="md:text-right shrink-0">
                  <span className="inline-block border border-foreground/30 px-3 py-1 font-mono-tight text-[10px] tracking-[0.2em] uppercase group-hover:border-background/50 group-hover:text-background transition-colors">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </main>
  );
}