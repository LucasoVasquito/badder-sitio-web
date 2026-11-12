import { contact } from "@/data/site";

const disciplines = ["Artistas", "DJs", "Productores", "Diseñadores", "Fotógrafos", "Realizadores"];

// Participar: único bloque de acento de la Home. Solo vías que funcionan hoy: Instagram y mail.
export default function JoinFrequency() {
  return (
    <section className="mt-20 md:mt-28 px-5 md:px-12 py-14 md:py-20 bg-accent text-accent-foreground">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <div className="label mb-3">Participar</div>
          <h2 className="font-display text-hero">Mostranos lo que hacés</h2>
          <p className="mt-6 text-lg max-w-[48ch]">Si producís, pinchás, diseñás, sacás fotos o filmás, escribinos y contanos en qué estás trabajando.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d} className="label border-2 border-ink px-2.5 py-1.5">
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 flex flex-col border-t-2 border-ink">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between border-b-2 border-ink py-5 min-h-[72px] hover:bg-ink hover:text-paper transition-colors px-2"
          >
            <span>
              <span className="block label">Instagram / DM</span>
              <span className="font-display text-h2">{contact.instagramHandle}</span>
            </span>
            <span aria-hidden className="label">↗</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center justify-between border-b-2 border-ink py-5 min-h-[72px] hover:bg-ink hover:text-paper transition-colors px-2"
          >
            <span className="min-w-0">
              <span className="block label">Mail</span>
              <span className="font-semibold text-lg break-all">{contact.email}</span>
            </span>
            <span aria-hidden className="label">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
