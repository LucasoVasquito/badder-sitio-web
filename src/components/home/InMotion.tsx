import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import PlayButton from "./PlayButton";
import { playlist } from "@/data/audio";
import { findTrackIndex } from "@/store/playerStore";
import { videos, motionProjects } from "@/data/visuals";

const releaseIndexes = ["Not Rules EP", "Club Motion", "Devil Voice", "Dope Energy", "Uesa"]
  .map(findTrackIndex)
  .filter((i) => i >= 0);

// DJ sets grabados (Showcases y Emergent x Badder)
const djSets = [4, 3, 6].map((id) => videos.find((v) => v.id === id)!).filter(Boolean);

// Sesiones / registros audiovisuales
const interview = videos.find((v) => v.id === 1)!;
const visualizer = motionProjects.find((p) => p.id === 12)!;
const sessions = [
  { title: interview.title, meta: `Entrevista · ${interview.date} · ${interview.duration}`, thumb: interview.thumb, url: interview.url },
  { title: visualizer.title, meta: `Visualizer · ${visualizer.date}`, thumb: visualizer.thumb, url: visualizer.link },
];

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

const Label = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <h3 className="font-mono-tight text-foreground border-b border-border pb-3 mb-5 flex justify-between">
    <span>{children}</span>
    <span className="text-muted-foreground">{n}</span>
  </h3>
);

export default function InMotion() {
  return (
    <section className="px-6 md:px-16 py-16 md:py-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="05" kicker="Music · Sets · Sesiones" title="Badder in Motion" link={{ to: "/music", label: "Ir a Music" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          {/* RELEASES: se escuchan en el reproductor flotante */}
          <div className="lg:col-span-4">
            <Label n={String(releaseIndexes.length).padStart(2, "0")}>Releases / Tracks</Label>
            <ul className="flex flex-col">
              {releaseIndexes.map((idx, i) => {
                const t = playlist[idx];
                return (
                  <motion.li
                    key={t.audio}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 py-3 border-b border-border/60"
                  >
                    <img src={t.cover} alt="" loading="lazy" className="w-12 h-12 object-cover border border-border shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono-tight text-muted-foreground truncate">{clean(t.artist)}</div>
                      <div className="text-sm text-foreground truncate">{clean(t.title)}</div>
                    </div>
                    <PlayButton trackIndex={idx} />
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* DJ SETS */}
          <div className="lg:col-span-8">
            <Label n={String(djSets.length).padStart(2, "0")}>DJ Sets</Label>
            <div className="grid grid-cols-2 gap-4">
              {djSets.map((v, i) => (
                <motion.a
                  key={v.id}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className={`group block ${i === 0 ? "col-span-2" : "col-span-1"}`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black border border-border">
                    <img
                      src={v.thumb}
                      alt={v.title}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-2 right-2 bg-background/80 font-mono-tight text-foreground px-2 py-1">
                      ▶ {v.duration}
                    </span>
                  </div>
                  <div className="mt-2 font-mono-tight text-muted-foreground">{v.date} · YouTube ↗</div>
                  <div className={`mt-1 text-foreground leading-snug group-hover:text-foreground/70 transition-colors ${i === 0 ? "font-serif text-2xl uppercase" : "text-sm"}`}>
                    {v.title}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* SESIONES / REGISTROS */}
          <div className="lg:col-span-12">
            <Label n={String(sessions.length).padStart(2, "0")}>Sesiones / Registros audiovisuales</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sessions.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex gap-4 items-center">
                  <div className="w-36 md:w-48 aspect-video shrink-0 overflow-hidden bg-black border border-border">
                    <img src={s.thumb} alt={s.title} loading="lazy" className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono-tight text-muted-foreground">{s.meta}</div>
                    <div className="mt-1 text-sm text-foreground leading-snug group-hover:text-foreground/70 transition-colors">{s.title}&nbsp;↗</div>
                  </div>
                </a>
              ))}
            </div>
            <Link to="/visuals" className="inline-block mt-8 font-mono-tight text-muted-foreground hover:text-foreground border-b border-border pb-1 transition-colors">
              Archivo audiovisual completo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
