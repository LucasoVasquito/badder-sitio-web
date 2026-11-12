import { useMemo } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import FilterBar from "@/components/site/FilterBar";
import SmartImage from "@/components/site/SmartImage";
import { EmptyState } from "@/components/site/Notice";
import {
  projects,
  categoriesOf,
  categoryLabels,
  archiveYears,
  projectForAlbum,
  type ArchiveCategory,
  type ArchiveProject,
} from "@/data/projects";
import { summaryLine } from "@/lib/archiveUi";
import { usePageMeta } from "@/lib/usePageMeta";

const CATS: ("all" | ArchiveCategory)[] = ["all", "photography", "graphic-design", "video", "collections", "processes"];

// Gráfica y drops se muestran completos (el encuadre original importa); las series fotográficas se recortan en miniatura.
const showWhole = (p: ArchiveProject) => p.kind === "Gráfica" || p.kind === "Drop";

export default function Archivo() {
  const [params, setParams] = useSearchParams();

  usePageMeta({
    title: "Archivo",
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

  const [lead, ...rest] = filtered;

  return (
    <main data-accent="lime" className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Documentación 2024 —"
          title="Archivo"
          intro="Eventos, drops, series fotográficas, gráfica y video de BADDER, organizados por proyecto."
        />

        <div className="flex flex-col gap-2 mb-12">
          <FilterBar
            label="Categoría"
            value={cat}
            onChange={(v) => update("filter", v)}
            options={CATS.map((c) => ({ value: c, label: c === "all" ? "Todo" : categoryLabels[c], count: countFor(c) }))}
          />
          <FilterBar
            label="Año"
            value={String(year)}
            onChange={(v) => update("year", v)}
            options={[{ value: "0", label: "Todos los años" }, ...archiveYears.map((y) => ({ value: String(y), label: String(y) }))]}
          />
        </div>

        {!lead ? (
          <EmptyState title="No hay proyectos con estos filtros." />
        ) : (
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-10">
            {/* Destacado */}
            <Link to={`/archive/${lead.id}`} className="md:col-span-5 group block self-start md:sticky md:top-24">
              <div className={`border border-border ${showWhole(lead) ? "bg-secondary p-3" : "bg-secondary"}`}>
                <SmartImage src={lead.cover} thumb alt={lead.title} className={`w-full aspect-[4/5] ${showWhole(lead) ? "object-contain" : "object-cover"}`} />
              </div>
              <div className="mt-3 label text-muted-foreground">
                Destacado · {lead.kind} · {lead.season ?? lead.year}
                {lead.location ? ` · ${lead.location}` : ""}
              </div>
              <h2 className="mt-1 font-display text-h2 group-hover:underline underline-offset-4 decoration-2">{lead.title}</h2>
              <p className="mt-1 label text-muted-foreground">{summaryLine(lead)}</p>
            </Link>

            {/* Índice */}
            <ul className="md:col-span-7 border-t-2 border-border self-start">
              {rest.map((p) => (
                <li key={p.id} className="border-b border-border">
                  <Link
                    to={`/archive/${p.id}`}
                    className="group grid grid-cols-[4.5rem_1fr] md:grid-cols-[5.5rem_1fr_auto] gap-x-4 gap-y-1 py-3 items-center hover:bg-secondary transition-colors px-1"
                  >
                    <SmartImage
                      src={p.cover}
                      thumb
                      alt=""
                      className={`w-[72px] h-[72px] md:w-[88px] md:h-[88px] row-span-2 md:row-span-1 ${showWhole(p) ? "object-contain bg-secondary" : "object-cover"}`}
                    />
                    <span className="min-w-0">
                      <span className="block label text-muted-foreground">
                        {p.kind} · {p.season ?? p.year}
                        {p.location ? ` · ${p.location}` : ""}
                      </span>
                      <span className="block font-semibold text-lg md:text-xl leading-snug group-hover:underline underline-offset-4 decoration-2">{p.title}</span>
                    </span>
                    <span className="label text-muted-foreground col-start-2 md:col-start-auto md:text-right">{summaryLine(p)}</span>
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
