import { Link } from "react-router-dom";
import { BlurImage, Checker, FontCycleTitle, Marquee, Sticker, ThornFrame } from "@/components/flyer";
import { getProject, projects, type ArchiveProject } from "@/data/projects";

// Flyers y fotos rotados sobre damero, desenfocados hasta el hover/foco. Datos reales de src/data/projects.ts.
const IDS = ["drop-3", "rosset", "levels", "emergent"];
const picks = IDS.map(getProject).filter(Boolean) as ArchiveProject[];
const marqueeItems = projects.slice(0, 8).map((p) => p.title);

const LAYOUT = [
  { rot: "-rotate-[3deg]", mt: "md:mt-0", frame: true },
  { rot: "rotate-[2deg]", mt: "md:mt-20", frame: false },
  { rot: "-rotate-[1.5deg]", mt: "md:mt-6", frame: false },
  { rot: "rotate-[3deg]", mt: "md:mt-28", frame: false },
];

export default function FromTheArchive() {
  return (
    <section className="relative overflow-hidden bg-[#141413] pb-24">
      <Checker size={96} />
      <div className="relative z-10 bg-[hsl(var(--a))] text-[hsl(var(--a-fg))] -rotate-[1deg] py-2 -mt-1 mb-14 md:mb-20">
        <Marquee items={marqueeItems} itemClassName="f-akira text-lg md:text-2xl" speed={80} />
      </div>

      <div className="relative z-10 px-5 md:px-12 max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="label text-muted-foreground mb-3">Eventos · Drops · Series · Gráfica</div>
            <FontCycleTitle id="archive" font="hitme" as="h2" className="text-[clamp(3rem,10vw,9rem)] leading-[0.85] t-glitch">
              From the<br />Archive
            </FontCycleTitle>
          </div>
        </div>

        <ul className="grid gap-x-8 gap-y-14 grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]">
          {picks.map((p, i) => {
            const l = LAYOUT[i % LAYOUT.length];
            const art = p.kind === "Gráfica" || p.kind === "Drop";
            const inner = (
              <BlurImage
                src={p.cover}
                alt={p.title}
                blur={art ? 3 : 5}
                className={`w-full aspect-[4/5] ${art ? "object-contain bg-secondary" : "object-cover"}`}
              />
            );
            return (
              <li key={p.id} className={l.mt}>
                <Link to={`/archive/${p.id}`} className={`cut relative block ${l.rot} max-md:!rotate-[-1.5deg]`}>
                  {l.frame ? <ThornFrame>{inner}</ThornFrame> : <div className="border-2 border-foreground">{inner}</div>}
                  <Sticker tone={i % 2 ? "b" : "a"} rotate={i % 2 ? 5 : -4} className="absolute top-2 -left-2 z-10">
                    {p.season ?? p.year}
                  </Sticker>
                  <Sticker tone="paper" rotate={-2} className="absolute bottom-3 -right-2 max-w-[85%] z-10 !text-[11px]">
                    {p.title}
                  </Sticker>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link to="/archive" className="mt-16 inline-flex items-center min-h-[48px] px-6 border-2 border-foreground bg-background label hover:bg-accent hover:text-accent-foreground transition-colors">
          Ver archivo completo →
        </Link>
      </div>
    </section>
  );
}
