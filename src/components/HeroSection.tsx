import badderLogo from "@/assets/badder_logo_original.webp";
import { BarbedWire, BlurImage, Checker, Duotone, Halftone, Marquee, Sticker } from "@/components/flyer";
import { contact } from "@/data/site";

// Portada: flyer vivo. El collage reacciona al mouse (data-depth) y el logo se deforma con #warp.
// Piezas: DJ azul (Drop 3) en bitmap sobre --a, foto de Rosset difusa y Clifford rojo (Drop 3) delante del logo.
export default function HeroSection() {
  return (
    <section aria-label="BADDER" className="relative isolate overflow-hidden -mt-16 pt-16 bg-background">
      {/* Cinta superior */}
      <div className="relative z-20 mt-6 bg-[hsl(var(--a))] text-[hsl(var(--a-fg))] -rotate-[1.2deg] py-2">
        <Marquee
          items={["Badder Experience", "La Plata, Argentina", "Est. 2024", "Música electrónica underground"]}
          itemClassName="f-doto text-2xl md:text-4xl leading-none"
          speed={70}
          separator="✕"
        />
      </div>

      <div className="relative min-h-[620px] md:min-h-[860px]">
        <Halftone className="z-0" size={8} opacity={0.5} />

        {/* DJ azul · bitmap sobre acento */}
        <div data-depth="22" className="absolute z-10 left-[3%] top-[6%] w-[38%] md:w-[22%] max-w-[330px]">
          <div className="-rotate-[7deg] md:-rotate-[7deg] border-2 border-[hsl(var(--ink))]">
            <Duotone src="/drop3/foto (35).webp" mode="bitmap" alt="Gráfica DJ del Drop 3" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>

        {/* Rosset · difusa */}
        <div data-depth="-18" className="absolute z-10 right-[4%] top-[4%] w-[34%] md:w-[20%] max-w-[300px]">
          <div className="rotate-[3deg] md:rotate-[5deg] relative">
            <BlurImage src="/rosset/foto (1).webp" alt="Badder Showcase en Rosset" blur={5} className="w-full aspect-[3/4] object-cover border-2 border-foreground" />
            <Sticker tone="b" rotate={-5} className="absolute -bottom-3 -left-3">Rosset</Sticker>
          </div>
        </div>

        {/* Logo */}
        <div className="absolute inset-x-0 top-[30%] md:top-[26%] z-[5] flex justify-center px-4">
          <img
            src={badderLogo}
            alt="Badder"
            fetchPriority="high"
            className="w-[min(84vw,1040px)] h-auto"
            style={{ filter: "url(#warp)" }}
          />
        </div>
        <span
          aria-hidden
          className="f-script absolute z-[15] right-[5%] md:right-[14%] top-[52%] md:top-[60%] text-[clamp(2.75rem,9vw,8rem)] leading-none text-[hsl(var(--a))] -rotate-[8deg]"
        >
          experience
        </span>

        {/* Alambre de púas */}
        <BarbedWire variant="light" rotate={-4} className="top-[64%] z-[12]" />

        {/* Clifford rojo, delante del logo */}
        <div data-depth="-46" className="absolute z-[14] left-[8%] md:left-[34%] bottom-[2%] w-[44%] md:w-[24%] max-w-[360px]">
          <img src="/drop3/foto (16).webp" alt="Clifford rojo, Drop 3" loading="eager" className="w-full h-auto object-contain" />
        </div>

        {/* Datos en las esquinas */}
        <div className="label absolute z-20 left-5 md:left-12 bottom-4 text-muted-foreground">
          {contact.location.split(",")[0]}, ARG
          <br />
          Est. 2024
        </div>
        <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="label absolute z-20 right-5 md:right-12 bottom-4 inline-flex items-center min-h-[44px] hover:underline">
          {contact.instagramHandle} ↗
        </a>
      </div>

      <div className="relative h-10 md:h-14">
        <Checker size={56} />
      </div>
    </section>
  );
}
