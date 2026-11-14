import type { ReactNode } from "react";
import { useFlyerStore } from "@/store/flyerStore";
import { PALETAS } from "@/config/flyer";
const PAL_LABELS = ["Rojo / Verde", "Verde / Rojo", "Amarillo / Azul", "Azul / Rojo"];
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
  const { paleta, textura, distorsion, difusas, set } = useFlyerStore();

  return (
    <main className="bg-background min-h-svh-fb pt-10 md:pt-16 pb-24 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Interno · no enlazado" title="Sistema" intro="Texturas, marcos, stickers, títulos, botones y tarjetas del rediseño “flyer vivo”. Cambiá la paleta A/B con los botones." />

        <Block title="Tweaks (src/config/flyer.ts): paleta, textura, distorsión, difusas" className="flex flex-wrap gap-2 items-center">
          {PAL_LABELS.map((l, i) => (
            <button key={l} type="button" onClick={() => set({ paleta: i })} aria-pressed={paleta === i} className={`label h-11 px-3 border-2 ${paleta === i ? "bg-accent text-accent-foreground border-foreground" : "border-border/40 hover:bg-foreground hover:text-background"}`}>{l}</button>
          ))}
          <label className="label flex items-center gap-2 ml-4">Grano {textura.toFixed(2)}
            <input type="range" min={0} max={0.8} step={0.05} value={textura} onChange={(e) => set({ textura: +e.target.value })} />
          </label>
          <button type="button" aria-pressed={distorsion} onClick={() => set({ distorsion: !distorsion })} className="label h-11 px-3 border-2 border-foreground">Distorsión: {distorsion ? "on" : "off"}</button>
          <button type="button" aria-pressed={difusas} onClick={() => set({ difusas: !difusas })} className="label h-11 px-3 border-2 border-foreground">Difusas: {difusas ? "on" : "off"}</button>
          <div className="w-full flex gap-3 mt-3">
            <div className="w-24 h-16" style={{ background: PALETAS[paleta].a }} /> <div className="w-24 h-16" style={{ background: PALETAS[paleta].b }} />
            <div className="w-24 h-16 bg-[#F2EFE6]" /> <div className="w-24 h-16 border border-border bg-[#0A0A09]" />
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
            <Marquee speed={0.6} style={{ gap: 28, padding: "7px 0", fontFamily: "Akira", fontSize: 20, textTransform: "uppercase" }}><span>Badder</span><span>/</span><span>La Plata</span><span>/</span><span>Est. 2024</span><span>/</span></Marquee>
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
