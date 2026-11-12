import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import badderLogo from "@/assets/recurso_2-2.webp";
import { crewNames } from "@/data/credits";

// Manifiesto breve al cierre de la Home (+ créditos de la crew, ancla #crew)
export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 relative px-6 md:px-16 py-16 md:py-24 border-t border-border wavy-grid overflow-hidden">
      <div className="grid md:grid-cols-12 gap-12 md:gap-8 max-w-6xl mx-auto items-center">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="md:col-span-7"
        >
          <div className="font-mono-tight text-muted-foreground mb-3">
            <span className="text-cobalt">08</span> — About / Manifiesto
          </div>
          <h2 className="font-serif text-5xl md:text-7xl text-foreground uppercase leading-[0.9] tracking-tight mb-8">
            Nacido
            <br />
            en la pista
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-lg">
            <p>
              BADDER empezó con la música electrónica underground y se fue expandiendo hacia todo lo que la rodea: diseño gráfico, fotografía, moda, audiovisual, videojuegos y tecnología.
            </p>
            <p>
              No es una agencia ni una marca de ropa. Es un espacio creativo y un archivo en movimiento: lo que se produce, se documenta, se viste y se comparte. Las prendas son la parte física del mismo ruido.
            </p>
          </div>

          <div className="mt-8 flex gap-8">
            {[
              ["Año", "2024"],
              ["País", "ARG"],
              ["Ciudad", "La Plata"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-mono-tight text-muted-foreground mb-1">{k}</div>
                <div className="font-serif text-2xl text-foreground">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Imagen: sunburst + fotos de archivo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-5 relative flex items-center justify-center pb-16"
        >
          <div className="relative border border-foreground/20 p-3 rotate-2 max-w-[320px] md:max-w-[360px]">
            <img src={badderLogo} alt="" className="relative z-0 w-full" loading="lazy" />
            <div className="absolute z-20 -bottom-10 left-1/2 -translate-x-[140%] w-[96px] h-[126px] border border-foreground/10 rotate-[-5deg] shadow-lg overflow-hidden bg-muted">
              <img src="/cuchate.esta/foto (10).webp" alt="Archivo BADDER — Cuchate.esta" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="absolute z-30 -bottom-12 left-1/2 -translate-x-1/2 w-[104px] h-[136px] border border-foreground/10 shadow-xl overflow-hidden bg-muted">
              <img src="/cuchate.esta/foto (4).webp" alt="Archivo BADDER — Cuchate.esta" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="absolute z-20 -bottom-10 left-1/2 translate-x-[40%] w-[92px] h-[122px] border border-foreground/10 rotate-[5deg] shadow-lg overflow-hidden bg-muted">
              <img src="/capital/foto (21).webp" alt="Archivo BADDER — Capital" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Crew / créditos */}
      <div id="crew" className="scroll-mt-24 max-w-6xl mx-auto mt-16 pt-8 border-t border-border grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <h3 className="font-mono-tight text-foreground">Crew / Créditos</h3>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-xs">
            Las personas que forjaron la experiencia BADDER. Pasado y presente.
          </p>
          <Link
            to="/contact#bookings"
            className="inline-block mt-5 font-mono-tight text-foreground border-b border-foreground/40 pb-1 hover:border-foreground transition-colors"
          >
            Conocé a los integrantes →
          </Link>
        </div>
        <ul className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
          {crewNames.map((name) => (
            <li key={name} className="font-mono-tight text-muted-foreground">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
