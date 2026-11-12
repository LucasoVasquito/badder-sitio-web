import { Link } from "react-router-dom";
import { Scanlines } from "@/components/flyer";
import FontCycleTitle from "@/components/flyer/FontCycleTitle";
import { djSets } from "@/data/music";

// Badder in Motion: foto a sangre muy difusa + scanlines; tarjetas de video con miniaturas reales de YouTube.
const sets = djSets.slice(0, 3);
const ROT = ["-rotate-[1.5deg]", "rotate-[1deg]", "-rotate-[0.5deg]"];

export default function InMotion() {
  return (
    <section className="relative isolate overflow-hidden surface-dark px-5 md:px-12 py-20 md:py-28">
      <img src="/sesion/foto (1).webp" alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-10 w-full h-full object-cover opacity-50" style={{ filter: "blur(14px) saturate(1.3)", transform: "scale(1.08)" }} />
      <Scanlines className="-z-[5]" />
      <div className="absolute inset-0 -z-[6] bg-gradient-to-b from-[hsl(var(--ink))] via-transparent to-[hsl(var(--ink))] opacity-70" />

      <div className="max-w-[1440px] mx-auto">
        <div className="label text-muted-foreground mb-3">DJ sets · Video</div>
        <FontCycleTitle
          id="motion"
          font="akira"
          as="h2"
          className="text-[clamp(1.9rem,7.2vw,7.5rem)] leading-[0.95] text-white mix-blend-difference [filter:url(#warp)]"
        >
          Badder in<br />Motion
        </FontCycleTitle>

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {sets.map((v, i) => (
            <li key={v.id} className={i === 1 ? "md:mt-12" : ""}>
              <a href={v.url} target="_blank" rel="noopener noreferrer" className={`cut group block ${ROT[i]} border-2 border-foreground bg-background`}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={v.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 label bg-accent text-accent-foreground px-2 py-1">▶ {v.duration}</span>
                </div>
                <div className="p-3">
                  <div className="label text-muted-foreground">{v.date} · YouTube ↗</div>
                  <div className="f-news font-bold text-xl leading-snug mt-1">{v.title}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <Link to="/archive?filter=video" className="inline-flex items-center min-h-[48px] mt-14 px-6 border-2 border-foreground bg-background label hover:bg-accent hover:text-accent-foreground transition-colors">
          Registros audiovisuales en el archivo →
        </Link>
      </div>
    </section>
  );
}
