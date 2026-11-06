import { motion } from "framer-motion";
import ArtistsSection from "../components/ArtistsSection";

export default function Contact() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">

        {/* ENCABEZADO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-border pb-16"
        >
          <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
            Direct Line / Inquiries
          </div>
          <h1 className="font-serif text-5xl md:text-8xl text-foreground tracking-wider leading-none">
            Contact
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-32">

          {/* INFO & REDES */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div>
              <h2 className="font-serif text-3xl mb-4 uppercase tracking-wide">Information</h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
                Para colaboraciones, servicios de estudio creativo, dirección de arte audiovisual o consultas generales, envíanos un mensaje directo o utiliza el terminal.
              </p>
            </div>

            <div className="flex flex-col gap-8 font-mono-tight text-sm tracking-widest uppercase">
              <div>
                <span className="text-muted-foreground block mb-2 text-[10px]">Email</span>
                <a href="mailto:contact@badderexperience.com" className="hover:text-muted-foreground transition-colors text-foreground">contact@badderexperience.com</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-2 text-[10px]">Instagram</span>
                <a href="https://instagram.com/badder.experience" target="_blank" rel="noreferrer" className="hover:text-muted-foreground transition-colors text-foreground">@badder.experience</a>
              </div>
              <div>
                <span className="text-muted-foreground block mb-2 text-[10px]">Location</span>
                <span className="text-foreground">La Plata, Buenos Aires, ARG</span>
              </div>
            </div>
          </motion.div>

          {/* FORMULARIO BRUTALISTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Nombre / Entidad</label>
                <input type="text" id="name" className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" placeholder="Ingresa tu nombre..." />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Email</label>
                <input type="email" id="email" className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors rounded-none" placeholder="tu@email.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Asunto</label>
                <select id="subject" className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors appearance-none rounded-none text-foreground/80 cursor-pointer">
                  <option value="collab" className="bg-background">Colaboración</option>
                  <option value="services" className="bg-background">Servicios de Estudio / Visuales</option>
                  <option value="booking" className="bg-background">Bookings / DJ Set</option>
                  <option value="other" className="bg-background">Otro</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">Mensaje</label>
                <textarea id="message" rows={4} className="bg-transparent border-b border-border py-2 font-mono text-sm focus:outline-none focus:border-foreground transition-colors resize-none rounded-none" placeholder="Escribe tu mensaje..."></textarea>
              </div>

              <button type="submit" className="border border-foreground bg-foreground text-background font-mono-tight text-xs uppercase tracking-widest py-4 hover:bg-transparent hover:text-foreground transition-colors duration-300 mt-4">
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ARTISTAS DE BADDER */}
      <div className="bg-muted/5 border-t border-border pt-8 pb-16" id="bookings">
        <ArtistsSection />
      </div>
    </main>
  );
}