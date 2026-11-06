import { motion } from "framer-motion";
import { Instagram, Disc, Cloud, Mail, Globe } from "lucide-react";

// Datos de todos los artistas y miembros de la crew
const artists = [
  {
    id: 1,
    name: "URIEL GALEANO",
    roles: "DJ, mastering, producer, mixer",
    image: "/presskits/presskit (1).png", 
    actionUrl: "https://drive.google.com/file/d/1SCTdv-7YGYAFckJc21scFGeyBDY76tOD/view?usp=sharing",
    actionText: "Abrir Documento",
    links: [
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Bandcamp", url: "#", icon: Disc },
      { name: "Soundcloud", url: "#", icon: Cloud },
      { name: "Email", url: "mailto:uriel@example.com", icon: Mail }
    ]
  },
  {
    id: 2,
    name: "ANGUIS",
    roles: "DJ, mastering, producer, mixer", 
    image: "/presskits/presskit (2).png", 
    actionUrl: "https://drive.google.com/file/d/1x8DdAEzGIS2ElfPxVNBsAjF8FBRKWlxe/view?usp=sharing",
    actionText: "Abrir Documento",
    links: [
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Bandcamp", url: "#", icon: Disc },
      { name: "Soundcloud", url: "#", icon: Cloud },
      { name: "Email", url: "mailto:anguis@example.com", icon: Mail }
    ]
  },
  {
    id: 3,
    name: "LUCAS NICOLAS BENGOCHEA",
    roles: "branding, design & art director", 
    image: "/drop1/foto (1).webp", // Usando foto temporal del banco
    actionUrl: "#",
    actionText: "Ver Portfolio",
    links: [
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Email", url: "mailto:lucas@example.com", icon: Mail },
      { name: "Portfolio", url: "#", icon: Globe }
    ]
  },
  {
    id: 4,
    name: "JAVIER ALMIRÓN",
    roles: "branding, design & art director", 
    image: "/drop2/foto (1).webp", // Usando foto temporal del banco
    actionUrl: "#",
    actionText: "Ver Portfolio",
    links: [
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Email", url: "mailto:javier@example.com", icon: Mail },
      { name: "Portfolio", url: "#", icon: Globe }
    ]
  },
  {
    id: 5,
    name: "JUAN FRANCISCO ARIAS (WACHO.PH)",
    roles: "Photography, video, visuals, art director", 
    image: "/tom/foto (1).webp", // Usando foto temporal del banco
    actionUrl: "#",
    actionText: "Ver Portfolio",
    links: [
      { name: "Instagram", url: "#", icon: Instagram },
      { name: "Email", url: "mailto:juan@example.com", icon: Mail },
      { name: "Portfolio", url: "#", icon: Globe }
    ]
  }
];

export default function ArtistsSection() {
  return (
    <section className="py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-foreground uppercase tracking-wide"
          >
            Artistas de badder
          </motion.h2>
        </div>

        {/* Grilla adaptativa para los artistas (automáticamente pasa a 3 columnas en desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {artists.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Nombre del artista con tamaño dinámico para que entre en 1 línea */}
              <div className="mb-6 border-b border-border pb-3 flex items-center justify-center w-full text-center">
                <h3 className={`font-bold tracking-wider text-foreground uppercase whitespace-nowrap overflow-hidden text-ellipsis ${p.name.length > 18 ? 'text-base md:text-lg' : 'text-xl md:text-2xl'}`}>
                  {p.name}
                </h3>
              </div>

              {/* Contenedor de la foto achicado (max-w-[240px]) centrado */}
              <a href={p.actionUrl} target="_blank" rel="noopener noreferrer" className="block w-full max-w-[240px] aspect-[3/4] md:aspect-[4/5] overflow-hidden border border-border relative group cursor-pointer mb-6">
                <img
                  src={p.image}
                  alt={`Foto de ${p.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay al hacer hover */}
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-mono-tight border border-foreground px-6 py-2 bg-background text-foreground tracking-widest text-xs uppercase text-center">
                    {p.actionText}
                  </span>
                </div>
              </a>

              {/* Info y Redes */}
              <div className="flex flex-col items-center w-full pt-2 gap-4">
                <p className="font-mono-tight text-muted-foreground text-[10px] md:text-xs tracking-[0.15em] uppercase text-center min-h-[32px]">
                    {p.roles}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {p.links.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 font-mono-tight text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}