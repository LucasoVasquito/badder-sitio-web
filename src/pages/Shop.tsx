import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import Notice from "@/components/site/Notice";
import SmartImage from "@/components/site/SmartImage";
import { publicProducts, isForSale, displayStatus, formatPrice, commerce } from "@/lib/commerce";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import type { Product } from "@/data/products";

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

export default function Shop() {
  usePageMeta({ title: "Indumentaria", description: "Prendas y objetos de BADDER, y archivo de prendas de drops anteriores." });

  const all = publicProducts();
  const forSale = all.filter(isForSale);
  const upcoming = all.filter((p) => !isForSale(p) && p.status !== "ARCHIVE");
  const archive = all.filter((p) => p.status === "ARCHIVE");

  return (
    <main data-accent="lime" className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Prendas y objetos" title="Indumentaria" />

        {/* Disponibles */}
        <section aria-labelledby="shop-available" className="mb-20">
          <h2 id="shop-available" className="label border-b-2 border-border pb-3 mb-8 flex justify-between">
            <span>Disponible ahora</span>
            <span className="text-muted-foreground">{forSale.length}</span>
          </h2>

          {forSale.length > 0 ? (
            <ul className={grid}>
              {forSale.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          ) : (
            <Notice title="Nuevo drop en preparación">
              Por ahora no hay prendas a la venta en la web. Las próximas remeras de BADDER se van a publicar acá. Para consultas escribinos a{" "}
              <a className="underline underline-offset-4 decoration-2" href={contact.instagramUrl} target="_blank" rel="noreferrer">
                {contact.instagramHandle}
              </a>
              .
            </Notice>
          )}

          {forSale.length > 0 && !commerce.checkoutEnabled && (
            <p className="mt-8 label text-muted-foreground">Las compras online todavía no están habilitadas: consultá disponibilidad por Instagram o mail.</p>
          )}
        </section>

        {upcoming.length > 0 && (
          <section aria-labelledby="shop-upcoming" className="mb-20">
            <h2 id="shop-upcoming" className="label border-b-2 border-border pb-3 mb-8">
              Próximamente
            </h2>
            <ul className={grid}>
              {upcoming.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          </section>
        )}

        {/* Archivo de prendas */}
        {archive.length > 0 && (
          <section aria-labelledby="shop-archive">
            <div className="border-b-2 border-border pb-3 mb-6 flex flex-wrap items-center justify-between gap-2">
              <h2 id="shop-archive" className="label">
                Archivo de prendas
              </h2>
              <Link to="/archive?filter=collections" className="label inline-flex items-center min-h-[44px] underline underline-offset-4 decoration-2 hover:bg-accent">
                Ver colecciones completas →
              </Link>
            </div>
            <p className="text-lg mb-8 max-w-[56ch]">Piezas de drops anteriores. Se conservan como registro; no están a la venta.</p>
            <ul className={grid}>
              {archive.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
