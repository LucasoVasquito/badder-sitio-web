import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import PlayButton from "@/components/home/PlayButton";
import { releases, djSets, sessions } from "@/data/music";
import { artists } from "@/data/people";
import { findTrackByAudio } from "@/store/playerStore";
import { usePageMeta } from "@/lib/usePageMeta";
import type { VideoEntry } from "@/data/visuals";

const sections = [
  { id: "releases", label: "Lanzamientos" },
  { id: "dj-sets", label: "DJ sets" },
  { id: "sessions", label: "Sesiones" },
  { id: "artists", label: "Artistas" },
];

function SectionTitle({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b-2 border-border pb-3 mb-8">
      <h2 id={`${id}-title`} className="font-display text-title">
        {title}
      </h2>
      <span className="label text-muted-foreground pb-1">{count}</span>
    </div>
  );
}

function VideoCard({ v, large = false }: { v: VideoEntry; large?: boolean }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative aspect-video overflow-hidden bg-secondary">
        <img src={v.thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
        <span className="absolute bottom-0 right-0 bg-accent text-accent-foreground label px-2 py-1">▶ {v.duration}</span>
      </div>
      <div className="mt-3 label text-muted-foreground flex flex-wrap gap-x-3">
        <span>{v.date}</span>
        <span>YouTube ↗</span>
      </div>
      <h3 className={`mt-1 leading-snug group-hover:underline underline-offset-4 decoration-2 ${large ? "font-display text-h2" : "font-semibold text-lg"}`}>{v.title}</h3>
      {(v.master || v.edition) && (
        <div className="mt-2 label text-muted-foreground leading-relaxed">
          {v.master && <div>Master: {v.master}</div>}
          {v.edition && <div>Edición: {v.edition}</div>}
        </div>
      )}
    </a>
  );
}

export default function Music() {
  usePageMeta({ title: "Música", description: "Lanzamientos, DJ sets, sesiones y artistas vinculados a BADDER." });

  return (
    <main data-accent="lime" className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Lanzamientos / DJ sets / Sesiones / Artistas" title="Música">
          <nav aria-label="Secciones de música" className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="label inline-flex items-center min-h-[44px] border-2 border-foreground px-4 hover:bg-accent hover:text-accent-foreground transition-colors">
                {s.label}
              </a>
            ))}
          </nav>
        </PageHeader>
      </div>

      {/* LANZAMIENTOS: bloque oscuro */}
      <section id="releases" aria-labelledby="releases-title" className="surface-dark scroll-mt-20 px-5 md:px-12 py-12 md:py-16 mb-16 md:mb-24">
        <div className="max-w-[1440px] mx-auto">
          <SectionTitle id="releases" title="Lanzamientos" count={releases.length} />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
            {releases.map((r) => (
              <li key={r.id} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 items-start">
                <img src={r.cover} alt={`Portada de ${r.title}, de ${r.artist}`} loading="lazy" className="w-full aspect-square object-contain bg-secondary" />
                <div className="min-w-0">
                  <div className="label text-muted-foreground">
                    {r.type} · {r.artist}
                    {r.year ? ` · ${r.year}` : ""}
                  </div>
                  <h3 className="mt-1 font-display text-h2">{r.title}</h3>
                  {r.note && <p className="mt-1 text-muted-foreground">{r.note}</p>}

                  <ol className="mt-4 border-t border-border/40">
                    {r.tracks.map((t, n) => {
                      const idx = findTrackByAudio(t.audio);
                      return (
                        <li key={t.title} className="flex items-center gap-3 py-2 border-b border-border/30">
                          <span className="label text-muted-foreground w-5 shrink-0">{n + 1}</span>
                          <span className="flex-1 min-w-0 truncate">{t.title}</span>
                          {t.preview && <span className="label text-muted-foreground">Preview</span>}
                          {idx >= 0 ? <PlayButton trackIndex={idx} /> : <span className="label text-muted-foreground">Sin audio</span>}
                        </li>
                      );
                    })}
                  </ol>

                  {r.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-4">
                      {r.links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="label underline underline-offset-4 decoration-2">
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        {/* DJ SETS */}
        <section id="dj-sets" aria-labelledby="dj-sets-title" className="scroll-mt-20 mb-20 md:mb-28">
          <SectionTitle id="dj-sets" title="DJ sets" count={djSets.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
            {djSets.map((v, i) => (
              <div key={v.id} className={i === 0 ? "md:col-span-2" : ""}>
                <VideoCard v={v} large={i === 0} />
              </div>
            ))}
          </div>
        </section>

        {/* SESIONES */}
        <section id="sessions" aria-labelledby="sessions-title" className="scroll-mt-20 mb-20 md:mb-28">
          <SectionTitle id="sessions" title="Sesiones" count={sessions.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((v) => (
              <VideoCard key={v.id} v={v} large />
            ))}
          </div>
          <p className="mt-8 label text-muted-foreground">
            Motion, visualizers y más registros en el{" "}
            <Link to="/archive?filter=video" className="text-foreground underline underline-offset-4 decoration-2 hover:bg-accent">
              archivo de video →
            </Link>
          </p>
        </section>

        {/* ARTISTAS */}
        <section id="artists" aria-labelledby="artists-title" className="scroll-mt-20">
          <SectionTitle id="artists" title="Artistas" count={artists.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {artists.map((a) => {
              const own = releases.filter((r) => r.artist === a.name);
              return (
                <article key={a.id} className="grid grid-cols-5 gap-5">
                  {a.presskit && (
                    <a href={a.presskit.url} target="_blank" rel="noopener noreferrer" className="col-span-2 block" aria-label={`Presskit de ${a.name}`}>
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        <img src={a.presskit.cover} alt={`Presskit de ${a.name}`} loading="lazy" className="w-full h-full object-contain" />
                      </div>
                    </a>
                  )}
                  <div className={a.presskit ? "col-span-3" : "col-span-5"}>
                    <h3 className="font-display text-h2">{a.name}</h3>
                    <p className="mt-2 label text-muted-foreground">{a.roles}</p>
                    {own.length > 0 && (
                      <ul className="mt-4 space-y-1">
                        {own.map((r) => (
                          <li key={r.id}>
                            <span className="label mr-2 text-muted-foreground">{r.type}</span>
                            <span className="font-semibold">{r.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {a.presskit && (
                      <a href={a.presskit.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center min-h-[44px] px-4 border-2 border-foreground label hover:bg-accent hover:text-accent-foreground transition-colors">
                        Presskit / Booking ↗
                      </a>
                    )}
                    {a.presskit && <p className="mt-3 label text-muted-foreground">Diseño presskit: {a.presskit.design}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
