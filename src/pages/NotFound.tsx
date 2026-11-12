import { Link, useLocation } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { btn } from "@/lib/ui";
import { mainSections } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const NotFound = () => {
  const { pathname } = useLocation();
  usePageMeta({ title: "No encontrado" });

  return (
    <main className="bg-background min-h-screen pt-32 pb-16">
      <div className="px-5 md:px-12 wrap">
        <PageHeader kicker={`404 / ${pathname}`} title="Señal perdida" intro="Esta página no existe o se movió. Probá desde alguna de las secciones." />
        <div className="flex flex-wrap gap-3">
          <Link to="/" className={btn.primary}>
            Volver al inicio
          </Link>
          {mainSections.slice(1).map((s) => (
            <Link key={s.path} to={s.path} className={btn.secondary}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
