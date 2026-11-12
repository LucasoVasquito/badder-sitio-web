import { useEffect, useState, type ReactNode } from "react";
import PageHeader from "@/components/site/PageHeader";
import { btn } from "@/lib/ui";
import { usePageMeta } from "@/lib/usePageMeta";
import {
  BarbedWire, BlurImage, Checker, DISPLAY_FONTS, Duotone, FontCycleTitle, Halftone, Marquee, OpArt, Scanlines, Sticker, Tape, ThornFrame,
} from "@/components/flyer";

const PALETTES = [
  { key: "", label: "Rojo / Verde" },
  { key: "vr", label: "Verde / Rojo" },
  { key: "ya", label: "Amarillo / Azul" },
  { key: "ar", label: "Azul / Rojo" },
];

function Block({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className="mb-16">
      <h2 className="label mb-4 pb-2 border-b-2 border-border">{title}</h2>
      <div className={className}>{children}</div>
    </section>
  );
}

const Demo = ({ children, h = "h-44" }: { children: ReactNode; h?: string }) => <div className={`relative overflow-hidden border border-border ${h}`}>{children}</div>;

// Referencia interna del sistema "flyer vivo" (no enlazada desde el menú).
export default function Sistema() {
  usePageMeta({ title: "Sistema", description: "Referencia interna del sistema visual." });
  const [palette, setPalette] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (palette) root.setAttribute("data-palette", palette);
    else root.removeAttribute("data-palette");
    return () => root.removeAttribute("data-palette");
  }, [palette]);

  return (
    <main className="bg-background min-h-screen pt-10 md:pt-16 pb-24 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Interno · no enlazado" title="Sistema" intro="Texturas, marcos, stickers, títulos, botones y tarjetas del rediseño “flyer vivo”. Cambiá la paleta A/B con los botones." />

        <Block title="Paleta A / B (data-palette en <html>)" className="flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button key={p.key} type="button" onClick={() => setPalette(p.key)} aria-pressed={palette === p.key} className={`label h-11 px-3 border-2 ${palette === p.key ? "bg-accent text-accent-foreground border-foreground" : "border-border/40 hover:bg-foreground hover:text-background"}`}>
              {p.label}
            </button>
          ))}
          <div className="w-full flex gap-3 mt-3">
            <div className="w-24 h-16 bg-[hsl(var(--a))]" /> <div className="w-24 h-16 bg-[hsl(var(--b))]" />
            <div className="w-24 h-16 bg-[hsl(var(--paper))]" /> <div className="w-24 h-16 border border-border bg-[hsl(var(--ink))]" />
          </div>
        </Block>

        <Block title="Títulos · 13 tipografías display (click en cada una: rota la fuente)" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-8 gap-y-6">
          {DISPLAY_FONTS.map((f) => (
            <div key={f.key}>
              <div className="label text-muted-foreground">{f.name}</div>
              <FontCycleTitle id={`sistema:${f.key}`} font={f.key} as="h3" className="text-[clamp(1.6rem,5vw,3rem)] leading-[0.95] [overflow-wrap:anywhere]">
                Badder
              </FontCycleTitle>
            </div>
          ))}
        </Block>

        <Block title="Capas de lectura y datos" className="grid md:grid-cols-3 gap-8">
          <p className="reading">Newsreader 20 px para lectura: <em>itálica para frases destacadas</em>.</p>
          <p className="label">IBM Plex Mono · etiqueta 12 px · mayúsculas</p>
          <p className="f-script text-6xl text-[hsl(var(--a))] -rotate-6">experience</p>
        </Block>

        <Block title="Texturas" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
          <Demo><Halftone size={8} opacity={0.6} /><span className="label relative p-2 block">Halftone</span></Demo>
          <Demo><Checker size={64} /><span className="label relative p-2 block">Checker</span></Demo>
          <Demo><OpArt /><span className="label relative p-2 block bg-background w-max">OpArt</span></Demo>
          <Demo><Scanlines /><span className="label relative p-2 block">Scanlines</span></Demo>
          <Demo><Duotone src="/rosset/foto (1).webp" mode="bitmap" className="w-full h-44 object-cover" /></Demo>
          <Demo><Duotone src="/rosset/foto (1).webp" mode="duo" className="w-full h-44 object-cover" /></Demo>
          <Demo><BlurImage src="/rosset/foto (1).webp" blur={6} className="w-full h-44 object-cover" /></Demo>
          <Demo h="h-44"><BarbedWire variant="light" rotate={-4} className="top-8" /><BarbedWire variant="dark" rotate={3} className="top-24 bg-paper" /></Demo>
        </Block>

        <Block title="Marcos, cinta y stickers" className="flex flex-wrap items-start gap-10">
          <div className="w-60"><ThornFrame><div className="aspect-square bg-secondary" /></ThornFrame></div>
          <div className="relative w-56 border-2 border-border p-3 pt-6"><Tape />Tarjeta con cinta</div>
          <div className="flex flex-wrap gap-4 items-center">
            <Sticker tone="a">Sticker A</Sticker>
            <Sticker tone="b" rotate={5}>Sticker B</Sticker>
            <Sticker tone="paper" rotate={-2}>Papel</Sticker>
            <Sticker tone="ink" rotate={3}>Tinta</Sticker>
            <Sticker tone="b" rotate={8} onClick={() => undefined} ariaLabel="Ejemplo de sello PLAY">PLAY</Sticker>
          </div>
        </Block>

        <Block title="Marquee (acelera con el scroll)">
          <div className="bg-[hsl(var(--a))] text-[hsl(var(--a-fg))] -rotate-1 py-2">
            <Marquee items={["Badder", "La Plata", "Est. 2024"]} itemClassName="f-akira text-xl" />
          </div>
        </Block>

        <Block title="Botones y tarjetas" className="flex flex-wrap gap-4 items-start">
          <button className={btn.primary}>Primario</button>
          <button className={btn.secondary}>Secundario</button>
          <button className={btn.accent}>Acento</button>
          <button className={btn.primary} disabled>Deshabilitado</button>
          <a href="#" className={btn.link}>Enlace</a>
          <div className="cut -rotate-2 bg-[hsl(var(--paper))] text-[hsl(var(--ink))] p-4 w-56 shadow-hard">Tarjeta recorte: se endereza al hover.</div>
        </Block>
      </div>
    </main>
  );
}
