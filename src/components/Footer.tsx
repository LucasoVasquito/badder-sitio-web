import { Link } from "react-router-dom";
import { mainSections, communitySection, contact } from "@/data/site";

export default function Footer() {
  return (
    // pb extra: el reproductor y el carrito flotantes no tapan la última línea
    <footer className="relative z-10 border-t border-border mt-24 md:mt-32 px-6 md:px-16 pt-14 pb-28 md:pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
        {/* Identidad */}
        <div className="col-span-2 md:col-span-5">
          <span className="font-serif text-3xl text-foreground">Badder</span>
          <p className="mt-4 font-mono-tight text-muted-foreground leading-relaxed">
            Independent creative culture
            <br />
            {contact.location} · Est. 2024
          </p>
        </div>

        {/* Secciones */}
        <nav aria-label="Secciones" className="md:col-span-3">
          <h2 className="font-mono-tight text-muted-foreground mb-4">Secciones</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {mainSections.map((s) => (
              <li key={s.path}>
                <Link to={s.path} className="text-foreground/80 hover:text-foreground transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={communitySection.path} className="text-foreground/80 hover:text-foreground transition-colors">
                ↳ {communitySection.label}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contacto */}
        <div className="md:col-span-4">
          <h2 className="font-mono-tight text-muted-foreground mb-4">Contacto</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-foreground transition-colors">
                Instagram {contact.instagramHandle} ↗
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="text-foreground/80 hover:text-foreground transition-colors break-all">
                {contact.email}
              </a>
            </li>
            <li>
              <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
                Contacto →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Créditos */}
      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 font-mono-tight text-muted-foreground">
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
