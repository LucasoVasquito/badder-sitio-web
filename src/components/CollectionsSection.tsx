import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collections } from "@/data/collections";

function SoundwaveDivider() {
  return (
    <div className="flex items-center justify-center py-8 gap-[2px]">
      {Array.from({ length: 60 }).map((_, i) => {
        const h = Math.sin(i * 0.3) * 12 + Math.sin(i * 0.7) * 8 + 14;
        return (
          <div
            key={i}
            className="w-[2px] bg-muted-foreground/30"
            style={{ height: `${h}px` }}
          />
        );
      })}
    </div>
  );
}

export default function CollectionsSection() {
  const [activeCollection, setActiveCollection] = useState(null);

  return (
    <section className="min-h-screen py-32 px-5 md:px-12">
      <div className="wrap">

        <AnimatePresence mode="wait">
          {!activeCollection ? (
            /* VISTA 1: LISTA DE COLECCIONES */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="label text-muted-foreground mb-2">DESIGN & CONCEPT ART</div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-hit-me-punk text-5xl md:text-7xl text-foreground mb-16 tracking-wider"
              >
                colecciones
              </motion.h2>

              {collections.map((col, i) => (
                <div key={col.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="grid md:grid-cols-2 gap-8 items-center group"
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden border border-foreground/20 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <img
                        src={col.img}
                        alt={col.name}
                        className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />

                      {/* ACÁ VUELVE EL RECUADRO DEL LOGO */}
                      <div className="absolute bottom-4 right-4 z-10 w-[120px] h-[80px] flex items-center justify-center bg-background/40 border border-foreground/20 p-2">
                        {col.logo ? (
                          <img
                            src={col.logo}
                            alt={`Logo ${col.name}`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="font-mono text-[10px] text-foreground/50 tracking-wider">LOGO HERE</span>
                        )}
                      </div>

                    </div>

                    {/* Info */}
                    <div className="py-8">
                      <div className="label text-muted-foreground mb-4">{col.season} — {col.pieces} PIECES</div>
                      <h3 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-none">{col.name}</h3>

                      {/* ACÁ ESTÁ LA MAGIA, AHORA ES DINÁMICO */}
                      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-8">
                        {col.description}
                      </p>

                      <button
                        onClick={() => setActiveCollection(col)}
                        className="border border-foreground/40 px-8 py-3 label text-foreground hover:bg-foreground hover:text-background transition-all duration-200 tracking-wider"
                      >
                        EXPLORAR LOOKBOOK
                      </button>
                    </div>
                  </motion.div>
                  {i < collections.length - 1 && <SoundwaveDivider />}
                </div>
              ))}
            </motion.div>
          ) : (

            /* VISTA 2: EL LOOKBOOK CON METADATA TIPO GALERÍA */
            <motion.div
              key="lookbook"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <button
                onClick={() => setActiveCollection(null)}
                className="mb-12 label text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al Archivo
              </button>

              <div className="mb-24 text-center md:text-left border-b border-border pb-8">
                <div className="label text-muted-foreground mb-2">{activeCollection.season} — LOOKBOOK</div>
                <h2 className="font-serif text-5xl md:text-7xl text-foreground mb-4">
                  {activeCollection.name}
                </h2>
              </div>

              {/* Cascada de prendas con su Metadata */}
              <div className="flex flex-col items-center gap-32">
                {activeCollection.lookbook.map((item, index) => {
                  const src = `/${activeCollection.folder}/${item.file}`;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="w-full flex flex-col items-center"
                    >
                      <picture className="w-full">
                        <source srcSet={src.replace('.webp', '.webp')} type="image/webp" />
                        <img
                          src={src}
                          alt={item.title}
                          className="w-full h-auto object-cover border border-border"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          loading="lazy"
                        />
                      </picture>

                      {/* ACÁ ESTÁ LA MAGIA: El bloque de texto estilo Galería */}
                      <div className="mt-8 text-center w-full max-w-xl border-t border-foreground/20 pt-6">
                        <h4 className="font-display text-2xl md:text-3xl text-foreground tracking-wide mb-2">
                          {item.title}
                        </h4>
                        <p className="label text-muted-foreground text-xs tracking-[0.2em] uppercase">
                          {item.designers}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
