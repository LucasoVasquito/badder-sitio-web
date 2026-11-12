import { useMemo } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "@/components/site/PageHeader";
import FilterBar from "@/components/site/FilterBar";
import SmartImage from "@/components/site/SmartImage";
import { EmptyState } from "@/components/site/Notice";
import {
  projects,
  categoriesOf,
  categoryLabels,
  archiveYears,
  photoCount,
  projectForAlbum,
  type ArchiveCategory,
  type ArchiveProject,
} from "@/data/projects";
import { usePageMeta } from "@/lib/usePageMeta";

const CATS: ("all" | ArchiveCategory)[] = ["all", "photography", "graphic-design", "video", "collections", "processes"];

const summaryLine = (p: ArchiveProject) =>
  [
    photoCount(p) && `${photoCount(p)} fotos`,
    p.graphics.length && `${p.graphics.length} ${p.graphics.length === 1 ? "pieza gráfica" : "piezas gráficas"}`,
    p.designs.length && `${p.designs.length} diseños`,
    p.process.length && `${p.process.length} procesos`,
    p.videos.length && `${p.videos.length} video${p.videos.length === 1 ? "" : "s"}`,
  ]
    .filter(Boolean)
    .join(" · ");

export default function Archivo() {
  const [params, setParams] = useSearchParams();

  usePageMeta({
    title: "Archive",
    description: "Archivo visual de BADDER: fotografía, flyers, video, colecciones y procesos.",
  });

  // Compatibilidad con /archive?album=<id> (enlaces anteriores)
  const legacyAlbum = params.get("album");
  const legacyTarget = legacyAlbum ? projectForAlbum(legacyAlbum) : undefined;

  const cat = (CATS.includes(params.get("filter") as ArchiveCategory) ? params.get("filter") : "all") as "all" | ArchiveCategory;
  const year = Number(params.get("year")) || 0;

  const filtered = useMemo(
    () => projects.filter((p) => (cat === "all" || categoriesOf(p).includes(cat)) && (!year || p.year === year)),
    [cat, year]
  );

  if (legacyTarget) return <Navigate to={`/archive/${legacyTarget.id}`} replace />;

  const update = (key: "filter" | "year", value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || value === "0") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const countFor = (c: "all" | ArchiveCategory) =>
    projects.filter((p) => (c === "all" || categoriesOf(p).includes(c)) && (!year || p.year === year)).length;

  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 wrap">
        <PageHeader
          kicker="Archivo visual / Documentación 2024—"
          title="Archive"
          intro="Eventos, drops, series fotográficas, gráfica y video de BADDER, organizados por proyecto."
        />

        <div className="flex flex-col gap-4 mb-12">
          <FilterBar
            label="Categoría"
            value={cat}
            onChange={(v) => update("filter", v)}
            options={CATS.map((c) => ({ value: c, label: c === "all" ? "All" : categoryLabels[c], count: countFor(c) }))}
          />
          <FilterBar
            label="Año"
            value={String(year)}
            onChange={(v) => update("year", v)}
            options={[{ value: "0", label: "Todos los años" }, ...archiveYears.map((y) => ({ value: String(y), label: String(y) }))]}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="No hay proyectos con estos filtros." />
        ) : (
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
            {filtered.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              >
                <Link to={`/archive/${p.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary border border-border">
                    <SmartImage
                      src={p.cover}
                      thumb
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 "
                    />
                    <span className="absolute top-2 left-2 label bg-background/85 text-foreground px-1.5 py-0.5">
                      A—{String(projects.indexOf(p) + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <div className="mt-3 label text-muted-foreground flex flex-wrap gap-x-3">
                    <span className="text-foreground">{p.kind}</span>
                    <span>{p.season ?? p.year}</span>
                    {p.location && <span>{p.location}</span>}
                  </div>
                  <h2 className="mt-1 font-display text-lg md:text-2xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-1 label text-muted-foreground leading-relaxed">{summaryLine(p)}</p>
                </Link>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
