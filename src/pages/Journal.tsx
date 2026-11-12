import { Link, Navigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "@/components/site/PageHeader";
import FilterBar from "@/components/site/FilterBar";
import SmartImage from "@/components/site/SmartImage";
import { EmptyState } from "@/components/site/Notice";
import { articles, CULTURE_CATEGORIES, formatDate, excerptOf, type CultureCategory } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";

// CULTURE: listado editorial con filtros por categoría (?cat=SOUND).
export default function Journal() {
  const [params, setParams] = useSearchParams();
  usePageMeta({
    title: "Culture",
    description: "Culture: música electrónica, diseño, escenas y referencias. Publicaciones de BADDER.",
  });

  // Compatibilidad: /culture?post=<id> → /culture/<id>
  const legacy = params.get("post");
  if (legacy && articles.some((a) => a.id === legacy)) return <Navigate to={`/culture/${legacy}`} replace />;

  const raw = (params.get("cat") ?? "").toUpperCase();
  const cat = (CULTURE_CATEGORIES as readonly string[]).includes(raw) ? (raw as CultureCategory) : "ALL";
  const list = cat === "ALL" ? articles : articles.filter((a) => a.category === cat);
  const [lead, ...rest] = list;

  return (
    <main className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Editorial / Música · Diseño · Escenas · Referencias"
          title="Culture"
          intro="Investigación, referencias y conexiones entre la música electrónica, la cultura visual y la escena."
        />

        <div className="mb-12">
          <FilterBar
            label="Categoría"
            value={cat}
            onChange={(v) => setParams(v === "ALL" ? {} : { cat: v.toLowerCase() }, { replace: true })}
            options={[
              { value: "ALL", label: "All", count: articles.length },
              ...CULTURE_CATEGORIES.map((c) => ({ value: c, label: c, count: articles.filter((a) => a.category === c).length })),
            ]}
          />
        </div>

        {!lead ? (
          <EmptyState title="Todavía no hay publicaciones en esta categoría." />
        ) : (
          <>
            {/* Nota principal */}
            <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="group mb-16">
              <Link to={`/culture/${lead.id}`} className="grid md:grid-cols-12 gap-6 md:gap-10 items-end">
                <div className="md:col-span-7 aspect-[16/10] overflow-hidden bg-secondary border border-border">
                  <SmartImage src={lead.cover} alt={lead.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                </div>
                <div className="md:col-span-5">
                  <div className="label text-muted-foreground flex gap-3">
                    <span className="text-foreground">{lead.category}</span>
                    <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                  </div>
                  <h2 className="mt-3 font-display text-3xl md:text-5xl leading-[0.95] text-foreground group-hover:text-foreground/70 transition-colors">
                    {lead.title}
                  </h2>
                  <p className="mt-3 label text-muted-foreground">{lead.subtitle}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{excerptOf(lead.body)}</p>
                  <span className="mt-6 inline-block label text-foreground border-b border-foreground/40 pb-1">Leer →</span>
                </div>
              </Link>
            </motion.article>

            {/* Resto */}
            {rest.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 border-t border-border pt-12">
                {rest.map((a, i) => (
                  <motion.li key={a.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link to={`/culture/${a.id}`} className="group block">
                      <div className="aspect-[4/3] overflow-hidden bg-secondary border border-border">
                        <SmartImage src={a.cover} alt={a.title} className="w-full h-full object-cover transition-all duration-700 " />
                      </div>
                      <div className="mt-4 label text-muted-foreground flex gap-3">
                        <span className="text-foreground">{a.category}</span>
                        <time dateTime={a.date}>{formatDate(a.date)}</time>
                      </div>
                      <h2 className="mt-2 font-display text-2xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">{a.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.subtitle}</p>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
}
