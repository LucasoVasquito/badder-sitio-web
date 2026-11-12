import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import PlayButton from "./PlayButton";
import { findTrackIndex } from "@/store/playerStore";
import { videos } from "@/data/visuals";
import { photos } from "@/data/archive";

// Selección editorial a partir del contenido real del sitio
const releaseTrack = findTrackIndex("Not Rules EP");
const featuredVideo = videos.find((v) => v.id === 2)!; // Badder Showcase @anguis._
const featuredAlbum = photos.find((p) => p.id === "capital")!;

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: i * 0.08 },
});

const Meta = ({ children }: { children: React.ReactNode }) => (
  <div className="label text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">{children}</div>
);

export default function LatestTransmissions() {
  return (
    <section id="latest" className="scroll-mt-20 px-5 md:px-12 py-16 md:py-24 border-t border-border">
      <div className="wrap">
        <SectionHeader index="02" kicker="Destacados" title="Latest Transmissions" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10">
          {/* T-01 · Último lanzamiento */}
          <motion.article {...reveal(0)} className="md:col-span-7 md:row-span-2 group">
            <Link to="/music" className="block">
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-secondary border border-border">
                <img
                  src="/audio/cover (6).webp"
                  alt="Uriel Galeano — Not Rules EP"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 bg-foreground text-background label px-2 py-1">
                  Latest release
                </span>
              </div>
            </Link>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <Meta>
                  <span>T—01</span>
                  <span>Release</span>
                  <span>EP · Incl. Agustin Barbei Psychokiller Remix</span>
                </Meta>
                <Link to="/music">
                  <h3 className="mt-2 font-display text-3xl md:text-5xl leading-none text-foreground group-hover:text-foreground/70 transition-colors">
                    Uriel Galeano — Not Rules EP
                  </h3>
                </Link>
              </div>
              <PlayButton trackIndex={releaseTrack} />
            </div>
          </motion.article>

          {/* T-02 · Registro audiovisual */}
          <motion.article {...reveal(1)} className="md:col-span-5 group">
            <a href={featuredVideo.url} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-video overflow-hidden bg-secondary border border-border">
                <img
                  src={featuredVideo.thumb}
                  alt={featuredVideo.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 right-3 bg-background/80 label text-foreground px-2 py-1">
                  ▶ {featuredVideo.duration}
                </span>
              </div>
              <div className="mt-4">
                <Meta>
                  <span>T—02</span>
                  <span>DJ set / Video</span>
                  <span>{featuredVideo.date}</span>
                </Meta>
                <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
                  {featuredVideo.title}&nbsp;<span className="label align-middle">↗</span>
                </h3>
              </div>
            </a>
          </motion.article>

          {/* T-03 · Pieza del archivo */}
          <motion.article {...reveal(2)} className="md:col-span-5 group">
            <Link to={`/archive?album=${featuredAlbum.id}`} className="block">
              <div className="grid grid-cols-5 gap-4 items-end">
                <div className="col-span-3 relative aspect-[4/5] overflow-hidden bg-secondary border border-border">
                  <img
                    src={featuredAlbum.thumb}
                    alt={featuredAlbum.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 "
                  />
                </div>
                <div className="col-span-2 pb-1">
                  <Meta>
                    <span>T—03</span>
                    <span>Archivo / Foto</span>
                  </Meta>
                  <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
                    {featuredAlbum.title}
                  </h3>
                  <p className="mt-2 label text-muted-foreground leading-relaxed">
                    {featuredAlbum.meta} · {featuredAlbum.imageCount} fotos
                  </p>
                </div>
              </div>
            </Link>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
