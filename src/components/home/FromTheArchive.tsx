import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import SmartImage from "@/components/site/SmartImage";
import { projects, getProject } from "@/data/projects";
import { summaryLine } from "@/lib/archiveUi";

// Archivo: un destacado (reproducción completa) + índice editorial con año, tipo, lugar y material.
const featured = getProject("drop-3") ?? projects[0];
const list = projects.filter((p) => p.id !== featured.id).slice(0, 7);

export default function FromTheArchive() {
  return (
    <section className="surface-tint mt-20 md:mt-28 px-5 md:px-12 py-14 md:py-20">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader kicker="Eventos · Drops · Series · Gráfica" title="Archivo" link={{ to: "/archive", label: "Ver todo el archivo" }} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10">
          <Link to={`/archive/${featured.id}`} className="md:col-span-5 group block">
            <div className="bg-ink p-3">
              <SmartImage src={featured.cover} thumb alt={featured.title} className="w-full aspect-[4/5] object-contain" />
            </div>
            <div className="mt-3 label text-muted-foreground">
              Destacado · {featured.kind} · {featured.season ?? featured.year}
            </div>
            <div className="mt-1 font-display text-h2 group-hover:underline underline-offset-4 decoration-2">{featured.title}</div>
            {featured.summary && <p className="mt-2 max-w-[48ch] line-clamp-3">{featured.summary}</p>}
          </Link>

          <ul className="md:col-span-7 border-t-2 border-border self-start">
            {list.map((p) => (
              <li key={p.id} className="border-b border-border">
                <Link
                  to={`/archive/${p.id}`}
                  className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr_auto] gap-x-4 gap-y-1 py-3 items-center hover:bg-background transition-colors"
                >
                  <SmartImage src={p.cover} thumb alt="" className="w-14 h-14 md:w-[72px] md:h-[72px] object-cover bg-ink row-span-2 md:row-span-1" />
                  <span className="min-w-0">
                    <span className="block label text-muted-foreground">
                      {p.kind} · {p.season ?? p.year}
                      {p.location ? ` · ${p.location}` : ""}
                    </span>
                    <span className="block font-semibold text-lg leading-snug group-hover:underline underline-offset-4 decoration-2">{p.title}</span>
                  </span>
                  <span className="label text-muted-foreground col-start-2 md:col-start-auto md:text-right">{summaryLine(p)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
