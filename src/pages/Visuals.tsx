import { motion } from "framer-motion";
import { videos, motionProjects } from "@/data/visuals";
export default function Visuals() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-5 md:px-12 wrap">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-border pb-16"
        >
          <div className="label text-muted-foreground tracking-widest uppercase mb-4 text-xs">
            Portfolio Audiovisual / Dirección de Arte
          </div>
          <h1 className="font-cyberpunks text-5xl md:text-8xl text-foreground tracking-wider leading-none">
            Visuals
          </h1>
        </motion.div>

        {/* SECCIÓN 1: ARCHIVO DE VIDEO */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Archivo de Video</h2>
            <span className="label text-muted-foreground hidden md:block">
              {String(videos.length).padStart(2, "0")} ENTRIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {videos.map((v, i) => (
              <motion.a
                href={v.url} target="_blank" rel="noopener noreferrer" key={v.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group relative cursor-pointer border border-border overflow-hidden flex flex-col"
              >
                <div className="aspect-video overflow-hidden bg-secondary">
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-70 transition-all duration-500" />
                </div>

                <div className="absolute top-0 left-0 right-0 aspect-video flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/60 rounded-full" />
                    <div className="absolute inset-2 border border-white/40 rounded-full" />
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
                  </div>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold tracking-wider text-foreground">{v.title}</div>
                      <div className="label text-muted-foreground mt-1">{v.date}</div>
                    </div>
                    <div className="label text-muted-foreground shrink-0">{v.duration}</div>
                  </div>
                  {(v.master || v.edition) && (
                    <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-1">
                      {v.master && <div className="label text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Master: <span className="text-foreground">{v.master}</span></div>}
                      {v.edition && <div className="label text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Edición: <span className="text-foreground">{v.edition}</span></div>}
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: MOTION & DIRECCIÓN DE ARTE (Diseño Editorial) */}
        <section>
          <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Motion</h2>
            <span className="label text-muted-foreground hidden md:block">
              {String(motionProjects.length).padStart(2, "0")} PIECES
            </span>
          </div>

          <div className="flex flex-col gap-24">
            {motionProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="grid md:grid-cols-12 gap-8 items-center"
              >
                {/* Media / Cover */}
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="md:col-span-7 group block relative overflow-hidden bg-secondary border border-border">
                  <div className="aspect-[4/5] sm:aspect-video md:aspect-[4/5] lg:aspect-video w-full">
                    <img src={p.thumb} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="w-16 h-16 flex items-center justify-center border border-white/50 rounded-full bg-secondary/40 ">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
                    </div>
                  </div>
                </a>

                {/* Contexto y Descripción (Look Editorial) */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="label text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                    {p.date} — {p.context}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight tracking-wide">
                    {p.title}
                  </h3>
                  <div className="w-8 h-px bg-foreground mb-6" />
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
                    {p.desc}
                  </p>
                  <div className="label text-[10px] tracking-[0.15em] text-foreground uppercase">
                    <span className="text-muted-foreground">Dir. de Arte / Motion:</span> <br />
                    {p.designer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}