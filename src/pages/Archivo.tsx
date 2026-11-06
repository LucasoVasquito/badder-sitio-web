import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Importamos las tapas de los álbumes de foto
import tom from "@/assets/tom.webp";
import emergent from "@/assets/emergent.webp";
import nahu from "@/assets/nahu.webp";
import goro from "@/assets/goro.webp";
import verano2025 from "@/assets/verano2025.webp";
import rosset from "@/assets/rosset.webp";
import cuchate_esta from "@/assets/cuchate.esta.webp";
import sesion from "@/assets/sesion.webp";
import capital from "@/assets/capital.webp";
import lpsport1 from "@/assets/lpsport1.webp";
import lpsport2 from "@/assets/lpsport2.webp";
import flash from "@/assets/flash.webp";

// 1. FOTOS
const photos = [
  { id: "tom", type: "FOTO", thumb: tom, title: "Badder Showcase - Tom", meta: "Juan Francisco Arias / 2024", folder: "tom", imageCount: 41 },
  { id: "emergent", type: "FOTO", thumb: emergent, title: "Badder Showcase - Emergent", meta: "- / 2024", folder: "emergent", imageCount: 19 },
  { id: "nahu", type: "FOTO", thumb: nahu, title: "Segundo Drop: Bootleg", meta: "Nahuel y Lucas Bengochea / Dic 2024", folder: "nahu", imageCount: 11 },
  { id: "goro", type: "FOTO", thumb: goro, title: "Segundo drop (sesion)", meta: "Juan Francisco Arias / 2025", folder: "goro", imageCount: 26 },
  { id: "verano2025", type: "FOTO", thumb: verano2025, title: "Secuencias: Verano 2025", meta: "Juan Francisco Arias / 2025", folder: "verano2025", imageCount: 11 },
  { id: "rosset", type: "FOTO", thumb: rosset, title: "Badder Showcase - Rosset", meta: "Juan Francisco Arias / 2025", folder: "rosset", imageCount: 21 },
  { id: "cuchate.esta", type: "FOTO", thumb: cuchate_esta, title: "Uriel Galeano - Cuchate.esta", meta: "Juan Francisco Arias / 2025", folder: "cuchate.esta", imageCount: 17 },
  { id: "sesion", type: "FOTO", thumb: sesion, title: "Tercer drop (sesion)", meta: "Arias - Anguis - Crippa / 2025", folder: "sesion", imageCount: 37 },
  { id: "capital", type: "FOTO", thumb: capital, title: "011 - Capital Federal", meta: "Arias - Anguis - Galeano - Sessa / 2025", folder: "capital", imageCount: 33 },
  { id: "lpsport1", type: "FOTO", thumb: lpsport1, title: "Evento - La Plata Sport 1", meta: "Arias - Anguis - Cubilla / 2025", folder: "sport1", imageCount: 19 },
  { id: "lpsport2", type: "FOTO", thumb: lpsport2, title: "Evento - La Plata Sport 2", meta: "Arias - Ariotti - @Tripa.sbk / 2025", folder: "sport2", imageCount: 18 },
  { id: "flash", type: "FOTO", thumb: flash, title: "Ediciones Flash", meta: "Juan Francisco Arias / 2025", folder: "flash", imageCount: 19 }
];

