import { Link, Navigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import FilterBar from "@/components/site/FilterBar";
import SmartImage from "@/components/site/SmartImage";
import { EmptyState } from "@/components/site/Notice";
import { articles, CULTURE_CATEGORIES, formatDate, excerptOf, type CultureCategory } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";

// Notas: una nota destacada + índice de lectura (fecha, categoría, título y bajada). Filtro por categoría (?cat=SOUND).
export default function Journal() {
  const [params, setParams] = useSearchParams();
  usePageMeta({
    title: "Notas",
    description: "Notas de BADDER: música electrónica, diseño, escenas y referencias.",
  });

  // Compatibilidad: /culture?post=<id> → /culture/<id>
  const legacy = params.get("post");
  if (legacy && articles.some((a) => a.id === legacy)) return <Navigate to={`/culture/${legacy}`} replace />;

  const raw = (params.get("cat") ?? "").toUpperCase();
  const cat = (CULTURE_CATEGORIES as readonly string[]).includes(raw) ? (raw as CultureCategory) : "ALL";
  const list = cat === "ALL" ? articles : articles.filter((a) => a.category === cat);
  const [lead, ...rest] = list;

  return (
    <main data-accent="lime" className="bg-background min-h-svh-fb pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Lectura / Música · Diseño · Escenas · Referencias"
          title="Notas"
          intro="Investigación, referencias y conexiones entre la música electrónica, la cultura visual y la escena."
        />

        <div className="mb-12">
          <FilterBar
            label="Categoría"
            value={cat}
            onChange={(v) => setParams(v === "ALL" ? {} : { cat: v.toLowerCase() }, { replace: true })}
            options={[
              { value: "ALL", label: "Todas", count: articles.length },
              ...CULTURE_CATEGORIES.map((c) => ({ value: c, label: c, count: articles.filter((a) => a.category === c).length })),
            ]}
          />
        </div>

        {!lead ? (
          <EmptyState title="Todavía no hay notas en esta categoría." />
        ) : (
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-12">
            <article className="md:col-span-7 group">
              <Link to={`/culture/${lead.id}`} className="block">
                <div className="aspect-[16/10] overflow-hidden bg-secondary">
                  <SmartImage src={lead.cover} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 label text-muted-foreground flex gap-3">
                  <span className="text-foreground">{lead.category}</span>
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                </div>
                <h2 className="mt-2 font-serif font-bold text-[clamp(1.875rem,1.2rem+2.4vw,3rem)] leading-[1.08] group-hover:underline underline-offset-4 decoration-2">{lead.title}</h2>
                <p className="mt-3 font-serif text-xl text-muted-foreground">{lead.subtitle}</p>
                <p className="mt-3 text-lg max-w-[56ch]">{excerptOf(lead.body)}</p>
                <span className="mt-4 inline-flex items-center min-h-[44px] label underline underline-offset-4 decoration-2">Leer nota →</span>
              </Link>
            </article>

            <ul className="md:col-span-5 border-t-2 border-border self-start">
              {rest.map((a) => (
                <li key={a.id} className="border-b border-border">
                  <Link to={`/culture/${a.id}`} className="group flex gap-4 py-5">
                    <div className="w-28 aspect-square shrink-0 overflow-hidden bg-secondary">
                      <SmartImage src={a.cover} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="label text-muted-foreground flex gap-3">
                        <span className="text-foreground">{a.category}</span>
                        <time dateTime={a.date}>{formatDate(a.date)}</time>
                      </div>
                      <h2 className="mt-1 font-serif font-bold text-xl leading-tight group-hover:underline underline-offset-4 decoration-2">{a.title}</h2>
                      <p className="mt-1 text-muted-foreground">{a.subtitle}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
