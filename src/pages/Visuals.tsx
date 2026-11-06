import { motion } from "framer-motion";

// 1. ARCHIVO DE VIDEO COMPLETO (reutilizado)
const videos = [
  { id: 1, title: "Badder Inverview: Lucas Ferro X Luis Zerillo", date: "2024.09", duration: "21:37", thumb: "https://img.youtube.com/vi/iHym3gylzV0/0.jpg", url: "https://www.youtube.com/watch?v=iHym3gylzV0&t=92s", edition: "Agustin Galeazzi - Uriel Galeano - Lucas Nicolas Bengochea" },
  { id: 2, title: "Badder Showcase @anguis._", date: "2025.03", duration: "1:27:04", thumb: "https://img.youtube.com/vi/3ahzMf9fGlQ/0.jpg", url: "https://www.youtube.com/watch?v=3ahzMf9fGlQ&t=2103s", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 3, title: "Badder Showcase - Juanma Daguerre", date: "2025.03", duration: "1:47:02", thumb: "https://img.youtube.com/vi/nMTN10KK_iA/0.jpg", url: "https://www.youtube.com/watch?v=nMTN10KK_iA", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 4, title: "Badder Showcase - Uriel Galeano", date: "2025.03", duration: "1:18:52", thumb: "https://img.youtube.com/vi/zaPx9fMtTBs/0.jpg", url: "https://www.youtube.com/watch?v=zaPx9fMtTBs", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 5, title: "Anguis & Juani Pollini | EMERGENT X BADDER", date: "2025.03", duration: "1:34:35", thumb: "https://img.youtube.com/vi/agPtIpnsQnI/0.jpg", url: "https://www.youtube.com/watch?v=agPtIpnsQnI", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
  { id: 6, title: "Uriel Galeano | EMERGENT X BADDER", date: "2025.03", duration: "1:28:01", thumb: "https://img.youtube.com/vi/O1OO_UqMUQA/0.jpg", url: "https://www.youtube.com/watch?v=O1OO_UqMUQA&t=5111s", master: "Uriel Galeano - Francisco Anguis", edition: "Lucas Nicolas Bengochea" },
];

// 2. MOTION FLYERS (Extraídos desde FlyerSection)
const motionProjects = [
  { id: 1, title: "BADDER SHOWCASE - TOM", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/u4OHM6iSZHc/maxresdefault.jpg", link: "https://www.youtube.com/shorts/u4OHM6iSZHc", desc: "Pieza promocional audiovisual para el evento.", context: "Campaña IG Reels / TikTok" },
  { id: 3, title: "EMERGENT X BADDER", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/hDdVop4HASI/maxresdefault.jpg", link: "https://www.youtube.com/shorts/hDdVop4HASI", desc: "Teaser conceptual formato vertical.", context: "Archivo RRSS" },
  { id: 5, title: "BOOTLEG SESSION PROMO", designer: "Nahuel Matias Bengochea - Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/vspTa2EnaMk/maxresdefault.jpg", link: "https://www.youtube.com/shorts/vspTa2EnaMk", desc: "Motion flyer promocionando el segundo drop.", context: "Lanzamiento indumentaria" },
  { id: 7, title: "ROSSET CLUB", designer: "Lucas Nicolas Bengochea", date: "2025", thumb: "https://img.youtube.com/vi/5J9-T1h2cMA/maxresdefault.jpg", link: "https://www.youtube.com/shorts/5J9-T1h2cMA", desc: "Promoción oficial fecha Rosset.", context: "Campaña digital" },
  { id: 12, title: "YOU LOOK AT ME (ORIGINAL MIX) VISUAL CONCEPT", designer: "Lucas Nicolas Bengochea", date: "2024", thumb: "https://img.youtube.com/vi/DpxjA5v0SuM/maxresdefault.jpg", link: "https://www.youtube.com/watch?v=DpxjA5v0SuM", desc: "Concepto visual inmersivo acompañando el track original.", context: "YouTube Visualizer" },
];

export default function Visuals() {
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
            <span className="font-mono-tight text-muted-foreground hidden md:block">
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
                <div className="aspect-video overflow-hidden bg-black">
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
                      <div className="font-mono-tight text-muted-foreground mt-1">{v.date}</div>
                    </div>
                    <div className="font-mono-tight text-muted-foreground shrink-0">{v.duration}</div>
                  </div>
                  {(v.master || v.edition) && (
                    <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-1">
                      {v.master && <div className="font-mono-tight text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Master: <span className="text-foreground">{v.master}</span></div>}
                      {v.edition && <div className="font-mono-tight text-[10px] tracking-[0.1em] uppercase text-muted-foreground">Edición: <span className="text-foreground">{v.edition}</span></div>}
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
            <span className="font-mono-tight text-muted-foreground hidden md:block">
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
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="md:col-span-7 group block relative overflow-hidden bg-black border border-border">
                  <div className="aspect-[4/5] sm:aspect-video md:aspect-[4/5] lg:aspect-video w-full">
                    <img src={p.thumb} alt={p.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="w-16 h-16 flex items-center justify-center border border-white/50 rounded-full bg-black/40 backdrop-blur-md">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-white ml-1" />
                    </div>
                  </div>
                </a>

                {/* Contexto y Descripción (Look Editorial) */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <div className="font-mono-tight text-xs tracking-[0.2em] text-muted-foreground mb-4 uppercase">
                    {p.date} — {p.context}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6 leading-tight uppercase tracking-wide">
                    {p.title}
                  </h3>
                  <div className="w-8 h-px bg-foreground mb-6" />
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
                    {p.desc}
                  </p>
                  <div className="font-mono-tight text-[10px] tracking-[0.15em] text-foreground uppercase">
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