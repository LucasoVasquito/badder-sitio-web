import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { studioAreas, studioCases } from "@/data/studio";
import { contact } from "@/data/site";
import { btn } from "@/lib/ui";
import { usePageMeta } from "@/lib/usePageMeta";

const consult = (service: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(`Estudio — ${service}`)}&body=${encodeURIComponent(
    `Hola BADDER, quiero consultar por: ${service}.\n\nSobre el proyecto:\nFechas / plazos:\nLinks:\n`
  )}`;

export default function Services() {
  usePageMeta({
    title: "Estudio",
    description: "Estudio BADDER: mixing, mastering, grabación de DJ sets, fotografía, video, motion, flyers, presskits y diseño web.",
  });

  return (
    <main data-accent="lime" className="bg-background min-h-svh-fb pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Sonido · Producción visual · Diseño"
          title="Estudio"
          intro="Lo que producimos para BADDER también lo hacemos para artistas, sellos y proyectos de la escena. Contanos qué necesitás y armamos el alcance juntos."
        >
          <nav aria-label="Áreas" className="mt-8 flex flex-wrap gap-2">
            {[...studioAreas.map((a) => ({ id: a.id, title: a.title })), { id: "casos", title: "Casos" }].map((a) => (
              <a key={a.id} href={`#${a.id}`} className="label inline-flex items-center min-h-[44px] border-2 border-foreground px-4 hover:bg-accent hover:text-accent-foreground transition-colors">
                {a.title}
              </a>
            ))}
          </nav>
        </PageHeader>

        {studioAreas.map((area) => {
          const services = area.services.filter((s) => s.confirmed);
          return (
            <section key={area.id} id={area.id} aria-labelledby={`${area.id}-title`} className="scroll-mt-20 mb-20 md:mb-28">
              <div className="grid md:grid-cols-12 gap-6 border-b-2 border-border pb-6">
                <h2 id={`${area.id}-title`} className="md:col-span-6 font-display text-title">
                  {area.title}
                </h2>
                <p className="md:col-span-6 text-lg self-end max-w-[52ch]">{area.intro}</p>
              </div>

              <ul>
                {services.map((s) => (
                  <li key={s.id} className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border">
                    <div className="md:col-span-4">
                      <h3 className="font-display text-h2">{s.name}</h3>
                      <p className="mt-2 text-muted-foreground">{s.brief}</p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="label text-muted-foreground mb-2">Incluye</div>
                      <ul className="space-y-1">
                        {s.includes.map((x) => (
                          <li key={x}>— {x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-4 md:items-end md:text-right">
                      {s.examples.length > 0 && (
                        <div>
                          <div className="label text-muted-foreground mb-2">Trabajos</div>
                          <ul className="space-y-1">
                            {s.examples.map((e) => (
                              <li key={e.to + e.label}>
                                <Link to={e.to} className="underline underline-offset-4 decoration-2 hover:bg-accent">
                                  {e.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <a href={consult(s.name)} className={`${btn.secondary} w-fit`}>
                        Consultar →
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Casos */}
        <section id="casos" aria-labelledby="casos-title" className="scroll-mt-20">
          <h2 id="casos-title" className="label border-b-2 border-border pb-3 mb-8">
            Casos
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studioCases.map((c) => (
              <li key={c.id}>
                <Link to={c.to} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-secondary">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 label text-muted-foreground">{c.client}</div>
                  <h3 className="mt-1 font-display text-h2 group-hover:underline underline-offset-4 decoration-2">{c.title}</h3>
                  <p className="mt-2">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.services.map((s) => (
                      <span key={s} className="label border border-border px-2 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 border-t-2 border-border pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-display text-title max-w-xl">¿Tenés un proyecto? Escribinos.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={consult("Proyecto")} className={btn.accent}>
              {contact.email}
            </a>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className={btn.secondary}>
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
