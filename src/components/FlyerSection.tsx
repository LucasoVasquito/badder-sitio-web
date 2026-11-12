import { motion } from "framer-motion";
const flyers = [
  { 
    id: 2, 
    title: "BADDER SHOWCASE - TOM", 
    designer: "Lucas Nicolas Bengochea",  
    date: "2024", 
    type: "STATIC", // Le ponemos STATIC a los flyers comunes
    thumb: "/flyers/foto 1.webp", 
    link: "/flyers/foto 1.webp" // Si es estático, que el link abra la imagen en grande
  },
  { 
    id: 4, 
    title: "EMERGENT X BADDER",
    designer: "Lucas Nicolas Bengochea",  
    date: "2024", 
    type: "STATIC", 
    thumb: "/flyers/foto 2.webp", 
    link: "/flyers/foto 2.webp" 
  },
  { 
    id: 6, 
    title: "LEVELS",
    designer: "Lucas Nicolas Bengochea",  
    date: "2025", 
    type: "STATIC", 
    thumb: "/flyers/foto 3.webp", 
    link: "/flyers/foto 3.webp" 
  },
  { 
    id: 8, 
    title: "ROSSET CLUB",
    designer: "Lucas Nicolas Bengochea", 
    date: "2025", 
    type: "STATIC", 
    thumb: "/flyers/foto 4.webp", 
    link: "/flyers/foto 4.webp" 
  },
  { 
    id: 9, 
    title: "ROSSET CLUB - ANGUIS PROMO",
    designer: "Lucas Nicolas Bengochea",  
    date: "2025", 
    type: "STATIC", 
    thumb: "/flyers/foto 5.webp", 
    link: "/flyers/foto 5.webp" 
  },
  { 
    id: 10, 
    title: "ROSSET CLUB - POLLINI PROMO",
    designer: "Lucas Nicolas Bengochea", 
    date: "2025", 
    type: "STATIC", 
    thumb: "/flyers/foto 6.webp", 
    link: "/flyers/foto 6.webp" 
  },
  { 
    id: 11, 
    title: "ROSSET CLUB - SOULBEAT PROMO",
    designer: "Lucas Nicolas Bengochea", 
    date: "2025", 
    type: "STATIC", 
    thumb: "/flyers/foto 7.webp", 
    link: "/flyers/foto 7.webp" 
  },
];

export default function FlyerSection() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        
        {/* Header de la sección */}
        <div className="flex items-end justify-between mb-20 border-b border-border pb-8">
          <div>
            <div className="font-mono-tight text-muted-foreground mb-2">GRAPHIC & MOTION DESIGN</div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl md:text-7xl text-foreground"
            >
              Visuals & Flyers
            </motion.h2>
          </div>
          <span className="font-mono-tight text-muted-foreground hidden md:block">
            {String(flyers.length).padStart(2, "0")} PIECES
          </span>
        </div>

        {/* Grilla adaptada para formato vertical (flyers) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
          {flyers.map((f, i) => (
            <motion.a
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative cursor-pointer block"
            >
              {/* Etiqueta STATIC / MOTION */}
              <div className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-md border border-foreground/20 px-2 py-1">
                <span className="font-mono-tight text-[10px] text-foreground tracking-widest">
                  {f.type}
                </span>
              </div>

              {/* Contenedor de la imagen */}
              <div className="aspect-[4/5] overflow-hidden bg-muted border border-border relative">
                <img
                  src={f.thumb}
                  alt={f.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
              </div>

              {/* METADATA: Estilo Galería / Lookbook */}
              <div className="mt-5 border-t border-foreground/20 pt-4 text-left">
                <h4 className="font-serif text-lg md:text-xl text-foreground tracking-wide mb-1 uppercase truncate">
                  {f.title}
                </h4>
                <p className="font-mono-tight text-muted-foreground text-[10px] md:text-xs tracking-[0.15em] uppercase truncate">
                  {f.designer}
                </p>
                <div className="font-mono-tight text-foreground/40 text-[9px] mt-2 tracking-widest">
                  {f.date}
                </div>
              </div>

            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}