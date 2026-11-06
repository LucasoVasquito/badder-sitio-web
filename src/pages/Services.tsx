import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, MessageSquare, Users, Layers } from "lucide-react";

// Módulo agrupando los servicios con información detallada para cada caso
const caseStudies = [
  {
    id: "CASE 01",
    client: "Badder Showcase",
    title: "Audiovisual Experience & Live Recording",
    services: ["Dirección audiovisual", "Visuales", "Reels", "Consultoría"],
    description: "Cobertura integral y dirección de arte en vivo para el ciclo de eventos Badder Showcase. Desde la conceptualización de las visuales en pista hasta la grabación, edición de formato corto y documentación de archivo general.",
    image: "/cuchate.esta/foto (4).webp",
    // Nuevos campos para la vista detallada
    details: "Abordamos la producción técnica y creativa de eventos en vivo. Desarrollamos la identidad visual (loops y animaciones reactivas al sonido), diseñamos la puesta en escena lumínica y realizamos el registro multicámara de alta fidelidad. El material capturado es posteriormente editado en formatos cortos optimizados para redes (Reels, TikToks) y archivado en formato de alta calidad.",
    team: ["Crew Audiovisual Badder", "wachoph (Fotografía)", "lucas_b (Dirección de Arte)"],
    workflow: "Briefing & Conceptualización -> Diseño de Puesta e Iluminación -> Registro Multicámara en Vivo -> Edición, Color y Post-producción.",
    ctaMessage: "Hola Badder! Me interesa recibir más información sobre el servicio de Experiencia Audiovisual y Grabación en Vivo."
  },
  {
    id: "CASE 02",
    client: "Badder Records",
    title: "Sound Design & Label Releases",
    services: ["Producción musical", "Mixing", "Mastering"],
    description: "Desarrollo sonoro completo para los lanzamientos del sello. Tratamiento analógico y digital para asegurar la crudeza, la textura de la escena underground y el impacto necesario en los grandes sistemas de sonido de club.",
    image: "/audio/cover (6).webp",
    // Nuevos campos para la vista detallada
    details: "Ofrecemos tratamiento sonoro e ingeniería de audio dedicada a la música electrónica de club y experimental. El proceso de mezcla (mixing) organiza los elementos para lograr claridad y contundencia, mientras que la masterización final (mastering) optimiza el track utilizando hardware analógico y procesadores digitales de precisión para garantizar el máximo impacto en pistas de baile.",
    team: ["Badder Records Audio Team", "Uriel Galeano (Mixing Engineer)"],
    workflow: "Recepción de Stems -> Feedback Estructural -> Mezcla Híbrida (Analógico/Digital) -> Masterización Estéreo y Control de Rango Dinámico.",
    ctaMessage: "Hola Badder! Quisiera consultar sobre los servicios de Mezcla, Masterización o Diseño de Sonido."
  },
  {
    id: "CASE 03",
    client: "Bunker 001",
    title: "Apparel & Identity Capsule",
    services: ["Dirección creativa", "Identidad visual", "Diseño gráfico", "Branding"],
    description: "Construcción del universo visual completo para nuestro drop físico. Desarrollo de marca, logotipos, estampas, etiquetas y campaña editorial fotográfica desde cero hasta el producto final.",
    image: "/drop3/foto (26).webp",
    // Nuevos campos para la vista detallada
    details: "Creamos colecciones de identidad completas para marcas independientes de ropa, colectivos artísticos y eventos. Esto abarca desde el diseño del logotipo principal y logomarcas secundarias, tipografías personalizadas, ilustraciones para estampas textiles, el diseño de etiquetas físicas, packaging y la dirección de arte para la campaña editorial.",
    team: ["Estudio Creativo Badder", "wachoph (Fotografía Editorial)"],
    workflow: "Investigación & Moodboard Conceptual -> Diseño de Logotipos e Ilustraciones -> Prototipado y Fichas Técnicas -> Dirección de Arte Fotográfica & Campaña.",
    ctaMessage: "Hola Badder! Me interesa consultar sobre Dirección Creativa y Branding para mi proyecto."
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState<any>(null);

  return (
    <main className="bg-background min-h-screen pt-32 pb-32 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          
          {!activeService ? (
            /* --- VISTA: LISTADO DE SERVICIOS --- */
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ENCABEZADO */}
              <div className="mb-32 border-b border-border pb-16">
                <div className="font-mono-tight text-muted-foreground tracking-widest uppercase mb-4 text-xs">
                  Studio / Creative Collective
                </div>
                <h1 className="font-righteous text-5xl md:text-8xl text-foreground tracking-wider leading-none">
                  Services
                </h1>
              </div>

              {/* CASOS DE ESTUDIO */}
              <div className="flex flex-col gap-32">
                {caseStudies.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col gap-8 md:gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                  >
                    {/* Imagen / Media */}
                    <div className="w-full md:w-1/2 aspect-[4/5] bg-black border border-border relative overflow-hidden group">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute top-4 left-4 bg-background/90 px-3 py-1 border border-border font-mono-tight text-[10px] tracking-widest uppercase text-foreground">
                        {item.id}
                      </div>
                    </div>

                    {/* Info del Caso */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="font-mono-tight text-xs tracking-widest text-muted-foreground uppercase mb-4 border-b border-border pb-4">{item.client}</div>
                      <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-none mb-8">{item.title}</h2>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">{item.description}</p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {item.services.map(service => (
                          <span key={service} className="border border-foreground/30 px-3 py-1 font-mono-tight text-[9px] uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors">{service}</span>
                        ))}
                      </div>

                      {/* Botón Brutalista "Más Información" */}
                      <button
                        onClick={() => {
                          setActiveService(item);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex rounded-none border border-foreground bg-foreground px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-background transition-all duration-75 hover:-translate-x-1 hover:-translate-y-1 hover:border-cobalt hover:bg-cobalt hover:text-foreground hover:shadow-[4px_4px_0px_rgba(255,255,255,1)] cursor-pointer w-fit justify-center"
                      >
                        [ MAS INFORMACION ↗ ]
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- VISTA: DETALLE DE SERVICIO --- */
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col"
            >
              {/* Botón de regreso */}
              <button 
                onClick={() => {
                  setActiveService(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }} 
                className="mb-12 font-mono-tight text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 w-fit cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Volver a Servicios
              </button>

              {/* Encabezado del Detalle */}
              <div className="mb-16 border-b border-border pb-8">
                <div className="font-mono-tight text-xs tracking-widest text-muted-foreground uppercase mb-4">
                  {activeService.client} / {activeService.id}
                </div>
                <h1 className="font-serif text-4xl md:text-6xl text-foreground uppercase tracking-wider leading-none">
                  {activeService.title}
                </h1>
              </div>

              {/* Grid de contenido */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                
                {/* Columna Izquierda: Imagen */}
                <div className="md:col-span-6 flex flex-col gap-6">
                  <div className="aspect-[4/5] bg-black border border-border overflow-hidden">
                    <img 
                      src={activeService.image} 
                      alt={activeService.title} 
                      className="w-full h-full object-cover transition-all duration-500" 
                    />
                  </div>
                </div>

                {/* Columna Derecha: Detalles, Equipo, Workflow y CTA */}
                <div className="md:col-span-6 flex flex-col justify-between gap-12">
                  <div className="flex flex-col gap-8">
                    
                    {/* Descripción Detallada */}
                    <div>
                      <h3 className="font-serif text-xl uppercase tracking-widest text-foreground border-b border-border/30 pb-3 mb-4">
                        Descripción del Servicio
                      </h3>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                        {activeService.details}
                      </p>
                    </div>

                    {/* Equipo Participante */}
                    <div>
                      <h3 className="font-serif text-xl uppercase tracking-widest text-foreground border-b border-border/30 pb-3 mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" /> Quiénes Participan
                      </h3>
                      <ul className="flex flex-col gap-2 font-mono text-sm text-muted-foreground">
                        {activeService.team.map((member: string) => (
                          <li key={member} className="flex items-center gap-2">
                            <span className="text-foreground">→</span> {member}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Proceso de Trabajo */}
                    <div>
                      <h3 className="font-serif text-xl uppercase tracking-widest text-foreground border-b border-border/30 pb-3 mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-muted-foreground" /> Proceso de Trabajo
                      </h3>
                      <div className="flex flex-col gap-3 font-mono text-sm text-muted-foreground">
                        {activeService.workflow.split(" -> ").map((step: string, index: number) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span className="text-foreground/50 font-bold bg-muted/20 px-2 py-0.5 border border-border text-xs shrink-0">
                              0{index + 1}
                            </span>
                            <p className="leading-relaxed pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Botones de Contacto */}
                  <div className="flex flex-col gap-4 border-t border-border pt-8 mt-4">
                    <h4 className="font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground">
                      Contratación / Consultar Presupuesto:
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      
                      {/* WhatsApp Link */}
                      <a
                        href={`https://wa.me/5492215998188?text=${encodeURIComponent(activeService.ctaMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 rounded-none border border-foreground bg-foreground px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-background text-center transition-all duration-75 hover:-translate-x-1 hover:-translate-y-1 hover:border-[#25D366] hover:bg-[#25D366] hover:text-black hover:shadow-[4px_4px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Consultar por WhatsApp
                      </a>

                      {/* Email Link */}
                      <a
                        href={`mailto:contact@badderexperience.com?subject=${encodeURIComponent(`Consulta: ${activeService.title}`)}&body=${encodeURIComponent(activeService.ctaMessage)}`}
                        className="flex-1 rounded-none border border-foreground bg-transparent px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-foreground text-center transition-all duration-75 hover:-translate-x-1 hover:-translate-y-1 hover:border-foreground hover:bg-foreground hover:text-background hover:shadow-[4px_4px_0px_rgba(0,102,255,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" /> Consultar por Email
                      </a>

                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}