// 2. FLYERS
const flyers = [
  { id: "f2", type: "FLYER", title: "BADDER SHOWCASE - TOM", meta: "Lucas Nicolas Bengochea / 2024", thumb: "/flyers/foto 1.webp", link: "/flyers/foto 1.webp" },
  { id: "f4", type: "FLYER", title: "EMERGENT X BADDER", meta: "Lucas Nicolas Bengochea / 2024", thumb: "/flyers/foto 2.webp", link: "/flyers/foto 2.webp" },
  { id: "f6", type: "FLYER", title: "LEVELS", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 3.webp", link: "/flyers/foto 3.webp" },
  { id: "f8", type: "FLYER", title: "ROSSET CLUB", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 4.webp", link: "/flyers/foto 4.webp" },
  { id: "f9", type: "FLYER", title: "ROSSET CLUB - ANGUIS PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 5.webp", link: "/flyers/foto 5.webp" },
  { id: "f10", type: "FLYER", title: "ROSSET CLUB - POLLINI PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 6.webp", link: "/flyers/foto 6.webp" },
  { id: "f11", type: "FLYER", title: "ROSSET CLUB - SOULBEAT PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 7.webp", link: "/flyers/foto 7.webp" }
];

// 3. MOODBOARDS
const moodboards = [
  { id: "m1", type: "MOODBOARD", title: "CATEDRAL VECTOR", meta: "REFERENCIA / DROP 3", thumb: "/drop3/foto (21).webp", link: "/drop3/foto (21).webp" },
  { id: "m2", type: "MOODBOARD", title: "SANCOR ABANDONADO", meta: "REFERENCIA / LOCACIÓN", thumb: "/drop3/foto (26).webp", link: "/drop3/foto (26).webp" },
  { id: "m3", type: "MOODBOARD", title: "ESQUELETO CONCEPT", meta: "REFERENCIA / DROP 2", thumb: "/drop2/foto (8).webp", link: "/drop2/foto (8).webp" },
  { id: "m4", type: "MOODBOARD", title: "MOCKUP VERANO", meta: "REFERENCIA / UNRELEASED", thumb: "/verano2026/foto (5).webp", link: "/verano2026/foto (5).webp" }
];

// Unificamos el archivo
const archiveItems = [...photos, ...flyers, ...moodboards];

export default function Archivo() {
  const [filter, setFilter] = useState("ALL");
  const [activeEvent, setActiveEvent] = useState<any>(null);

  const filteredItems = filter === "ALL" 
    ? archiveItems 
    : archiveItems.filter(i => i.type === filter);

  const getImages = (folder: string, count: number) => {
    return Array.from({ length: count }, (_, i) => `/${folder}/foto (${i + 1}).webp`);
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!activeEvent ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-12 border-b border-border pb-12">
                <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
                  Directorio Visual / Memorias
                </div>
                <h1 className="font-seagram text-5xl md:text-8xl text-foreground tracking-wider leading-none">
                  Archivo
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-16 font-mono-tight text-[10px] md:text-xs tracking-widest uppercase">
                {["ALL", "FOTO", "FLYER", "MOODBOARD"].map((f) => (
                  <button 
                    key={f} 
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 border transition-all duration-300 ${
                      filter === f 
                        ? "border-foreground bg-foreground text-background" 
                        : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                {filteredItems.map((item, i) => {
                  const isFoto = item.type === "FOTO";
                  const Wrapper: any = isFoto ? "div" : "a";
                  const wrapperProps = isFoto
                    ? { onClick: () => setActiveEvent(item) }
                    // @ts-ignore - Hacemos un chequeo para que esto solo se aplique a items con 'link'
                    : { href: item.link, target: "_blank", rel: "noopener noreferrer" };

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 10) * 0.05 }}
                      className="break-inside-avoid"
                    >
                      <Wrapper {...wrapperProps} className="group block cursor-pointer">
                        <div className="relative overflow-hidden bg-black border border-border">
                          <img 
                            src={item.thumb} 
                            alt={item.title} 
                    className="w-full h-auto object-cover group-hover:contrast-110 transition-all duration-700"
                            loading="lazy" 
                          />
                          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md px-2 py-1 border border-border">
                            <span className="font-mono-tight text-[9px] uppercase tracking-widest text-foreground">
                              {item.type}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 mb-8 px-1 border-t border-border/40 pt-2">
                          <h3 className="font-serif text-lg md:text-xl uppercase leading-tight truncate text-foreground">
                            {item.title}
                          </h3>
                          <p className="font-mono-tight text-[9px] md:text-[10px] text-muted-foreground uppercase mt-2 tracking-[0.2em] truncate">
                            {item.meta}
                          </p>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="album"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setActiveEvent(null)}
                className="mb-12 font-mono-tight text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al Directorio
              </button>

              <div className="mb-16 text-center md:text-left border-b border-border pb-8">
                <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-4 uppercase tracking-wider">{activeEvent.title}</h2>
                <p className="font-mono-tight text-muted-foreground text-sm uppercase tracking-[0.2em]">{activeEvent.meta}</p>
              </div>

              <div className="flex flex-col items-center gap-16">
                {getImages(activeEvent.folder, activeEvent.imageCount).map((src, index) => (
                  <img key={index} src={src} alt={`${activeEvent.title} - ${index + 1}`} className="w-full h-auto object-cover border border-border" loading="lazy" />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}