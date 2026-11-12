import { Link } from "react-router-dom";
import { mainSections, communitySection, contact } from "@/data/site";

export default function Footer() {
  const a = "inline-flex items-center min-h-[44px] hover:underline underline-offset-4";
  return (
    // pb extra: la barra del reproductor es fija y no debe tapar la última línea
    <footer className="surface-dark relative z-10 mt-24 md:mt-32 px-5 md:px-12 pt-14 pb-32 md:pb-28">
      <div className="wrap grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-2 md:col-span-6">
          <span className="font-display text-hero block">Badder</span>
          <p className="mt-4 label text-muted-foreground">
            Espacio creativo multidisciplinario
            <br />
            {contact.location} · Est. 2024
          </p>
        </div>

        <nav aria-label="Secciones" className="md:col-span-3">
          <h2 className="label text-muted-foreground mb-3">Secciones</h2>
          <ul className="flex flex-col">
            {mainSections.map((s) => (
              <li key={s.path}>
                <Link to={s.path} className={a}>{s.label}</Link>
              </li>
            ))}
            <li>
              <Link to={communitySection.path} className={a}>{communitySection.label}</Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label text-muted-foreground mb-3">Contacto</h2>
          <ul className="flex flex-col">
            <li>
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className={a}>
                {contact.instagramHandle} ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${a} break-all`}>{contact.email}</a>
            </li>
            <li>
              <Link to="/contact" className={a}>Formulario de contacto →</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-14 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between gap-3 label text-muted-foreground">
        <span>© 2026 BADDER EXPERIENCE</span>
        <span>
          Diseño y desarrollo web: Lucas Nicolas Bengochea ·{" "}
          <Link to="/#crew" className="underline underline-offset-4 hover:text-foreground">
            Créditos
          </Link>
        </span>
      </div>
    </footer>
  );
}
