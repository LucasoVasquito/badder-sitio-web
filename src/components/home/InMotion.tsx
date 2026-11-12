import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import PlayButton from "./PlayButton";
import { playlist } from "@/data/audio";
import { findTrackIndex } from "@/store/playerStore";
import { djSets } from "@/data/music";

const releaseIndexes = ["Not Rules EP", "Club Motion", "Devil Voice", "Dope Energy", "Uesa"].map(findTrackIndex).filter((i) => i >= 0);
const sets = djSets.slice(0, 3);
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

// Música: bloque oscuro. Lista escuchable + DJ sets.
export default function InMotion() {
  return (
    <section className="surface-dark mt-20 md:mt-28 px-5 md:px-12 py-14 md:py-20">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader kicker="Releases · DJ sets" title="Música" link={{ to: "/music", label: "Toda la música" }} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12">
          <div className="lg:col-span-5">
            <h3 className="label text-muted-foreground pb-3 border-b border-border/50">Para escuchar acá</h3>
            <ul>
              {releaseIndexes.map((idx) => {
                const t = playlist[idx];
                return (
                  <li key={t.audio} className="flex items-center gap-4 py-3 border-b border-border/30">
                    <img src={t.cover} alt="" loading="lazy" className="w-14 h-14 object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="label text-muted-foreground truncate">{clean(t.artist)}</div>
                      <div className="font-semibold truncate">{clean(t.title)}</div>
                    </div>
                    <PlayButton trackIndex={idx} />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <h3 className="label text-muted-foreground pb-3 border-b border-border/50 mb-5">DJ sets en video</h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8">
              {sets.map((v, i) => (
                <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" className={`group block ${i === 0 ? "col-span-2" : "col-span-2 sm:col-span-1"}`}>
                  <div className="relative aspect-video overflow-hidden bg-secondary">
                    <img src={v.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 label bg-accent text-accent-foreground px-2 py-1">▶ {v.duration}</span>
                  </div>
                  <div className="mt-3 label text-muted-foreground">{v.date} · YouTube ↗</div>
                  <div className={`mt-1 leading-snug group-hover:underline underline-offset-4 decoration-2 ${i === 0 ? "font-display text-h2" : "font-semibold"}`}>{v.title}</div>
                </a>
              ))}
            </div>
            <Link to="/archive?filter=video" className="inline-flex items-center min-h-[44px] mt-8 label underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground">
              Registros audiovisuales en el archivo →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
