import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import drop1 from "@/assets/drop1.webp";
import drop2 from "@/assets/drop2.webp";
import drop3 from "@/assets/drop3.webp";
import verano2026 from "@/assets/verano2026.webp";

const collections = [
  {
    id: 1,
    name: "DROP 1",
    season: "SS24",
    pieces: 19,
    img: drop1,
    logo: "/drop1/foto (11).webp",
    description: "El punto de partida. Nuestro drop fundacional, enfocado 100% en forjar la identidad visual y la estética cruda del colectivo. La primera transmisión.",
    folder: "drop1",
    lookbook: [
      { file: "foto (1).webp", title: "BUNKER VINYLS (nombre prototipo)", designers: "Agustin Galeazzi - Uriel Galeano" },
      { file: "foto (2).webp", title: "Imagotipo original", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (3).webp", title: "Logotipo", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (4).webp", title: "Concepto mascota 1", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (5).webp", title: "ESPIRAL", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (6).webp", title: "Smoothly Badder Experience 1", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (7).webp", title: "Logo 3", designers: "Lucas Nicolas Bengochea - Juan Francisco Arias" },
      { file: "foto (8).webp", title: "Logo 3 concepto", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (9).webp", title: "CONCEPTO", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (10).webp", title: "Concepto mascota 2", designers: "Javier Almiron - Lucas Nicolas Bengochea" },
      { file: "foto (11).webp", title: "Logo 2", designers: "Agustin Galeazzi - Uriel Galeano - Lucas Nicolas Bengochea" },
      { file: "foto (12).webp", title: "MOCKUP 1" },
      { file: "foto (13).webp", title: "MOCKUP 2" },
      { file: "foto (14).webp", title: "MOCKUP 3" },
      { file: "foto (15).webp", title: "MOCKUP 4" },
      { file: "foto (16).webp", title: "Concepto logo original", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (17).webp", title: "Diseño Badder 1", designers: "Agustin Galeazzi - Lucas Nicolas Bengochea" },
      { file: "foto (18).webp", title: "SOVIETICO", designers: "Agustin Galeazzi" },
      { file: "foto (19).webp", title: "Banner canal de YouTube", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (20).webp", title: "CONCEPTO 2", designers: "Agustin Galeazzi" },
      { file: "foto (21).webp", title: "Logo beta", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (22).webp", title: "WAVES", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (23).webp", title: "Badderhood", designers: "Juan Francisco Arias" },
      { file: "foto (24).webp", title: "Badderhood 2", designers: "Juan Francisco Arias" },
    ]
  },
  {
    id: 2,
    name: "DROP 2",
    season: "FW24",
    pieces: 20,
    img: drop2,
    logo: "/drop2/foto (10).webp",
    description: "Expandiendo nuestra estética clásica del under a nuevos horizontes visuales. Arraigada en la expresión cruda, esta cápsula introduce capas complejas y dimensiones variadas a nuestra identidad establecida. Ruido puro.",
    folder: "drop2",
    lookbook: [
      { file: "foto (1).webp", title: "EXTASYS", designers: "Javier Almiron" },
      { file: "foto (2).webp", title: "HAMBRE 2", designers: "Juan Francisco Arias" },
      { file: "foto (3).webp", title: "HAMBRE 3.2", designers: "Juan Francisco Arias - Facundo Luis Coppa" },
      { file: "foto (4).webp", title: "YE", designers: "Facundo Luis Coppa" },
      { file: "foto (5).webp", title: "YE - Logo delantero", designers: "Facundo Luis Coppa" },
      { file: "foto (6).webp", title: "ALIEN", designers: "Javier Almiron - Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (7).webp", title: "HAMBRE", designers: "Juan Francisco Arias" },
      { file: "foto (8).webp", title: "ESQUELETO - Logo delantero", designers: "Javier Almiron - Lucas Nicolas Bengochea" },
      { file: "foto (9).webp", title: "ESQUELETO - Logo delantero (beta)", designers: "Javier Almiron - Lucas Nicolas Bengochea" },
      { file: "foto (10).webp", title: "ALIEN - Logo delantero", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (11).webp", title: "EXTASYS - Logo delantero" },
      { file: "foto (12).webp", title: "Badder serif" },
      { file: "foto (13).webp", title: "B2B - Logo delantero", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (14).webp", title: "B2B", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (15).webp", title: "ESQUELETO", designers: "Lucas Nicolas Bengochea - Javier Almiron - Juan Francisco Arias" },
      { file: "foto (16).webp", title: "YE - 2", designers: "Facundo Luis Coppa" },
      { file: "foto (17).webp", title: "HAMBRE 3", designers: "Juan Francisco Arias - Facundo Luis Coppa" },
      { file: "foto (18).webp", title: "HAMBRE 3 - Logo delantero" },
      { file: "foto (19).webp", title: "MOCKUP YE 1", designers: "Facundo Luis Coppa" },
      { file: "foto (20).webp", title: "MOCKUP YE 2", designers: "Facundo Luis Coppa" },
      { file: "foto (21).webp", title: "EXTASYS Alt", designers: "Javier Almiron" },
    ]
  },
  {
    id: 3,
    name: "DROP 3",
    season: "SS25",
    pieces: 40,
    img: drop3,
    logo: "/drop3/foto (28).webp",
    description: "Para este drop ya teníamos la confianza para romper nuestro propio molde. Dejamos entrar colores vibrantes, texturas 3D y una mezcla de influencias globales y locales. Un caos visual y distintas estéticas que, de alguna manera, se llevan perfecto entre sí.",
    folder: "drop3",
    lookbook: [
      { file: "foto (1).webp", title: "OKUPAS", designers: "Javier Almiron" },
      { file: "foto (2).webp", title: "RAVE", designers: "Juan Francisco Arias" },
      { file: "foto (3).webp", title: "CATEDRAL (Original)", designers: "Javier Almiron" },
      { file: "foto (4).webp", title: "BUNKER 001", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (5).webp", title: "DJ (beta)", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (6).webp", title: "THE SHOWCASE", designers: "Javier Almiron" },
      { file: "foto (7).webp", title: "THE SHOWCASE - Logo delantero", designers: "Javier Almiron" },
      { file: "foto (8).webp", title: "concepto logo 1", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (9).webp", title: "Estampa perrito fumador", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (10).webp", title: "Perrito fumador", designers: "Juan Francisco Arias" },
      { file: "foto (11).webp", title: "Concepto logo 2 (azul)", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (12).webp", title: "Concepto logo 2 (azul)", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (13).webp", title: "Concepto logo 3", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (14).webp", title: "Concepto logo 4", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (15).webp", title: "Concepto logo 3.2", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (16).webp", title: "CLIFFORD ROJO", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (17).webp", title: "CLIFFORD ROJO - Logo delantero", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (18).webp", title: "DJ (blanco)", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (19).webp", title: "DJ (rojo)", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (20).webp", title: "Diseño descartado", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (21).webp", title: "CATEDRAL (Vectorizado)", designers: "Javier Almiron" },
      { file: "foto (22).webp", title: "Concepto logo 5", designers: "Juan Francisco Arias" },
      { file: "foto (23).webp", title: "Concepto logo 6", designers: "Juan Francisco Arias" },
      { file: "foto (24).webp", title: "Perro rojo beta", designers: "Juan Francisco Arias" },
      { file: "foto (25).webp", title: "Clifford verde", designers: "Juan Francisco Arias" },
      { file: "foto (26).webp", title: "SANCOR ABANDONADO", designers: "Javier Almiron - Juan Francisco Arias" },
      { file: "foto (27).webp", title: "BLUE CLIFFORD", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (28).webp", title: "BLUE CLIFFORD - Logo delantero", designers: "Juan Francisco Arias - Lucas Nicolas Bengochea" },
      { file: "foto (29).webp", title: "Clifford beta", designers: "Juan Francisco Arias" },
      { file: "foto (30).webp", title: "Clifford beta - Logo delantero", designers: "Juan Francisco Arias" },
      { file: "foto (31).webp", title: "Noise for the Dancefloor", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (32).webp", title: "MOCKUP 1" },
      { file: "foto (33).webp", title: "MOCKUP 2" },
      { file: "foto (34).webp", title: "DJ (azul) - Logo delantero", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (35).webp", title: "DJ (azul)", designers: "Lucas Nicolas Bengochea" },
      { file: "foto (36).webp", title: "DJ (rojo) - Logo delantero", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (37).webp", title: "DJ (blanco) - Logo delantero", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (38).webp", title: "Concepto logo 7", designers: "Juan Francisco Arias" },
      { file: "foto (39).webp", title: "Concepto logo 8", designers: "Juan Francisco Arias" },
      { file: "foto (40).webp", title: "Tres cabezas glitch (concepto)", designers: "Juan Francisco Arias" },
    ]
  },
  {
    id: 4,
    name: "DROP 4 (Unreleased)",
    season: "SS26",
    pieces: 11,
    img: verano2026,
    logo: "/verano2026/foto (11).webp",
    description: "Un cambio de frecuencia total. Nos alejamos de las gráficas planas y exploramos el realismo fotográfico, rostros realistas y texturas crudas sin editar. Al mismo tiempo, esta frecuencia fue el campo de prueba para conceptos inéditos de Verano de 2026, como nuestras primeras camisas clásicas con gráficas más simples. Aunque el drop veraniego no pudo realizarse, estas señales sobrevivieron al ruido y quedaron como parte de nuestro archivo más crudo.",
    folder: "verano2026",
    lookbook: [
      { file: "foto (1).webp", title: "CONCEPTO 1", designers: "Facundo Luis Coppa" },
      { file: "foto (2).webp", title: "CCNCEPTO 2", designers: "Facundo Luis Coppa" },
      { file: "foto (3).webp", title: "CONCEPTO 3", designers: "Facundo Luis Coppa" },
      { file: "foto (4).webp", title: "CONCEPTO 4", designers: "Facundo Luis Coppa" },
      { file: "foto (5).webp", title: "Mockup verano 1", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (6).webp", title: "Mockup verano 2", designers: "Lucas Nicolas Bengochea - Javier Almiron" },
      { file: "foto (7).webp", title: "Mockup verano 3", designers: "Facundo Luis Coppa - Lucas Nicolas Bengochea - Juan Francisco Arias" },
      { file: "foto (8).webp", title: "Mockup verano 3" },
      { file: "foto (9).webp", title: "Mockup verano 4", designers: "Javier Almiron - Lucas Nicolas Bengochea" },
      { file: "foto (10).webp", title: "Mockup verano 5" },

    ]
  },
];

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
    <section className="min-h-screen py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">

        <AnimatePresence mode="wait">
          {!activeCollection ? (
            /* VISTA 1: LISTA DE COLECCIONES */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="font-mono-tight text-muted-foreground mb-2">DESIGN & CONCEPT ART</div>
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
                      <div className="absolute bottom-4 right-4 z-10 w-[120px] h-[80px] flex items-center justify-center bg-background/40 backdrop-blur-sm border border-foreground/20 p-2">
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
                      <div className="font-mono-tight text-muted-foreground mb-4">{col.season} — {col.pieces} PIECES</div>
                      <h3 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-none">{col.name}</h3>

                      {/* ACÁ ESTÁ LA MAGIA, AHORA ES DINÁMICO */}
                      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-8">
                        {col.description}
                      </p>

                      <button
                        onClick={() => setActiveCollection(col)}
                        className="border border-foreground/40 px-8 py-3 font-mono-tight text-foreground hover:bg-foreground hover:text-background transition-all duration-200 tracking-wider"
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
                className="mb-12 font-mono-tight text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Volver al Archivo
              </button>

              <div className="mb-24 text-center md:text-left border-b border-border pb-8">
                <div className="font-mono-tight text-muted-foreground mb-2">{activeCollection.season} — LOOKBOOK</div>
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
                          onError={(e) => { e.target.style.display = 'none'; }}
                          loading="lazy"
                        />
                      </picture>

                      {/* ACÁ ESTÁ LA MAGIA: El bloque de texto estilo Galería */}
                      <div className="mt-8 text-center w-full max-w-xl border-t border-foreground/20 pt-6">
                        <h4 className="font-serif text-2xl md:text-3xl text-foreground tracking-wide mb-2 uppercase">
                          {item.title}
                        </h4>
                        <p className="font-mono-tight text-muted-foreground text-xs tracking-[0.2em] uppercase">
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
