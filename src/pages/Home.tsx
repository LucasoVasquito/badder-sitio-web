import AboutSection from "../components/AboutSection";
import ExtendedHero from "./ExtendedHero";
import QuickAccess from "./QuickAccess";
import CreditsSection from "../components/CreditsSection";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const featuredItems = [
  { id: 1, title: "URIEL GALEANO — NOT RULES EP", category: "LATEST RELEASE", image: "/audio/cover (6).webp", path: "/music", className: "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto" },
  { id: 2, title: "EMERGENT X BADDER", category: "EVENT FLYER", image: "/flyers/foto 2.webp", path: "/archivo", className: "md:col-span-1 aspect-square" },
  { id: 3, title: "DROP 3 — SS25", category: "COLLECTIONS", image: "/drop3/foto (26).webp", path: "/colecciones", className: "md:col-span-1 aspect-square" }
];

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      
      {/* 1. Pantalla inicial / Logo interactivo original */}
      <HeroSection />

      {/* 2. Quiénes Somos original */}
      <AboutSection />

      {/* 3. Continuación Home: Hero Extendido */}
      <ExtendedHero />

      {/* 4. Quick Access (Navegación editorial) */}
      <QuickAccess />

      {/* 5. Destacados (Módulos modulares) */}
      <section className="py-32 px-6 md:px-16 max-w-6xl mx-auto border-b border-foreground/10">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-serif text-5xl md:text-7xl text-foreground">Destacados</h2>
          <span className="font-mono-tight text-muted-foreground hidden md:block tracking-widest">LATEST ENTRIES</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-2 md:h-[700px]">
          {featuredItems.map((item, i) => (
            <Link to={item.path} key={item.id} className={`group relative block overflow-hidden border border-border bg-black ${item.className}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="w-full h-full">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <span className="font-mono-tight text-[10px] text-background bg-foreground w-fit px-3 py-1 tracking-widest uppercase mb-4">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Créditos */}
      <CreditsSection />
    </main>
  );
}