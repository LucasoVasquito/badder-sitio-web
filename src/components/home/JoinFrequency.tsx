import { BarbedWire, Duotone, FontCycleTitle } from "@/components/flyer";
import { contact } from "@/data/site";

const disciplines = ["Artistas", "DJs", "Productores", "Diseñadores", "Fotógrafos", "Realizadores"];

// Participar: bloque de acento B a sangre. Solo vías que funcionan hoy: Instagram y mail.
export default function JoinFrequency() {
  return (
    <section className="surface-b relative overflow-hidden px-5 md:px-12 py-24 md:py-32">
      <BarbedWire variant="dark" rotate={-3} className="top-6" />
      <BarbedWire variant="dark" rotate={2} className="bottom-6" />
      <div className="relative max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12 items-center">
        <div className="md:col-span-7">
          <div className="label mb-4">Participar</div>
          <FontCycleTitle id="join" font="wet" as="h2" className="text-[clamp(2.8rem,9.5vw,9rem)] leading-[0.9]">
            Join the<br />Frequency
          </FontCycleTitle>
          <p className="mt-6 text-xl max-w-[40ch] font-medium">Mandanos tu música, tu diseño, tus fotos o tu video. Escribinos y contanos en qué estás trabajando.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d} className="label border-2 border-foreground px-2.5 py-1.5">{d}</li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center min-h-[52px] px-6 label bg-foreground text-background border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors">
              Instagram {contact.instagramHandle} ↗
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center min-h-[52px] px-6 label border-2 border-foreground hover:bg-foreground hover:text-background transition-colors break-all">
              {contact.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="rotate-[3deg] max-w-[420px] md:ml-auto border-2 border-foreground">
            <Duotone src="/rosset/foto (5).webp" mode="bitmap" alt="Público en una fecha de BADDER" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
