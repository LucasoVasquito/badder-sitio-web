import { motion } from "framer-motion";
import badderLogo from "@/assets/recurso_2-2.webp";

export default function AboutSection() {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-16 wavy-grid overflow-hidden">
      {/* Marquee */}
      <div className="overflow-hidden mb-20 border-y border-border py-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) =>
          <span key={i} className="font-serif text-5xl md:text-7xl tracking-wider text-foreground/10 mx-8">
              2026 • BADDER EXPERIENCE • BUNKER 001 •
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          
          <h2 className="font-serif text-6xl md:text-8xl mb-8 text-foreground leading-none">
            Quienes<br />Somos
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
            Badder funciona como un laboratorio multimedia y colectivo artístico. Formado por diseñadores, realizadores audiovisuales y productores de sonido, nuestro enfoque está en la intersección entre la tecnología, el diseño integral y la expresión urbana.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Desarrollamos identidades visuales, contenido audiovisual crudo y diseño sonoro, donde cada proyecto es una extensión de nuestra visión. Nuestra línea de ropa es el statement físico de nuestro trabajo digital: una extensión directa hacia la pista y la cultura de club.
          </p>
          <div className="mt-10 flex gap-8">
            <div>
              <div className="font-mono-tight text-muted-foreground mb-1">AÑO</div>
              <div className="font-serif text-2xl text-foreground">2024</div>
            </div>
            <div>
              <div className="font-mono-tight text-muted-foreground mb-1">PAIS</div>
              <div className="font-serif text-2xl text-foreground">ARG</div>
            </div>
            <div>
              <div className="font-mono-tight text-muted-foreground mb-1">CIUDAD</div>
              <div className="font-serif text-2xl text-foreground">La Plata</div>
            </div>
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex items-center justify-center">
          
          <div className="relative border border-foreground/20 p-4 rotate-2 mb-16">
            <img src={badderLogo} alt="Badder sunburst logo" className="relative z-0 w-full max-w-md" />
            
            {/* Stacked emerging images — in front, fanning out from bottom */}
            <div className="absolute z-20 -bottom-12 left-1/2 -translate-x-[150%] w-[130px] h-[170px] bg-muted border border-foreground/10 rotate-[-5deg] shadow-lg overflow-hidden">
              {/* Foto 1 (Ej: la primera del drop de Nahu). Le volamos el opacity-60 */}
              <img src="/cuchate.esta/foto (10).webp" alt="Badder archive 1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            
            <div className="absolute z-30 -bottom-14 left-1/2 -translate-x-1/2 w-[140px] h-[180px] bg-muted border border-foreground/10 rotate-[0deg] shadow-xl overflow-hidden">
              {/* Foto 2 (Ej: una de la sesión de Rosset) */}
              <img src="/cuchate.esta/foto (4).webp" alt="Badder archive 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            
            <div className="absolute z-20 -bottom-12 left-1/2 translate-x-[50%] w-[125px] h-[165px] bg-muted border border-foreground/10 rotate-[5deg] shadow-lg overflow-hidden">
              {/* Foto 3 (Ej: una de la incursión en Capital) */}
              <img src="/capital/foto (21).webp" alt="Badder archive 3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}