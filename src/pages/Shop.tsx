import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import Notice from "@/components/site/Notice";
import SmartImage from "@/components/site/SmartImage";
import { publicProducts, isForSale, displayStatus, formatPrice, commerce } from "@/lib/commerce";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import type { Product } from "@/data/products";

function ProductCard({ product, i }: { product: Product; i: number }) {
  const forSale = isForSale(product);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.05 }}
    >
      <Link to={`/shop/${product.id}`} className="group flex flex-col">
        <div className="aspect-[3/4] overflow-hidden bg-black border border-border relative mb-3">
          <SmartImage
            src={product.images[0]}
            thumb
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${forSale ? "" : "grayscale"}`}
          />
          <span className="absolute top-2 left-2 bg-background/90 border border-border px-2 py-1 font-mono-tight text-foreground">
            {displayStatus(product)}
          </span>
        </div>
        <div className="font-mono-tight text-muted-foreground">
          {product.collection ? `${product.collection.name} · ${product.collection.season}` : product.category}
        </div>
        <h3 className="mt-1 font-serif text-xl uppercase tracking-wide text-foreground">{product.name}</h3>
        {forSale && product.price && <div className="mt-1 font-mono-tight text-foreground">{formatPrice(product.price)}</div>}
      </Link>
    </motion.div>
  );
}

export default function Shop() {
  usePageMeta({ title: "Shop", description: "Prendas y objetos físicos de BADDER, y archivo de prendas de drops anteriores." });

  const all = publicProducts();
  const forSale = all.filter(isForSale);
  const upcoming = all.filter((p) => !isForSale(p) && p.status !== "ARCHIVE");
  const archive = all.filter((p) => p.status === "ARCHIVE");

  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-6 md:px-16 max-w-6xl mx-auto">
        <PageHeader kicker="Prendas & objetos" title="Shop" />

        {/* Disponibles */}
        <section aria-labelledby="shop-available" className="mb-20">
          <h2 id="shop-available" className="font-mono-tight text-foreground border-b border-border pb-3 mb-8 flex justify-between">
            <span>Disponible ahora</span>
            <span className="text-muted-foreground">{String(forSale.length).padStart(2, "0")}</span>
          </h2>

          {forSale.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {forSale.map((p, i) => (
                <ProductCard key={p.id} product={p} i={i} />
              ))}
            </div>
          ) : (
            <Notice title="Nuevo drop en preparación">
              Por ahora no hay prendas a la venta en la web. Las próximas remeras de BADDER se van a publicar acá.
              Para consultas escribinos a{" "}
              <a className="text-foreground underline underline-offset-4" href={contact.instagramUrl} target="_blank" rel="noreferrer">
                {contact.instagramHandle}
              </a>
              .
            </Notice>
          )}

          {forSale.length > 0 && !commerce.checkoutEnabled && (
            <p className="mt-8 font-mono-tight text-muted-foreground">
              Las compras online todavía no están habilitadas: consultá disponibilidad por Instagram o mail.
            </p>
          )}
        </section>

        {upcoming.length > 0 && (
          <section aria-labelledby="shop-upcoming" className="mb-20">
            <h2 id="shop-upcoming" className="font-mono-tight text-foreground border-b border-border pb-3 mb-8">
              Próximamente
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {upcoming.map((p, i) => (
                <ProductCard key={p.id} product={p} i={i} />
              ))}
            </div>
          </section>
        )}

        {/* Archivo de prendas */}
        {archive.length > 0 && (
          <section aria-labelledby="shop-archive">
            <div className="border-b border-border pb-3 mb-8 flex flex-wrap justify-between gap-2">
              <h2 id="shop-archive" className="font-mono-tight text-foreground">
                Archivo de prendas
              </h2>
              <Link to="/archive?filter=collections" className="font-mono-tight text-muted-foreground hover:text-foreground">
                Ver colecciones completas →
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8 max-w-xl">
              Piezas de drops anteriores. Se conservan como registro; no están a la venta.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
              {archive.map((p, i) => (
                <ProductCard key={p.id} product={p} i={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
