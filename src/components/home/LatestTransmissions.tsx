import { Link } from "react-router-dom";
import PlayButton from "./PlayButton";
import { findTrackIndex } from "@/store/playerStore";
import { releases, djSets } from "@/data/music";
import { posts } from "@/data/journal";
import { projects } from "@/data/projects";

// Primer pantallazo: la publicación más reciente como protagonista + índice de contenidos recientes.
const release = releases[0];
const releaseTrack = findTrackIndex(release.title);

interface Row {
  type: string;
  title: string;
  when: string;
  to: string;
  external?: boolean;
}

const rows: Row[] = [
  { type: "Lanzamiento", title: `${release.artist} — ${release.title}`, when: release.type, to: "/music" },
  ...posts.slice(0, 3).map((p) => ({ type: `Nota · ${p.category}`, title: p.title, when: p.date, to: `/culture/${p.id}` })),
  ...[...projects]
    .sort((a, b) => b.year - a.year)
    .slice(0, 3)
    .map((p) => ({ type: `Archivo · ${p.kind}`, title: p.title, when: String(p.season ?? p.year), to: `/archive/${p.id}` })),
  ...(djSets[0] ? [{ type: "DJ set · Video", title: djSets[0].title, when: djSets[0].date, to: djSets[0].url, external: true }] : []),
];

export default function LatestTransmissions() {
  return (
    <section aria-labelledby="ultimo" className="px-5 md:px-12 pt-8 md:pt-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 items-end">
          {/* Portada: reproducción completa, sin recorte */}
          <div className="md:col-span-5 md:order-2">
            <div className="relative border-2 border-border bg-secondary">
              <img src={release.cover} alt={`Portada de ${release.title}, de ${release.artist}`} className="w-full aspect-square object-contain" />
              <span className="absolute -top-0.5 -left-0.5 label bg-accent text-accent-foreground px-3 py-2 border-2 border-border">Último lanzamiento</span>
            </div>
          </div>

          <div className="md:col-span-7 md:order-1">
            <div className="label text-muted-foreground mb-3">
              {release.type} · {release.artist}
            </div>
            <h1 id="ultimo" className="font-display text-hero [text-wrap:balance]">
              {release.title}
            </h1>
            <p className="mt-5 text-lg max-w-[48ch]">
              {release.note ? `${release.note}. ` : ""}Música de {release.artist}, producida en La Plata.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PlayButton trackIndex={releaseTrack} label="Escuchar EP" className="!bg-foreground !text-background hover:!bg-accent hover:!text-accent-foreground" />
              <Link to="/music" className="inline-flex items-center min-h-[48px] px-5 border-2 border-foreground label hover:bg-foreground hover:text-background transition-colors">
                Ver música
              </Link>
            </div>
          </div>
        </div>

        {/* Índice reciente */}
        <div className="mt-12 md:mt-16">
          <h2 className="label pb-3 border-b-2 border-border">Reciente</h2>
          <ul>
            {rows.map((r) => {
              const inner = (
                <>
                  <span className="label text-muted-foreground md:col-span-3">{r.type}</span>
                  <span className="font-semibold text-lg leading-snug md:col-span-7 group-hover:underline underline-offset-4 decoration-2">{r.title}</span>
                  <span className="label text-muted-foreground md:col-span-2 md:text-right">
                    {r.when}
                    {r.external ? " ↗" : ""}
                  </span>
                </>
              );
              const cls =
                "group grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-1 py-4 px-1 border-b border-border min-h-[56px] items-baseline hover:bg-secondary transition-colors";
              return (
                <li key={r.to + r.title}>
                  {r.external ? (
                    <a href={r.to} target="_blank" rel="noopener noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={r.to} className={cls}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
