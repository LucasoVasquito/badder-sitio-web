import { useState } from "react";
import PageHeader from "@/components/site/PageHeader";
import FilterBar from "@/components/site/FilterBar";
import Notice from "@/components/site/Notice";
import PlayButton from "@/components/home/PlayButton";
import { btn } from "@/lib/ui";
import { findTrackIndex } from "@/store/playerStore";
import { releases } from "@/data/music";
import { projects } from "@/data/projects";
import { products } from "@/data/products";
import { displayStatus } from "@/lib/commerce";
import { summaryLine } from "@/lib/archiveUi";
import { usePageMeta } from "@/lib/usePageMeta";

// /sistema — referencia interna del sistema visual (no enlazada desde el menú).
const swatches = [
  { name: "Papel", token: "--paper", hex: "#F0EDE3", cls: "bg-paper text-ink" },
  { name: "Tinta", token: "--ink", hex: "#181917", cls: "bg-ink text-paper" },
  { name: "Lima (principal)", token: "--lime", hex: "#83CC16", cls: "bg-lime text-ink" },
  { name: "Rojo (alternativo)", token: "--red", hex: "#EF432B", cls: "bg-signal text-ink" },
];

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="mb-16 scroll-mt-20">
      <h2 id={`${id}-t`} className="label border-b-2 border-border pb-3 mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Sistema() {
  usePageMeta({ title: "Sistema", description: "Sistema visual de BADDER." });
  const [accent, setAccent] = useState<"lime" | "red">("lime");
  const [tab, setTab] = useState("a");
  const release = releases[0];
  const idx = findTrackIndex(release.title);
  const project = projects[0];
  const product = products.find((p) => p.listed)!;

  return (
    <main data-accent={accent} className="bg-background min-h-screen pt-10 md:pt-16 pb-16">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Interno · no enlazado" title="Sistema" intro="Componentes del rediseño editorial con sus estados. El acento cambia por pantalla con data-accent en el main.">
          <div role="group" aria-label="Acento" className="mt-6 flex gap-2">
            {(["lime", "red"] as const).map((a) => (
              <button key={a} type="button" aria-pressed={accent === a} onClick={() => setAccent(a)} className={`label min-h-[44px] px-4 border-2 border-foreground ${accent === a ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
                Acento {a === "lime" ? "lima" : "rojo"}
              </button>
            ))}
          </div>
        </PageHeader>

        <Block id="color" title="Color">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {swatches.map((s) => (
              <li key={s.token} className={`${s.cls} border-2 border-ink p-4 h-32 flex flex-col justify-end`}>
                <span className="font-semibold">{s.name}</span>
                <span className="label">{s.hex}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-[60ch]">El lima no se usa como color de texto sobre papel: va como fondo con texto tinta, o en filetes e indicadores.</p>
        </Block>

        <Block id="tipo" title="Tipografía">
          <p className="font-display text-hero">Titular de impacto</p>
          <p className="mt-4 font-serif font-bold text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-tight">Título de artículo en PT Serif</p>
          <p className="mt-4 reading">Cuerpo a 18 píxeles, alrededor de 66 caracteres por línea, para lectura sostenida de notas e introducciones.</p>
          <p className="mt-4 label">Etiqueta · Archivo 13 px · 600 · mayúsculas</p>
        </Block>

        <Block id="nav" title="Cabecera y navegación">
          <div className="border border-border">
            <div className="flex flex-wrap items-center gap-6 px-5 h-16">
              <span className="font-display text-h2">Badder</span>
              {["Notas", "Música", "Archivo"].map((l, i) => (
                <span key={l} className={`label inline-flex items-center h-11 border-b-2 ${i === 1 ? "border-foreground" : "border-transparent"}`}>
                  {l}
                  {i === 1 && <span className="sr-only"> (activo)</span>}
                </span>
              ))}
              <span className="label inline-flex items-center h-11 px-4 border-2 border-foreground bg-accent text-accent-foreground">Participar (activo)</span>
            </div>
          </div>
          <div className="mt-4 max-w-sm">
            <FilterBar label="Demo" value={tab} onChange={setTab} options={[{ value: "a", label: "Todo", count: 19 }, { value: "b", label: "Fotografía", count: 11 }, { value: "c", label: "Video", count: 9 }]} />
          </div>
        </Block>

        <Block id="botones" title="Botones">
          <div className="flex flex-wrap gap-3">
            <button className={btn.primary}>Principal</button>
            <button className={btn.secondary}>Secundario</button>
            <button className={btn.accent}>Acento</button>
            <button className={btn.primary} disabled>Deshabilitado</button>
            <a href="#botones" className={btn.link}>Enlace</a>
          </div>
        </Block>

        <Block id="archivo" title="Entrada de archivo">
          <a href="#archivo" className="group grid grid-cols-[4.5rem_1fr] md:grid-cols-[5.5rem_1fr_auto] gap-x-4 items-center py-3 border-y border-border hover:bg-secondary transition-colors px-1">
            <img src={project.cover} alt="" className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] object-cover" />
            <span className="min-w-0">
              <span className="block label text-muted-foreground">{project.kind} · {project.season ?? project.year}</span>
              <span className="block font-semibold text-lg group-hover:underline underline-offset-4 decoration-2">{project.title}</span>
            </span>
            <span className="label text-muted-foreground">{summaryLine(project)}</span>
          </a>
        </Block>

        <Block id="musica" title="Bloque musical">
          <div className="surface-dark p-6 grid grid-cols-[6rem_1fr_auto] gap-5 items-center max-w-2xl">
            <img src={release.cover} alt="" className="w-24 h-24 object-cover" />
            <div className="min-w-0">
              <div className="label text-muted-foreground">{release.type} · {release.artist}</div>
              <div className="font-display text-h2">{release.title}</div>
            </div>
            <PlayButton trackIndex={idx} label="Escuchar" />
          </div>
        </Block>

        <Block id="producto" title="Ficha de producto / proyecto">
          <div className="grid md:grid-cols-12 gap-8 max-w-4xl">
            <img src={product.images[0]} alt="" className="md:col-span-5 w-full aspect-[3/4] object-cover bg-ink" />
            <div className="md:col-span-7">
              <span className="label border-2 border-foreground px-2 py-0.5">{displayStatus(product)}</span>
              <h3 className="mt-3 font-display text-title">{product.name}</h3>
              <dl className="mt-6 border-2 border-foreground grid grid-cols-[auto,1fr]">
                <dt className="col-span-2 label px-4 py-2 bg-foreground text-background">Etiqueta · BADDER</dt>
                <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Colección</dt>
                <dd className="px-4 py-3 border-t border-border font-semibold">{product.collection?.name ?? "—"}</dd>
                <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Diseño</dt>
                <dd className="px-4 py-3 border-t border-border font-semibold">{product.credits ?? "—"}</dd>
              </dl>
              <div className="mt-6"><Notice title="Pieza de archivo">Se conserva como registro y no está a la venta.</Notice></div>
            </div>
          </div>
        </Block>

        <Block id="estados" title="Estados">
          <div className="flex flex-wrap gap-3 items-center">
            <button className="label min-h-[44px] px-4 border-2 border-foreground">Reposo</button>
            <button className="label min-h-[44px] px-4 border-2 border-foreground bg-accent text-accent-foreground">Hover / activo</button>
            <button className="label min-h-[44px] px-4 border-2 border-foreground outline outline-2 outline-offset-4 outline-ring">Foco</button>
            <button className="label min-h-[44px] px-4 border-2 border-foreground opacity-40" disabled>Deshabilitado</button>
          </div>
        </Block>

        <Block id="footer" title="Footer">
          <p className="max-w-[60ch]">El footer usa la superficie oscura (<code>surface-dark</code>) con las secciones y el contacto. Se ve al final de esta página.</p>
        </Block>
      </div>
    </main>
  );
}
