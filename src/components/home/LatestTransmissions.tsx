import { Link } from "react-router-dom";
import { Marquee, Sticker, ThornFrame, FontCycleTitle } from "@/components/flyer";
import { usePlayerStore, findTrackByAudio } from "@/store/playerStore";
import { releases } from "@/data/music";
import { playlist } from "@/data/audio";
import { Play, Pause } from "lucide-react";

const featured = releases[0];
const featuredTrack = findTrackByAudio(featured.tracks[0]?.audio);
const lineup = releases.slice(1);

// Bloques de color con desplazamiento horizontal distinto (tipo lineup de flyer). A 390 px el desplazamiento baja a 0.
const BLOCKS = [
  { cls: "bg-[hsl(var(--a))] text-[hsl(var(--a-fg))]", shift: "md:ml-0" },
  { cls: "bg-[hsl(var(--b))] text-[hsl(var(--b-fg))]", shift: "md:ml-[12%]" },
  { cls: "bg-[hsl(var(--paper))] text-[hsl(var(--ink))]", shift: "md:ml-[4%]" },
  { cls: "bg-background text-foreground border-2 border-[hsl(var(--paper))]", shift: "md:ml-[18%]" },
  { cls: "bg-[hsl(var(--a))] text-[hsl(var(--a-fg))]", shift: "md:ml-[8%]" },
];

const tag = (r: (typeof releases)[number]) => (r.tracks.some((t) => t.preview) ? "[Preview]" : `[${r.type}]`);

function LineupItem({ release, idx, block }: { release: (typeof releases)[number]; idx: number; block: (typeof BLOCKS)[number] }) {
  const trackIndex = findTrackByAudio(release.tracks.find((t) => t.audio)?.audio);
  const playing = usePlayerStore((s) => s.index === trackIndex && s.isPlaying);
  const playTrack = usePlayerStore((s) => s.playTrack);
  const track = playlist[trackIndex];

  return (
    <li className={`${block.shift} md:w-[78%]`}>
      <div className={`${block.cls} flex items-center gap-4 p-3 ${playing ? "outline outline-4 outline-offset-2 outline-[hsl(var(--paper))]" : ""}`}>
        <img src={release.cover} alt="" loading="lazy" className="w-16 h-16 md:w-20 md:h-20 object-cover shrink-0 border-2 border-[hsl(var(--ink))]" />
        <div className="min-w-0 flex-1">
          <div className="label opacity-80">{tag(release)} · {release.artist.replace(/\s+/g, " ")}</div>
          <div className="f-news font-bold text-xl md:text-3xl leading-tight truncate">{release.title}</div>
          {playing && <div className="label mt-1">▶ Sonando</div>}
        </div>
        {track && (
          <button
            type="button"
            onClick={() => playTrack(trackIndex)}
            aria-label={playing ? `Pausar ${release.title}` : `Escuchar ${release.title}`}
            aria-pressed={playing}
            className="shrink-0 w-12 h-12 flex items-center justify-center border-2 border-current hover:bg-[hsl(var(--ink))] hover:text-[hsl(var(--paper))] transition-colors"
            data-idx={idx}
          >
            {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
        )}
      </div>
    </li>
  );
}

export default function LatestTransmissions() {
  const playing = usePlayerStore((s) => s.index === featuredTrack && s.isPlaying);
  const playTrack = usePlayerStore((s) => s.playTrack);

  return (
    <section aria-labelledby="latest" className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto relative">
        <div className="label text-muted-foreground mb-4">Releases · Preview</div>
        <FontCycleTitle id="latest" font="doto" as="h2" className="text-[clamp(2.4rem,9vw,9.5rem)] leading-[0.85] t-glitch">
          <span className="block">Latest</span>
          <span className="block t-stroke">Transmissions</span>
        </FontCycleTitle>

        <div className="mt-12 md:mt-16 grid md:grid-cols-12 gap-x-10 gap-y-14">
          {/* Portada */}
          <div className="md:col-span-5 relative">
            <div className="-rotate-[2.5deg] max-w-[520px]">
              <ThornFrame>
                <img src={featured.cover} alt={`Portada de ${featured.title}, de ${featured.artist}`} className="w-full aspect-square object-cover block" />
              </ThornFrame>
              <Sticker
                tone="b"
                rotate={8}
                onClick={() => playTrack(featuredTrack)}
                ariaLabel={playing ? `Pausar ${featured.title}` : `Escuchar ${featured.title}`}
                pressed={playing}
                className="absolute -bottom-6 -right-2 md:-right-8 z-10"
              >
                {playing ? "PAUSA" : "PLAY"}
              </Sticker>
            </div>
            <div className="mt-8 max-w-[520px]">
              <div className="label text-muted-foreground">[{featured.type}] · {featured.artist}</div>
              <div className="f-news font-bold text-3xl md:text-4xl leading-tight mt-1">{featured.title}</div>
              {featured.note && <p className="mt-1 italic text-lg">{featured.note}</p>}
              <Link to="/music" className="inline-flex items-center min-h-[44px] mt-4 label underline underline-offset-4 decoration-2 hover:bg-accent hover:text-accent-foreground">
                Toda la música →
              </Link>
            </div>
          </div>

          {/* Lineup */}
          <ul className="md:col-span-7 flex flex-col gap-4 md:gap-5 self-start">
            {lineup.map((r, i) => (
              <LineupItem key={r.id} release={r} idx={i} block={BLOCKS[i % BLOCKS.length]} />
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 bg-[hsl(var(--a))] text-[hsl(var(--a-fg))] rotate-[1.2deg] py-1.5">
        <Marquee items={releases.map((r) => `${r.artist.replace(/\s+/g, " ")} — ${r.title}`)} itemClassName="f-akira text-sm md:text-lg" speed={50} separator="✕" reverse />
      </div>
    </section>
  );
}
