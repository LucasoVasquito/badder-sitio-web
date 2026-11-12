import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { studioAreas, studioCases } from "@/data/studio";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const consult = (service: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(`Studio — ${service}`)}&body=${encodeURIComponent(
    `Hola BADDER, quiero consultar por: ${service}.\n\nSobre el proyecto:\nFechas / plazos:\nLinks:\n`
  )}`;

export default function Services() {
  usePageMeta({
    title: "Studio",
    description: "Studio BADDER: mixing, mastering, grabación de DJ sets, fotografía, video, motion, flyers, presskits y diseño web.",
  });

  return (
    <main className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Studio / Sound · Visual · Design"
          title="Studio"
          intro="Lo que producimos para BADDER también lo hacemos para artistas, sellos y proyectos de la escena. Contanos qué necesitás y armamos el alcance juntos."
        >
          <nav aria-label="Áreas" className="mt-8 flex flex-wrap gap-2">
            {studioAreas.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="label border border-border px-3 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors">
                {a.title}
              </a>
            ))}
            <a href="#casos" className="label border border-border px-3 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors">
              Casos
            </a>
          </nav>
        </PageHeader>

        {studioAreas.map((area, a) => {
          const services = area.services.filter((s) => s.confirmed);
          return (
            <section key={area.id} id={area.id} aria-labelledby={`${area.id}-title`} className="scroll-mt-24 mb-20 md:mb-28">
              <div className="grid md:grid-cols-12 gap-6 border-b border-border pb-6 mb-2">
                <h2 id={`${area.id}-title`} className="md:col-span-6 font-display text-4xl md:text-6xl text-foreground leading-none">
                  <span className="label text-foreground align-top mr-3">{String(a + 1).padStart(2, "0")}</span>
                  {area.title}
                </h2>
                <p className="md:col-span-6 text-sm text-muted-foreground leading-relaxed self-end">{area.intro}</p>
              </div>

              <ul>
                {services.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border"
                  >
                    <div className="md:col-span-4">
                      <h3 className="font-display text-2xl text-foreground leading-tight">{s.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.brief}</p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="label text-muted-foreground mb-2">Incluye</div>
                      <ul className="text-sm text-foreground space-y-1">
                        {s.includes.map((x) => (
                          <li key={x}>— {x}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-4 md:items-end md:text-right">
                      {s.examples.length > 0 && (
                        <div>
                          <div className="label text-muted-foreground mb-2">Trabajos</div>
                          <ul className="space-y-1 text-sm">
                            {s.examples.map((e) => (
                              <li key={e.to + e.label}>
                                <Link to={e.to} className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground">
                                  {e.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <a href={consult(s.name)} className="label text-foreground border border-foreground/50 px-4 py-3 hover:bg-foreground hover:text-background transition-colors w-fit">
                        Consultar →
                      </a>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Casos */}
        <section id="casos" aria-labelledby="casos-title" className="scroll-mt-24">
          <h2 id="casos-title" className="label text-foreground border-b border-border pb-3 mb-8">
            Casos
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studioCases.map((c) => (
              <li key={c.id}>
                <Link to={c.to} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-secondary border border-border">
                    <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <span className="absolute top-2 left-2 bg-background/90 border border-border px-2 py-1 label text-foreground">{c.id}</span>
                  </div>
                  <div className="mt-3 label text-muted-foreground">{c.client}</div>
                  <h3 className="mt-1 font-display text-2xl leading-tight text-foreground group-hover:text-foreground/70">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.services.map((s) => (
                      <span key={s} className="label border border-border px-2 py-1 text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-20 border-t border-border pt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="font-display text-3xl md:text-4xl text-foreground leading-tight max-w-lg">¿Tenés un proyecto? Escribinos.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={consult("Proyecto")} className="label bg-foreground text-background border border-foreground px-6 py-4 hover:bg-transparent hover:text-foreground transition-colors">
              {contact.email}
            </a>
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="label border border-foreground/50 text-foreground px-6 py-4 hover:bg-foreground hover:text-background transition-colors">
              Instagram ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
