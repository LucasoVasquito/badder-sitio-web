import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SmartImage from "@/components/site/SmartImage";
import Lightbox, { type LightboxImage } from "@/components/site/Lightbox";
import { btn } from "@/lib/ui";
import { projects, getProject, categoriesOf, categoryLabels, type ArchiveImage } from "@/data/projects";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

const PAGE = 18;

function Block({ id, title, count, children }: { id: string; title: string; count: number; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-16 md:mt-20">
      <h2 id={id} className="label text-foreground border-b border-border pb-3 mb-6 flex justify-between">
        <span>{title}</span>
        <span className="text-muted-foreground">{String(count).padStart(2, "0")}</span>
      </h2>
      {children}
    </section>
  );
}

/** Grilla de imágenes con carga progresiva: muestra PAGE y suma de a PAGE. */
function ImageGrid({ images, onOpen, captions = false, cols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }: { images: ArchiveImage[]; onOpen: (i: number) => void; captions?: boolean; cols?: string }) {
  const [shown, setShown] = useState(PAGE);
  return (
    <>
      <ul className={`grid ${cols} gap-2 md:gap-3`}>
        {images.slice(0, shown).map((img, i) => (
          <li key={img.src}>
            <button type="button" onClick={() => onOpen(i)} className="group block w-full text-left" aria-label={`Ampliar ${img.title ?? `imagen ${i + 1}`}`}>
              <div className="aspect-[4/5] overflow-hidden bg-secondary border border-border">
                <SmartImage src={img.src} thumb alt={img.title ?? ""} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              {captions && (img.title || img.credit) && (
                <div className="mt-2">
                  {img.title && <div className="label text-foreground truncate">{img.title}</div>}
                  {img.credit && <div className="label text-muted-foreground truncate">{img.credit}</div>}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      {shown < images.length && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + PAGE)} className={btn.secondary}>
            Cargar más ({images.length - shown})
          </button>
        </div>
      )}
    </>
  );
}

export default function ArchiveProject() {
  const { projectId = "" } = useParams();
  const project = getProject(projectId);
  const [viewer, setViewer] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  usePageMeta({
    title: project?.title ?? "Archive",
    description: project ? `${project.kind} · ${project.season ?? project.year}${project.location ? ` · ${project.location}` : ""} — Archivo BADDER.` : undefined,
    image: project?.cover,
  });

  const nav = useMemo(() => {
    const i = projects.findIndex((p) => p.id === projectId);
    return { prev: projects[i - 1], next: projects[i + 1] };
  }, [projectId]);

  if (!project) return <NotFound />;
  const p = project;

  const open = (list: ArchiveImage[], fallbackCaption: string, credit?: string) => (index: number) =>
    setViewer({
      index,
      images: list.map((img, i) => ({
        src: img.src,
        alt: img.title ?? `${fallbackCaption} — ${i + 1}`,
        caption: img.title ?? fallbackCaption,
        credit: img.credit ?? credit,
      })),
    });

  return (
    <main key={p.id} className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 wrap">
        <Link to="/archive" className="inline-block mb-10 label text-muted-foreground hover:text-foreground transition-colors">
          ← Volver al archivo
        </Link>

        <header className="grid md:grid-cols-12 gap-8 border-b border-border pb-10">
          <div className="md:col-span-7">
            <div className="label text-muted-foreground mb-4 flex flex-wrap gap-x-4">
              <span className="text-foreground">{p.kind}</span>
              <span>{p.season ?? p.year}</span>
              {p.location && <span>{p.location}</span>}
            </div>
            <h1 className="font-display text-foreground leading-[0.95] tracking-tight text-[clamp(2.25rem,7vw,5rem)] break-words">{p.title}</h1>
            {p.summary && <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">{p.summary}</p>}
            <div className="mt-6 flex flex-wrap gap-2">
              {categoriesOf(p).map((c) => (
                <Link key={c} to={`/archive?filter=${c}`} className="label border border-border px-2 py-1 text-muted-foreground hover:text-foreground">
                  {categoryLabels[c]}
                </Link>
              ))}
            </div>
          </div>
          {p.credits.length > 0 && (
            <dl className="md:col-span-5 md:pl-8 md:border-l border-border grid grid-cols-[auto,1fr] gap-x-6 gap-y-3 content-start text-sm">
              <dt className="col-span-2 label text-foreground mb-1">Créditos</dt>
              {p.credits.map((c) => (
                <div key={c.role} className="contents">
                  <dt className="label text-muted-foreground pt-0.5">{c.role}</dt>
                  <dd className="text-foreground">{c.names}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {p.photoSets.map((set) => (
          <Block key={set.albumId} id={`set-${set.albumId}`} title={`Fotografía — ${set.title}`} count={set.images.length}>
            {set.credit && <p className="-mt-3 mb-6 label text-muted-foreground">Fotos: {set.credit}</p>}
            <ImageGrid images={set.images} onOpen={open(set.images, set.title, set.credit && `Fotos: ${set.credit}`)} />
          </Block>
        ))}

        {p.graphics.length > 0 && (
          <Block id="graphics" title="Gráfica / Flyers" count={p.graphics.length}>
            <ImageGrid images={p.graphics} captions onOpen={open(p.graphics, p.title)} cols="grid-cols-2 md:grid-cols-4" />
          </Block>
        )}

        {p.videos.length > 0 && (
          <Block id="videos" title="Video" count={p.videos.length}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {p.videos.map((v) => (
                <li key={v.url}>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-video overflow-hidden bg-secondary border border-border">
                      <img src={v.thumb} alt={v.title} loading="lazy" className="w-full h-full object-cover opacity-85 transition-all duration-700 group-hover:opacity-100" />
                      <span className="absolute bottom-2 right-2 bg-background/80 label text-foreground px-2 py-1">▶ {v.duration ?? "Ver"}</span>
                    </div>
                    <div className="mt-3 label text-muted-foreground flex flex-wrap gap-x-3">
                      <span className="text-foreground">{v.kind}</span>
                      {v.date && <span>{v.date}</span>}
                      <span>YouTube ↗</span>
                    </div>
                    <h3 className="mt-1 text-foreground group-hover:text-foreground/70">{v.title}</h3>
                    {v.description && <p className="mt-1 text-xs text-muted-foreground">{v.description}</p>}
                    {v.credit && <p className="mt-1 label text-muted-foreground">{v.credit}</p>}
                  </a>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {p.designs.length > 0 && (
          <Block id="designs" title="Lookbook / Diseños" count={p.designs.length}>
            <ImageGrid images={p.designs} captions onOpen={open(p.designs, p.title)} />
          </Block>
        )}

        {p.process.length > 0 && (
          <Block id="process" title="Procesos / Conceptos, mockups y referencias" count={p.process.length}>
            <ImageGrid images={p.process} captions onOpen={open(p.process, p.title)} />
          </Block>
        )}

        <nav aria-label="Otros proyectos" className="mt-20 pt-8 border-t border-border grid grid-cols-2 gap-6 label">
          <div>
            {nav.prev && (
              <Link to={`/archive/${nav.prev.id}`} className="text-muted-foreground hover:text-foreground">
                ← {nav.prev.title}
              </Link>
            )}
          </div>
          <div className="text-right">
            {nav.next && (
              <Link to={`/archive/${nav.next.id}`} className="text-muted-foreground hover:text-foreground">
                {nav.next.title} →
              </Link>
            )}
          </div>
        </nav>
      </div>

      <Lightbox
        images={viewer?.images ?? []}
        index={viewer?.index ?? null}
        onClose={() => setViewer(null)}
        onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
      />
    </main>
  );
}
