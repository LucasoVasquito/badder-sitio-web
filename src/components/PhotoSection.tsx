import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Estas son las "tapas" de tus álbumes
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

// Acá definimos los EVENTOS (Álbumes)
const events = [
  { 
    id: "tom", 
    coverSrc: tom, 
    coverTitle: "TOM", 
    title: "Badder Showcase - Tom", // Título que va adentro
    meta: "Juan Francisco Arias (WACHO.PH) / 2024", 
    folder: "tom", // El nombre exacto de la carpeta en /public
    imageCount: 41 // La cantidad exacta de fotos que pusiste en esa carpeta
  },
  { 
    id: "emergent", 
    coverSrc: emergent, 
    coverTitle: "EMERGENT", 
    title: "Badder Showcase - Emergent",
    meta: "- / 2024", 
    folder: "emergent", 
    imageCount: 19
  },
  { 
    id: "nahu", 
    coverSrc: nahu, 
    coverTitle: "2ndo drop (bootleg)", 
    title: "Segundo Drop: Bootleg",
    meta: "Nahuel y Lucas Bengochea / Diciembre 2024", 
    folder: "nahu", 
    imageCount: 11 
  },
  { 
    id: "goro", 
    coverSrc: goro, 
    coverTitle: "2ndo drop (sesion)", 
    title: "Segundo drop (sesion)",
    meta: "Juan Francisco Arias (WACHO.PH) / 2025", 
    folder: "goro", 
    imageCount: 26 
  },
  { 
    id: "verano2025", 
    coverSrc: verano2025, 
    coverTitle: "secuencias - verano 25", 
    title: "Secuencias: Verano 2025",
    meta: "Juan Francisco Arias (WACHO.PH) / 2025", 
    folder: "verano2025", 
    imageCount: 11 
  },
  { 
    id: "rosset", 
    coverSrc: rosset, 
    coverTitle: "rosset", 
    title: "Badder Showcase - Rosset",
    meta: "Juan Francisco Arias (WACHO.PH) / 2025", 
    folder: "rosset", 
    imageCount: 21 
  },
  { 
    id: "cuchate.esta", 
    coverSrc: cuchate_esta, 
    coverTitle: "cuchate.esta", 
    title: "Uriel Galeano - Cuchate.esta",
    meta: "Juan Francisco Arias (WACHO.PH) / 2025", 
    folder: "cuchate.esta", 
    imageCount: 17 
  },
  { 
    id: "sesion", 
    coverSrc: sesion, 
    coverTitle: "3er drop (sesion)", 
    title: "Tercer drop (sesion)",
    meta: "Juan Francisco Arias (WACHO.PH) - Francisco Anguis - Briana Crippa / 2025", 
    folder: "sesion", 
    imageCount: 37 
  },
  { 
    id: "capital", 
    coverSrc: capital,
    coverTitle: "secuencias - capital",
    title: "011 - Capital Federal",
    meta: "Juan Francisco Arias (WACHO.PH) - Francisco Anguis - Uriel Galeano - Tomas Sessa / 2025",
    folder: "capital",
    imageCount: 33
  },    
  { 
    id: "lpsport1", 
    coverSrc: lpsport1, 
    coverTitle: "La Plata Sport 1", 
    title: "Evento - La Plata Sport 1",
    meta: "Juan Francisco Arias (WACHO.PH) - Francisco Anguis - Carola Cubilla / 2025", 
    folder: "sport1", 
    imageCount: 19 
  },
  { 
    id: "lpsport2", 
    coverSrc: lpsport2, 
    coverTitle: "La Plata Sport 2", 
    title: "Evento - La Plata Sport 2",
    meta: "Juan Francisco Arias (WACHO.PH) - Facundo Daniel Ariotti - @Tripa.sbk / 2025", 
    folder: "sport2", 
    imageCount: 18 
  },
  { 
    id: "flash", 
    coverSrc: flash, 
    coverTitle: "flash", 
    title: "Ediciones Flash",
    meta: "Juan Francisco Arias (WACHO.PH) / 2025", 
    folder: "flash", 
    imageCount: 19 
  }         
];

export default function PhotoSection() {
  // En vez de guardar una sola foto, guardamos el EVENTO entero que el usuario eligió
  const [activeEvent, setActiveEvent] = useState(null);

  // Función para generar la lista de fotos de la carpeta elegida
  const getImages = (folder, count) => {
  // Le agregamos la palabra "foto " y los paréntesis alrededor del número
  return Array.from({ length: count }, (_, i) => `/${folder}/foto (${i + 1}).webp`);
};

  return (
    <section className="min-h-screen py-32 px-5 md:px-12">
      <div className="wrap">
        
        {/* Usamos AnimatePresence para hacer una transición suave entre la grilla y el álbum */}
        <AnimatePresence mode="wait">
          
          {/* VISTA 1: SI NO HAY NINGÚN EVENTO SELECCIONADO, MOSTRAMOS LA GRILLA */}
          {!activeEvent ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="label text-muted-foreground mb-2">Fotos</div>
              <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-16">
                Archivo Fotográfico
              </h2>

              <div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
                {events.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative mb-2 break-inside-avoid group cursor-pointer "
                    onClick={() => setActiveEvent(event)} // Al hacer clic, activamos el evento
                  >
                    <div className="relative overflow-hidden border border-border bg-secondary">
                      <img
                        src={event.coverSrc}
                        alt={event.coverTitle}
                        className="w-full object-cover transition-all duration-300"
                      />
                      <div className="absolute top-4 -right-1 writing-mode-vertical">
                        <span
                          className="font-bold text-xs tracking-[0.3em] text-foreground/70 group-hover:text-red-aggressive transition-colors duration-300"
                          style={{ writingMode: "vertical-rl" }}
                        >
                          {event.coverTitle}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (

            /* VISTA 2: SI HAY UN EVENTO SELECCIONADO, MOSTRAMOS SUS FOTOS */
            <motion.div
              key="album"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Botón para volver atrás */}
              <button 
                onClick={() => setActiveEvent(null)}
                className="mb-12 label text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al Archivo
              </button>

              {/* Título y Metadata del Evento */}
              <div className="mb-16 text-center md:text-left border-b border-border pb-8">
                <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-4 tracking-wider">
                  {activeEvent.title}
                </h2>
                <div className="label text-muted-foreground text-sm uppercase tracking-[0.2em] flex flex-col gap-1">
                  <p>{activeEvent.meta}</p>
                </div>
              </div>

              {/* Cascada de Fotos del Evento */}
              <div className="flex flex-col items-center gap-16">
                {getImages(activeEvent.folder, activeEvent.imageCount).map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`${activeEvent.title} - ${index + 1}`}
                    className="w-full h-auto object-cover border border-border"
                  />
                ))}
              </div>
            </motion.div>

          )}
        </AnimatePresence>

      </div>
    </section>
  );
}