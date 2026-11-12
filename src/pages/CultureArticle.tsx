import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Markdown from "@/components/site/Markdown";
import Lightbox from "@/components/site/Lightbox";
import { articles, getArticle, relatedTo, formatDate, excerptOf } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

export default function CultureArticle() {
  const { postId = "" } = useParams();
  const article = getArticle(postId);
  const [viewer, setViewer] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  usePageMeta({
    title: article?.title ?? "Culture",
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
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <article className="px-6 md:px-16 max-w-6xl mx-auto">
        <Link to="/culture" className="inline-block mb-10 font-mono-tight text-muted-foreground hover:text-foreground transition-colors">
          ← Culture
        </Link>

        <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <div className="font-mono-tight text-muted-foreground flex flex-wrap gap-x-4">
            <Link to={`/culture?cat=${a.category.toLowerCase()}`} className="text-foreground hover:underline underline-offset-4">
              {a.category}
            </Link>
            <time dateTime={a.date}>{formatDate(a.date)}</time>
          </div>
          <h1 className="mt-4 font-serif uppercase text-foreground leading-[0.95] tracking-tight text-[clamp(2.25rem,7vw,5.5rem)] break-words">{a.title}</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{a.subtitle}</p>
        </motion.header>

        <div className="mt-10 aspect-[16/9] w-full overflow-hidden bg-black border border-border">
          <img src={a.cover} alt={a.title} className="w-full h-full object-cover" />
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-10">
          <aside className="md:col-span-3 order-2 md:order-1 font-mono-tight text-muted-foreground flex md:flex-col gap-4 md:sticky md:top-28 self-start">
            <button type="button" onClick={share} className="text-left text-foreground border-b border-foreground/40 pb-1 w-fit hover:border-foreground">
              {copied ? "Link copiado ✓" : "Compartir"}
            </button>
          </aside>

          <div className="md:col-span-8 order-1 md:order-2 max-w-2xl">
            <Markdown source={a.body} />

            {a.images.length > 0 && (
              <section aria-label="Imágenes" className="mt-12 grid grid-cols-2 gap-3">
                {a.images.map((img, i) => (
                  <button key={img.src} type="button" onClick={() => setViewer(i)} className="block text-left">
                    <img src={img.src} alt={img.caption ?? ""} loading="lazy" className="w-full aspect-[4/5] object-cover border border-border" />
                    {img.caption && <span className="mt-2 block font-mono-tight text-muted-foreground">{img.caption}</span>}
                  </button>
                ))}
              </section>
            )}

            {a.references.length > 0 && (
              <section aria-labelledby="refs" className="mt-12 border-t border-border pt-6">
                <h2 id="refs" className="font-mono-tight text-foreground mb-4">Referencias / fuentes</h2>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
                  {a.references.map((r) => (
                    <li key={r.text}>
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
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
          <section aria-labelledby="related" className="mt-20 border-t border-border pt-10">
            <h2 id="related" className="font-mono-tight text-foreground mb-8">Seguí leyendo</h2>
            <ul className="grid sm:grid-cols-2 gap-8">
              {related.map((r) => (
                <li key={r.id}>
                  <Link to={`/culture/${r.id}`} className="group grid grid-cols-3 gap-4">
                    <img src={r.cover} alt="" loading="lazy" className="col-span-1 aspect-square object-cover border border-border grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="col-span-2">
                      <div className="font-mono-tight text-muted-foreground">
                        {r.category} · {formatDate(r.date)}
                      </div>
                      <div className="mt-2 font-serif text-xl uppercase leading-tight text-foreground group-hover:text-foreground/70">{r.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Más publicaciones" className="mt-16 pt-8 border-t border-border grid grid-cols-2 gap-6 font-mono-tight">
          <div>{older && <Link to={`/culture/${older.id}`} className="text-muted-foreground hover:text-foreground">← {older.title}</Link>}</div>
          <div className="text-right">{newer && <Link to={`/culture/${newer.id}`} className="text-muted-foreground hover:text-foreground">{newer.title} →</Link>}</div>
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
