import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Markdown from "@/components/site/Markdown";
import Lightbox from "@/components/site/Lightbox";
import { articles, getArticle, relatedTo, formatDate, excerptOf } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

// Artículo: lectura a 18 px / ~66 caracteres, título en PT Serif, imágenes completas y lightbox.
export default function CultureArticle() {
  const { postId = "" } = useParams();
  const article = getArticle(postId);
  const [viewer, setViewer] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  usePageMeta({
    title: article?.title ?? "Notas",
    description: article ? `${article.subtitle}. ${excerptOf(article.body, 120)}` : undefined,
    image: article?.cover,
    type: "article",
  });

  if (!article) return <NotFound />;
  const a = article;
  const idx = articles.findIndex((x) => x.id === a.id);
  const newer = articles[idx - 1];
  const older = articles[idx + 1];
  const related = relatedTo(a);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: a.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* el usuario canceló */
    }
  };

  return (
    <main data-accent="lime" className="bg-background min-h-svh-fb pt-10 md:pt-14 pb-16 overflow-hidden">
      <article className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <Link to="/culture" className="inline-flex items-center min-h-[44px] mb-6 label underline underline-offset-4 decoration-2 hover:bg-accent">
          ← Notas
        </Link>

        <header className="max-w-[60rem]">
          <div className="label text-muted-foreground flex flex-wrap gap-x-4">
            <Link to={`/culture?cat=${a.category.toLowerCase()}`} className="text-foreground underline underline-offset-4 decoration-2">
              {a.category}
            </Link>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
          </div>
          <h1 className="mt-4 font-serif font-bold text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1.05] [text-wrap:balance]">{a.title}</h1>
          <p className="mt-5 font-serif text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] leading-snug text-muted-foreground max-w-[44ch]">{a.subtitle}</p>
        </header>

        {/* Portada completa, sin recorte */}
        <figure className="mt-10 bg-secondary border border-border">
          <img src={a.cover} alt={a.title} className="w-full max-h-[78vh] object-contain" />
        </figure>

        <div className="mt-12 grid md:grid-cols-12 gap-x-10 gap-y-8">
          <aside className="md:col-span-3 order-2 md:order-1 label flex md:flex-col gap-4 md:sticky md:top-24 self-start">
            <div className="text-muted-foreground">
              {a.category}
              <br />
              {formatDate(a.date)}
            </div>
            <button type="button" onClick={share} className="inline-flex items-center min-h-[44px] w-fit px-4 border-2 border-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              {copied ? "Link copiado ✓" : "Compartir"}
            </button>
          </aside>

          <div className="md:col-span-8 order-1 md:order-2">
            <Markdown source={a.body} />

            {a.images.length > 0 && (
              <section aria-label="Imágenes" className="mt-12 grid grid-cols-2 gap-4">
                {a.images.map((img, i) => (
                  <button key={img.src} type="button" onClick={() => setViewer(i)} className="block text-left group" aria-label={`Ampliar imagen ${i + 1}`}>
                    <span className="block bg-secondary border border-border">
                      <img src={img.src} alt={img.caption ?? ""} loading="lazy" className="w-full aspect-[4/5] object-contain" />
                    </span>
                    {img.caption && <span className="mt-2 block label text-muted-foreground">{img.caption}</span>}
                  </button>
                ))}
              </section>
            )}

            {a.references.length > 0 && (
              <section aria-labelledby="refs" className="mt-12 border-t-2 border-border pt-6 max-w-[66ch]">
                <h2 id="refs" className="label mb-4">Referencias y fuentes</h2>
                <ol className="space-y-2 list-decimal pl-5">
                  {a.references.map((r) => (
                    <li key={r.text}>
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 hover:bg-accent">
                          {r.text}
                        </a>
                      ) : (
                        r.text
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-20 border-t-2 border-border pt-6">
            <h2 id="related" className="label mb-6">Seguí leyendo</h2>
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/culture/${r.id}`} className="group flex gap-4">
                    <img src={r.cover} alt="" loading="lazy" className="w-28 aspect-square object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="label text-muted-foreground">
                        {r.category} · {formatDate(r.date)}
                      </div>
                      <div className="mt-1 font-serif font-bold text-xl leading-tight group-hover:underline underline-offset-4 decoration-2">{r.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Más notas" className="mt-14 pt-6 border-t border-border grid grid-cols-2 gap-6">
          <div>
            {older && (
              <Link to={`/culture/${older.id}`} className="group block min-h-[44px]">
                <span className="label text-muted-foreground">← Anterior</span>
                <span className="block font-serif font-bold group-hover:underline underline-offset-4 decoration-2">{older.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {newer && (
              <Link to={`/culture/${newer.id}`} className="group block min-h-[44px]">
                <span className="label text-muted-foreground">Siguiente →</span>
                <span className="block font-serif font-bold group-hover:underline underline-offset-4 decoration-2">{newer.title}</span>
              </Link>
            )}
          </div>
        </nav>
      </article>

      <Lightbox
        images={a.images.map((i) => ({ src: i.src, alt: i.caption ?? a.title, caption: i.caption }))}
        index={viewer}
        onClose={() => setViewer(null)}
        onIndex={setViewer}
      />
    </main>
  );
}
