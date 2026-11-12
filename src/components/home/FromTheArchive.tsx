import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { photos, flyers } from "@/data/archive";
import { collections } from "@/data/collections";

interface ArchivePick {
  ref: string;
  type: string;
  title: string;
  meta: string;
  image: string;
  to: string;
  /** Columnas/filas en la grilla irregular */
  span: string;
  /** Proporción de la imagen (la pieza principal llena sus dos filas en desktop) */
  media: string;
}

const photo = (id: string) => photos.find((p) => p.id === id)!;
const flyer = (id: string) => flyers.find((f) => f.id === id)!;
const drop3 = collections.find((c) => c.id === 3)!;

// Selección curada (6 piezas) del archivo y las colecciones existentes
const picks: ArchivePick[] = [
  { ref: "A—001", type: "Foto", title: photo("tom").title, meta: photo("tom").meta, image: photo("tom").thumb, to: "/archive?album=tom", span: "col-span-2 md:col-span-5 md:row-span-2", media: "aspect-[4/5] md:aspect-auto md:flex-1 md:min-h-[420px]" },
  { ref: "A—002", type: "Flyer", title: flyer("f8").title, meta: flyer("f8").meta, image: flyer("f8").thumb, to: "/archive", span: "col-span-1 md:col-span-3", media: "aspect-[4/5]" },
  { ref: "A—003", type: "Foto", title: photo("rosset").title, meta: photo("rosset").meta, image: photo("rosset").thumb, to: "/archive?album=rosset", span: "col-span-1 md:col-span-4", media: "aspect-[4/5] md:aspect-[4/3]" },
  { ref: "A—004", type: "Colección", title: `${drop3.name} — ${drop3.season}`, meta: `${drop3.pieces} piezas · Lookbook`, image: drop3.img, to: "/colecciones", span: "col-span-1 md:col-span-4", media: "aspect-square" },
  { ref: "A—005", type: "Flyer", title: flyer("f2").title, meta: flyer("f2").meta, image: flyer("f2").thumb, to: "/archive", span: "col-span-1 md:col-span-3", media: "aspect-[4/5]" },
  { ref: "A—006", type: "Foto", title: photo("sesion").title, meta: photo("sesion").meta, image: photo("sesion").thumb, to: "/archive?album=sesion", span: "col-span-2 md:col-span-12", media: "aspect-[16/9] md:aspect-[21/8]" },
];

export default function FromTheArchive() {
  return (
    <section className="px-5 md:px-12 py-16 md:py-24 border-t border-border bg-secondary/40">
      <div className="wrap">
        <SectionHeader
          index="04"
          kicker="Foto · Flyers · Colecciones"
          title="From the Archive"
          link={{ to: "/archive", label: "Explorar el archivo" }}
        />

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {picks.map((item, i) => (
            <motion.figure
              key={item.ref}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative ${item.span}`}
            >
              <Link to={item.to} className="flex flex-col h-full">
                <div className={`relative overflow-hidden bg-secondary border border-border ${item.media}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 "
                  />
                  <span className="absolute top-2 left-2 label bg-background/85 text-foreground px-1.5 py-0.5">
                    {item.ref}
                  </span>
                </div>
                <figcaption className="mt-2 label text-muted-foreground">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-foreground/90">{item.title}</span>
                    <span className="shrink-0">{item.type}</span>
                  </span>
                  <span className="hidden md:block mt-1 truncate">{item.meta}</span>
                </figcaption>
              </Link>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
