import { motion } from "framer-motion";

// 1. Agregamos "master" y "edition" como datos OPCIONALES en los videos
const videos = [
  { 
    id: 1, 
    title: "Badder Inverview: Lucas Ferro X Luis Zerillo", 
    date: "2024.09", 
    duration: "21:37", 
    thumb: "https://img.youtube.com/vi/iHym3gylzV0/0.jpg",
    url: "https://www.youtube.com/watch?v=iHym3gylzV0&t=92s",
    edition: "Agustin Galeazzi - Uriel Galeano - Lucas Nicolas Bengochea" // Este solo tiene edición
  },
  { 
    id: 2, 
    title: "Badder Showcase @anguis._", 
    date: "2025.03", 
    duration: "1:27:04", 
    thumb: "https://img.youtube.com/vi/3ahzMf9fGlQ/0.jpg",
    url: "https://www.youtube.com/watch?v=3ahzMf9fGlQ&t=2103s", 
    master: "Uriel Galeano - Francisco Anguis", // Este tiene los dos
    edition: "Lucas Nicolas Bengochea"
  },
  { 
    id: 3, 
    title: "Badder Showcase - Juanma Daguerre", 
    date: "2025.03", 
    duration: "1:47:02", 
    thumb: "https://img.youtube.com/vi/nMTN10KK_iA/0.jpg",
    url: "https://www.youtube.com/watch?v=nMTN10KK_iA", 
    master: "Uriel Galeano - Francisco Anguis", // Este tiene los dos
    edition: "Lucas Nicolas Bengochea" 
  },
  { 
    id: 4, 
    title: "Badder Showcase - Uriel Galeano", 
    date: "2025.03", 
    duration: "1:18:52", 
    thumb: "https://img.youtube.com/vi/zaPx9fMtTBs/0.jpg",
    url: "https://www.youtube.com/watch?v=zaPx9fMtTBs", 
    master: "Uriel Galeano - Francisco Anguis", // Este tiene los dos
    edition: "Lucas Nicolas Bengochea" 
  },
  { 
    id: 5, 
    title: "Anguis & Juani Pollini | EMERGENT X BADDER", 
    date: "2025.03", 
    duration: "1:34:35", 
    thumb: "https://img.youtube.com/vi/agPtIpnsQnI/0.jpg",
    url: "https://www.youtube.com/watch?v=agPtIpnsQnI", 
    master: "Uriel Galeano - Francisco Anguis", // Este tiene los dos
    edition: "Lucas Nicolas Bengochea" 
  },
  { 
    id: 6, 
    title: "Uriel Galeano | EMERGENT X BADDER", 
    date: "2025.03", 
    duration: "1:28:01", 
    thumb: "https://img.youtube.com/vi/O1OO_UqMUQA/0.jpg",
    url: "https://www.youtube.com/watch?v=O1OO_UqMUQA&t=5111s", 
    master: "Uriel Galeano - Francisco Anguis", // Este tiene los dos
    edition: "Lucas Nicolas Bengochea"
  },
];

export default function VideoSection() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono-tight text-muted-foreground mb-2">Videos</div>
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-serif text-5xl md:text-7xl text-foreground">
              Archivo de Video
            </h2>
            <span className="font-mono-tight text-muted-foreground hidden md:block">
              {String(videos.length).padStart(2, "0")} ENTRIES
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {videos.map((v, i) => (
            <motion.a
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative cursor-pointer border border-border overflow-hidden flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={v.thumb}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Play button overlay */}
              <div className="absolute top-0 left-0 right-0 aspect-video flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 border border-foreground/60 rounded-full" />
                  <div className="absolute inset-2 border border-foreground/40 rounded-full" />
                  <div className="absolute inset-4 border border-foreground/20 rounded-full" />
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-foreground ml-1" />
                </div>
              </div>

              {/* Info Container */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                
                {/* Bloque Superior: Titulo, Fecha y Duración */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold tracking-wider text-foreground">{v.title}</div>
                    <div className="font-mono-tight text-muted-foreground mt-1">{v.date}</div>
                  </div>
                  <div className="font-mono-tight text-muted-foreground shrink-0">{v.duration}</div>
                </div>

                {/* Bloque Inferior: Créditos (Renderizado Condicional) */}
                {(v.master || v.edition) && (
                  <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-1">
                    {v.master && (
                      <div className="font-mono-tight text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                        Master: <span className="text-foreground">{v.master}</span>
                      </div>
                    )}
                    {v.edition && (
                      <div className="font-mono-tight text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
                        Edición: <span className="text-foreground">{v.edition}</span>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}