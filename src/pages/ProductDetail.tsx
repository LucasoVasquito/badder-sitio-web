import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import {
  getProduct,
  isForSale,
  canPurchase,
  availableStock,
  displayStatus,
  formatPrice,
  commerce,
} from "@/lib/commerce";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import Lightbox from "@/components/site/Lightbox";
import Notice from "@/components/site/Notice";
import { btn } from "@/lib/ui";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = getProduct(Number(productId));
  const visible = product?.listed ? product : undefined;
  const addItem = useCartStore((s) => s.addItem);

  const [imageIndex, setImageIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sku, setSku] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  usePageMeta({
    title: visible?.name ?? "Producto",
    description: visible ? `${visible.name} — ${visible.collection ? `${visible.collection.name} ${visible.collection.season}` : "BADDER"}` : undefined,
    image: visible?.images[0],
  });

  if (!visible) return <NotFound />;
  const p = visible;

  const forSale = isForSale(p);
  const hasVariants = !!p.variants?.length;
  const stock = hasVariants ? (sku ? availableStock(p, sku) : undefined) : availableStock(p);
  const purchasable = canPurchase(p, sku);
  const images = p.images.map((src, i) => ({ src, alt: `${p.name} — imagen ${i + 1}`, caption: p.name, credit: p.credits ? `Diseño: ${p.credits}` : undefined }));

  const handleAdd = () => {
    const r = addItem(p.id, sku, 1);
    setMessage(r.ok ? { ok: true, text: "Agregado al carrito." } : { ok: false, text: r.reason });
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 wrap">
        <Link to="/shop" className="mb-10 inline-block label text-muted-foreground hover:text-foreground transition-colors">
          ← Volver al Shop
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Galería */}
          <div>
            <button
              type="button"
              onClick={() => setLightbox(imageIndex)}
              className="block w-full aspect-[3/4] bg-secondary border border-border overflow-hidden cursor-zoom-in"
              aria-label="Ampliar imagen"
            >
              <img src={p.images[imageIndex]} alt={images[imageIndex].alt} className={`w-full h-full object-cover ${forSale ? "" : ""}`} />
            </button>
            {p.images.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {p.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Ver imagen ${i + 1}`}
                    aria-current={i === imageIndex}
                    className={`aspect-square overflow-hidden border ${i === imageIndex ? "border-foreground" : "border-border opacity-60 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="flex flex-col">
            <div className="label text-muted-foreground mb-4 flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-foreground">{displayStatus(p)}</span>
              {p.collection && <span>{p.collection.name} · {p.collection.season}</span>}
              <span>{p.kind === "physical" ? "Objeto físico" : "Digital"}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-foreground leading-none mb-6">{p.name}</h1>

            {forSale && p.price ? (
              <div className="font-mono text-2xl tracking-widest text-foreground mb-6">{formatPrice(p.price)}</div>
            ) : null}

            {p.description && forSale && <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">{p.description}</p>}

            <dl className="grid grid-cols-[auto,1fr] gap-x-6 gap-y-2 text-sm border-t border-border pt-6 mb-8">
              {p.credits && (
                <>
                  <dt className="label text-muted-foreground pt-0.5">Diseño</dt>
                  <dd className="text-foreground">{p.credits}</dd>
                </>
              )}
              {forSale && p.materials && (
                <>
                  <dt className="label text-muted-foreground pt-0.5">Material</dt>
                  <dd className="text-foreground">{p.materials}</dd>
                </>
              )}
              {forSale && p.printing && (
                <>
                  <dt className="label text-muted-foreground pt-0.5">Estampado</dt>
                  <dd className="text-foreground">{p.printing}</dd>
                </>
              )}
              {forSale && typeof stock === "number" && (
                <>
                  <dt className="label text-muted-foreground pt-0.5">Stock</dt>
                  <dd className="text-foreground">{stock > 0 ? `${stock} disponible${stock === 1 ? "" : "s"}` : "Sin stock"}</dd>
                </>
              )}
            </dl>

            {forSale ? (
              <>
                {hasVariants && (
                  <fieldset className="mb-6">
                    <legend className="label text-muted-foreground mb-3">Talle</legend>
                    <div className="flex flex-wrap gap-2">
                      {p.variants!.map((v) => (
                        <button
                          key={v.sku}
                          type="button"
                          disabled={v.stock <= 0}
                          onClick={() => {
                            setSku(v.sku);
                            setMessage(null);
                          }}
                          aria-pressed={sku === v.sku}
                          className={`min-w-12 px-3 py-2 border label transition-colors ${
                            sku === v.sku ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:border-foreground"
                          } disabled:opacity-30 disabled:line-through`}
                        >
                          {[v.size, v.color].filter(Boolean).join(" · ") || v.sku}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
                <button type="button" onClick={handleAdd} disabled={!purchasable} className={`${btn.primary} w-full md:w-auto`}>
                  Agregar al carrito <ShoppingBag className="w-4 h-4" />
                </button>
                {message && (
                  <p role="status" className={`mt-4 label ${message.ok ? "text-foreground" : "text-destructive"}`}>
                    {message.ok && <Check className="inline w-3 h-3 mr-1" />}
                    {message.text}{" "}
                    {message.ok && (
                      <Link to="/cart" className="underline underline-offset-4">
                        Ver carrito
                      </Link>
                    )}
                  </p>
                )}
              </>
            ) : (
              <Notice title={p.status === "ARCHIVE" ? "Pieza de archivo" : "No disponible para la venta"}>
                {p.status === "ARCHIVE"
                  ? "Esta prenda formó parte de un drop anterior. Se conserva como registro y no está a la venta."
                  : "Este producto todavía no se puede comprar."}{" "}
                {p.collection && (
                  <Link to="/archive?filter=collections" className="text-foreground underline underline-offset-4">
                    Ver la colección en el archivo
                  </Link>
                )}
              </Notice>
            )}

            {/* Envío y retiro */}
            {p.kind === "physical" && forSale && (
              <div className="mt-10 border-t border-border pt-6">
                <h2 className="label text-foreground mb-3">Envío y retiro</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {commerce.shipping.map((s) => (
                    <li key={s.title}>
                      <span className="text-foreground">{s.title}:</span> {s.text}
                    </li>
                  ))}
                </ul>
                {!commerce.checkoutEnabled && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Las compras online todavía no están habilitadas. Para reservar escribinos a{" "}
                    <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="text-foreground underline underline-offset-4">
                      {contact.instagramHandle}
                    </a>{" "}
                    o <a href={`mailto:${contact.email}`} className="text-foreground underline underline-offset-4">{contact.email}</a>.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </main>
  );
}
