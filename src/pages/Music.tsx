import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import PlayButton from "@/components/home/PlayButton";
import { releases, djSets, sessions } from "@/data/music";
import { artists } from "@/data/people";
import { findTrackByAudio } from "@/store/playerStore";
import { usePageMeta } from "@/lib/usePageMeta";
import type { VideoEntry } from "@/data/visuals";

const sections = [
  { id: "releases", label: "Releases" },
  { id: "dj-sets", label: "DJ Sets" },
  { id: "sessions", label: "Sessions" },
  { id: "artists", label: "Artists" },
];

function SectionTitle({ id, n, title, count }: { id: string; n: string; title: string; count: number }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-border pb-4 mb-8">
      <h2 id={`${id}-title`} className="font-display text-3xl md:text-5xl text-foreground leading-none">
        <span className="label text-foreground align-top mr-3">{n}</span>
        {title}
      </h2>
      <span className="label text-muted-foreground">{String(count).padStart(2, "0")}</span>
    </div>
  );
}

function VideoCard({ v, large = false }: { v: VideoEntry; large?: boolean }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative aspect-video overflow-hidden bg-secondary border border-border">
        <img src={v.thumb} alt={v.title} loading="lazy" className="w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.03]" />
        <span className="absolute bottom-2 right-2 bg-background/80 label text-foreground px-2 py-1">▶ {v.duration}</span>
      </div>
      <div className="mt-3 label text-muted-foreground flex flex-wrap gap-x-3">
        <span>{v.date}</span>
        <span>YouTube ↗</span>
      </div>
      <h3 className={`mt-1 text-foreground leading-snug group-hover:text-foreground/70 transition-colors ${large ? "font-display text-2xl md:text-3xl " : "text-sm"}`}>
        {v.title}
      </h3>
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
  usePageMeta({ title: "Music", description: "Releases, DJ sets, sesiones y artistas vinculados a BADDER." });

  return (
    <main className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Releases / DJ sets / Sessions / Artists" title="Music">
          <nav aria-label="Secciones de Music" className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="label border border-border px-3 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors">
                {s.label}
              </a>
            ))}
          </nav>
        </PageHeader>

        {/* RELEASES */}
        <section id="releases" aria-labelledby="releases-title" className="scroll-mt-24 mb-20 md:mb-28">
          <SectionTitle id="releases" n="01" title="Releases" count={releases.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {releases.map((r, i) => (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.05 }}
              >
                <div className="relative aspect-square overflow-hidden bg-secondary border border-border">
                  <img src={r.cover} alt={`${r.artist} — ${r.title}`} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-background/90 border border-border px-2 py-1 label text-foreground">{r.type}</span>
                </div>
                <div className="mt-3 label text-muted-foreground flex flex-wrap gap-x-3">
                  <span>{r.artist}</span>
                  {r.year && <span>{r.year}</span>}
                  {r.note && <span>{r.note}</span>}
                </div>
                <h3 className="mt-1 font-display text-2xl text-foreground leading-tight">{r.title}</h3>

                <ol className="mt-4 border-t border-border">
                  {r.tracks.map((t, n) => {
                    const idx = findTrackByAudio(t.audio);
                    return (
                      <li key={t.title} className="flex items-center gap-3 py-2 border-b border-border/60">
                        <span className="label text-muted-foreground w-5">{String(n + 1).padStart(2, "0")}</span>
                        <span className="flex-1 min-w-0 text-sm text-foreground truncate">{t.title}</span>
                        {t.preview && <span className="label text-muted-foreground">Preview</span>}
                        {idx >= 0 ? (
                          <PlayButton trackIndex={idx} className="!w-9 !h-9" />
                        ) : (
                          <span className="label text-muted-foreground">Sin audio</span>
                        )}
                      </li>
                    );
                  })}
                </ol>

                {r.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {r.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="label text-foreground border-b border-foreground/40 pb-0.5">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* DJ SETS */}
        <section id="dj-sets" aria-labelledby="dj-sets-title" className="scroll-mt-24 mb-20 md:mb-28">
          <SectionTitle id="dj-sets" n="02" title="DJ Sets" count={djSets.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
            {djSets.map((v, i) => (
              <div key={v.id} className={i === 0 ? "md:col-span-2" : ""}>
                <VideoCard v={v} large={i === 0} />
              </div>
            ))}
          </div>
        </section>

        {/* SESSIONS */}
        <section id="sessions" aria-labelledby="sessions-title" className="scroll-mt-24 mb-20 md:mb-28">
          <SectionTitle id="sessions" n="03" title="Sessions" count={sessions.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.map((v) => (
              <VideoCard key={v.id} v={v} large />
            ))}
          </div>
          <p className="mt-8 label text-muted-foreground">
            Motion, visualizers y más registros en el{" "}
            <Link to="/archive?filter=video" className="text-foreground underline underline-offset-4">
              archivo de video →
            </Link>
          </p>
        </section>

        {/* ARTISTS */}
        <section id="artists" aria-labelledby="artists-title" className="scroll-mt-24">
          <SectionTitle id="artists" n="04" title="Artists" count={artists.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {artists.map((a) => {
              const own = releases.filter((r) => r.artist === a.name);
              return (
                <article key={a.id} className="grid grid-cols-5 gap-5">
                  {a.presskit && (
                    <a href={a.presskit.url} target="_blank" rel="noopener noreferrer" className="col-span-2 group block">
                      <div className="aspect-[4/5] overflow-hidden border border-border bg-secondary">
                        <img src={a.presskit.cover} alt={`Presskit de ${a.name}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                      </div>
                    </a>
                  )}
                  <div className={a.presskit ? "col-span-3" : "col-span-5"}>
                    <h3 className="font-display text-3xl text-foreground leading-none">{a.name}</h3>
                    <p className="mt-2 label text-muted-foreground">{a.roles}</p>
                    {own.length > 0 && (
                      <ul className="mt-4 text-sm text-muted-foreground space-y-1">
                        {own.map((r) => (
                          <li key={r.id}>
                            <span className="label mr-2">{r.type}</span>
                            <span className="text-foreground">{r.title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {a.presskit && (
                      <a href={a.presskit.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block label text-foreground border-b border-foreground/40 pb-1 hover:border-foreground">
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
