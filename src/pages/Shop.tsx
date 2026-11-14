import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import Notice from "@/components/site/Notice";
import SmartImage from "@/components/site/SmartImage";
import LineUp from "@/components/shop/LineUp";
import Wheatpaste from "@/components/shop/Wheatpaste";
import { publicProducts, isForSale, displayStatus, formatPrice, commerce } from "@/lib/commerce";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import type { Product } from "@/data/products";

const MONO = "'IBM Plex Mono',monospace";

function ProductCard({ product }: { product: Product }) {
  const forSale = isForSale(product);
  return (
    <li>
      <Link to={`/shop/${product.id}`} className="group flex flex-col">
        <div className="aspect-[3/4] overflow-hidden bg-secondary relative mb-3">
          <SmartImage src={product.images[0]} thumb alt={product.name} className="w-full h-full object-cover" />
          <span className={`absolute top-0 left-0 px-2 py-1 label ${forSale ? "bg-accent text-accent-foreground" : "bg-paper text-ink"}`}>
            {displayStatus(product)}
          </span>
        </div>
        <div className="label text-muted-foreground">{product.collection ? `${product.collection.name} · ${product.collection.season}` : product.category}</div>
        <h3 className="mt-1 font-semibold text-lg group-hover:underline underline-offset-4 decoration-2">{product.name}</h3>
        {forSale && product.price && <div className="mt-1 label">{formatPrice(product.price)}</div>}
      </Link>
    </li>
  );
}

const grid = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12";
// Primero el drop más reciente.
const byDrop = (a: Product, b: Product) => (b.collection?.name ?? "").localeCompare(a.collection?.name ?? "");

// Shop v3: remeras en un perchero interactivo y cuadros en una pared de galería.
export default function Shop() {
  usePageMeta({ title: "Indumentaria", description: "Prendas, cuadros y objetos de BADDER, y archivo de prendas de drops anteriores." });

  const all = publicProducts();
  const tees = all.filter((p) => p.format === "tee").sort(byDrop);
  const prints = all.filter((p) => p.format === "print");
  const others = all.filter((p) => !p.format);
  const anyForSale = all.some(isForSale);

  return (
    <main data-accent="lime" className="bg-background min-h-svh-fb pt-10 md:pt-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Prendas, cuadros y objetos" title="Indumentaria" />
        {!anyForSale && (
          <div className="mb-12">
            <Notice title="Nuevo drop en preparación">
              Por ahora no hay prendas a la venta en la web: lo que ves en el line-up y en la pared es archivo de drops anteriores. Para consultas escribinos a{" "}
              <a className="underline underline-offset-4 decoration-2" href={contact.instagramUrl} target="_blank" rel="noreferrer">
                {contact.instagramHandle}
              </a>
              .
            </Notice>
          </div>
        )}
        {anyForSale && !commerce.checkoutEnabled && (
          <p className="mb-12 label text-muted-foreground">Las compras online todavía no están habilitadas: consultá disponibilidad por Instagram o mail.</p>
        )}
      </div>

      {/* Remeras: line-up de la fiesta */}
      {tees.length > 0 && (
        <section aria-label="Remeras: line-up" style={{ position: "relative" }}>
          <LineUp items={tees} />
        </section>
      )}

      {/* Cuadros: afiches pegados en la pared */}
      {prints.length > 0 && (
        <section aria-label="Cuadros: wheatpaste" style={{ position: "relative" }}>
          <Wheatpaste prints={prints} />
        </section>
      )}

      <div className="px-5 md:px-12 max-w-[1440px] mx-auto pb-16">
        {others.length > 0 && (
          <section aria-labelledby="shop-others" className="mt-20">
            <h2 id="shop-others" className="label border-b-2 border-border pb-3 mb-8">Otros</h2>
            <ul className={grid}>
              {others.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16 border-t-2 border-border pt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="label">Archivo de prendas: piezas de drops anteriores, conservadas como registro.</span>
          <Link to="/archive?filter=collections" className="label inline-flex items-center min-h-[44px] underline underline-offset-4 decoration-2">
            Ver colecciones completas →
          </Link>
        </div>
      </div>
    </main>
  );
}
