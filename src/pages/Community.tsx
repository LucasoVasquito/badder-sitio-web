import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const mail = (subject: string, body: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// Solo vías que funcionan hoy (Instagram y mail). Las plataformas que todavía
// no existen (Discord, Telegram, recursos descargables) no se muestran.
const ways = [
  {
    id: "01",
    title: "Seguí la actividad",
    desc: "Fechas, sets, drops y archivo nuevo se anuncian primero en Instagram.",
    action: { label: contact.instagramHandle, href: contact.instagramUrl, external: true },
  },
  {
    id: "02",
    title: "Compartí tu demo",
    desc: "Si producís, mandanos un link a tu música (SoundCloud privado, Drive o similar) con un par de líneas sobre vos.",
    action: { label: "Enviar demo por mail", href: mail("Demo — [tu nombre]", "Link:\nSobre mí:\n"), external: false },
  },
  {
    id: "03",
    title: "Proponé una colaboración",
    desc: "Diseño, fotografía, video, moda, eventos: contanos la idea y qué te gustaría hacer con BADDER.",
    action: { label: "Escribir propuesta", href: mail("Colaboración — [tu nombre]", "La idea:\nQué hacés:\nLinks:\n"), external: false },
  },
  {
    id: "04",
    title: "Participá en sesiones",
    desc: "Si sos DJ o artista y querés tocar o registrar una sesión con nosotros, escribinos.",
    action: { label: "Consultar por sesiones", href: mail("Sesiones — [tu nombre]", "Qué hacés:\nLinks:\n"), external: false },
  },
  {
    id: "05",
    title: "Acercá un proyecto cultural",
    desc: "Fanzines, muestras, ciclos, investigación: si tenés un proyecto que conecta con la escena, queremos conocerlo.",
    action: { label: "Contar el proyecto", href: mail("Proyecto cultural — [tu nombre]", "El proyecto:\nLinks:\n"), external: false },
  },
];

export default function Community() {
  usePageMeta({ title: "Community", description: "Cómo participar en BADDER: demos, colaboraciones, sesiones y proyectos culturales." });

  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 wrap">
        <PageHeader
          kicker="Community / Participar"
          title="Community"
          intro="BADDER es una red en movimiento: artistas, DJs, productores, diseñadores, fotógrafos, realizadores y gente de la pista. Estas son las formas concretas de sumarte hoy."
        />

        <ol className="flex flex-col border-t border-border">
          {ways.map((w, i) => (
            <motion.li
              key={w.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-border items-start"
            >
              <span className="md:col-span-1 label text-foreground">{w.id}</span>
              <div className="md:col-span-7">
                <h2 className="font-display text-2xl md:text-3xl text-foreground leading-tight">{w.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-lg">{w.desc}</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <a
                  href={w.action.href}
                  {...(w.action.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="inline-block label text-foreground border border-foreground/50 px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  {w.action.label} {w.action.external ? "↗" : "→"}
                </a>
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mt-10 label text-muted-foreground">
          ¿Buscás a alguien de la crew?{" "}
          <Link to="/contact#bookings" className="text-foreground underline underline-offset-4">
            Integrantes y presskits →
          </Link>
        </p>
      </div>
    </main>
  );
}
