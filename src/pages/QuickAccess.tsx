import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const accessLinks = [
  { title: "Music", path: "/music", description: "Sets, Mixes, Releases & Bookings" },
  { title: "Visuals", path: "/visuals", description: "Archivo de Video & Motion" },
  { title: "Colecciones", path: "/colecciones", description: "Design & Concept Art" },
  { title: "Shop", path: "/shop", description: "Merch, Zines & Sample Packs" },
  { title: "Archivo", path: "/archivo", description: "Fotografía, Flyers & Moodboards" },
  { title: "Journal", path: "/journal", description: "Editorial, Artículos & Cultura" }
];

export default function QuickAccess() {
  return (
    <section className="py-24 px-6 md:px-16 border-y border-foreground/10 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-6xl mb-12"
        >
          Directorio
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accessLinks.map((link, i) => (
            <Link to={link.path} key={link.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block border border-foreground/20 p-8 hover:bg-foreground hover:text-background transition-colors duration-500"
              >
                <h3 className="font-serif text-3xl mb-2 tracking-wide group-hover:scale-105 origin-left transition-transform duration-500">
                  {link.title}
                </h3>
                <p className="font-mono text-xs tracking-widest text-muted-foreground group-hover:text-background/70 transition-colors duration-500 uppercase">
                  {link.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}