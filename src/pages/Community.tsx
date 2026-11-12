import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { btn } from "@/lib/ui";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const mail = (subject: string, body: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// Solo vías que funcionan hoy (Instagram y mail). Las plataformas que todavía
// no existen (Discord, Telegram, recursos descargables) no se muestran.
const ways = [
  {
    title: "Seguí la actividad",
    desc: "Fechas, sets, drops y archivo nuevo se anuncian primero en Instagram.",
    action: { label: contact.instagramHandle, href: contact.instagramUrl, external: true },
  },
  {
    title: "Compartí tu demo",
    desc: "Si producís, mandanos un link a tu música (SoundCloud privado, Drive o similar) con un par de líneas sobre vos.",
    action: { label: "Enviar demo por mail", href: mail("Demo — [tu nombre]", "Link:\nSobre mí:\n"), external: false },
  },
  {
    title: "Proponé una colaboración",
    desc: "Diseño, fotografía, video, moda, eventos: contanos la idea y qué te gustaría hacer con BADDER.",
    action: { label: "Escribir propuesta", href: mail("Colaboración — [tu nombre]", "La idea:\nQué hacés:\nLinks:\n"), external: false },
  },
  {
    title: "Participá en sesiones",
    desc: "Si sos DJ o artista y querés tocar o registrar una sesión con nosotros, escribinos.",
    action: { label: "Consultar por sesiones", href: mail("Sesiones — [tu nombre]", "Qué hacés:\nLinks:\n"), external: false },
  },
  {
    title: "Acercá un proyecto cultural",
    desc: "Fanzines, muestras, ciclos, investigación: si tenés un proyecto que conecta con la escena, queremos conocerlo.",
    action: { label: "Contar el proyecto", href: mail("Proyecto cultural — [tu nombre]", "El proyecto:\nLinks:\n"), external: false },
  },
];

export default function Community() {
  usePageMeta({ title: "Participar", description: "Cómo participar en BADDER: demos, colaboraciones, sesiones y proyectos culturales." });

  return (
    <main data-accent="red" className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader
          kicker="Comunidad"
          title="Participar"
          intro="BADDER es una red en movimiento: artistas, DJs, productores, diseñadores, fotógrafos, realizadores y gente de la pista. Estas son las formas concretas de sumarte hoy."
        />

        <ul className="flex flex-col border-t-2 border-border">
          {ways.map((w) => (
            <li key={w.title} className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border items-center">
              <div className="md:col-span-8">
                <h2 className="font-display text-h2">{w.title}</h2>
                <p className="mt-2 text-lg max-w-[56ch]">{w.desc}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a href={w.action.href} {...(w.action.external ? { target: "_blank", rel: "noreferrer" } : {})} className={btn.accent}>
                  {w.action.label} {w.action.external ? "↗" : "→"}
                </a>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-10 label text-muted-foreground">
          ¿Buscás a alguien de la crew?{" "}
          <Link to="/contact#bookings" className="text-foreground underline underline-offset-4 decoration-2 hover:bg-accent">
            Integrantes y presskits →
          </Link>
        </p>
      </div>
    </main>
  );
}
