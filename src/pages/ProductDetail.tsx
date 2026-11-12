import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { getProduct, isForSale, canPurchase, availableStock, displayStatus, formatPrice, commerce } from "@/lib/commerce";
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
    <main data-accent="lime" className="bg-background min-h-screen pt-10 md:pt-14 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <Link to="/shop" className="inline-flex items-center min-h-[44px] mb-6 label underline underline-offset-4 decoration-2 hover:bg-accent">
          ← Indumentaria
        </Link>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14">
          {/* Galería: la fotografía completa, sin recorte */}
          <div className="md:col-span-7">
            <button
              type="button"
              onClick={() => setLightbox(imageIndex)}
              className="block w-full aspect-[4/5] bg-secondary overflow-hidden cursor-zoom-in"
              aria-label="Ampliar imagen"
            >
              <img src={p.images[imageIndex]} alt={images[imageIndex].alt} className="w-full h-full object-contain" />
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
                    className={`aspect-square overflow-hidden bg-secondary border-2 ${i === imageIndex ? "border-foreground" : "border-transparent hover:border-foreground/40"}`}
                  >
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información */}
          <div className="md:col-span-5 flex flex-col">
            <div className="label mb-4 flex flex-wrap gap-x-4 gap-y-1">
              <span className={`px-2 py-0.5 ${forSale ? "bg-accent text-accent-foreground" : "border-2 border-foreground"}`}>{displayStatus(p)}</span>
              <span className="text-muted-foreground">{p.kind === "physical" ? "Objeto físico" : "Digital"}</span>
            </div>
            <h1 className="font-display text-title [text-wrap:balance]">{p.name}</h1>

            {forSale && p.price ? <div className="mt-5 font-display text-h2">{formatPrice(p.price)}</div> : null}
            {p.description && forSale && <p className="mt-5 text-lg max-w-[48ch]">{p.description}</p>}

            {/* Créditos tratados como etiqueta de prenda */}
            <dl className="mt-8 mb-8 border-2 border-foreground grid grid-cols-[auto,1fr] text-base">
              <dt className="col-span-2 label px-4 py-2 bg-foreground text-background">Etiqueta · BADDER</dt>
              {p.collection && (
                <>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Colección</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{p.collection.name}</dd>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Temporada</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{p.collection.season}</dd>
                </>
              )}
              {p.credits && (
                <>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Diseño</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{p.credits}</dd>
                </>
              )}
              {forSale && p.materials && (
                <>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Material</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{p.materials}</dd>
                </>
              )}
              {forSale && p.printing && (
                <>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Estampado</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{p.printing}</dd>
                </>
              )}
              {forSale && typeof stock === "number" && (
                <>
                  <dt className="label text-muted-foreground px-4 py-3 border-t border-border">Stock</dt>
                  <dd className="px-4 py-3 border-t border-border font-semibold">{stock > 0 ? `${stock} disponible${stock === 1 ? "" : "s"}` : "Sin stock"}</dd>
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
                          className={`min-w-12 min-h-[44px] px-3 border-2 border-foreground label transition-colors ${
                            sku === v.sku ? "bg-foreground text-background" : "hover:bg-accent hover:text-accent-foreground"
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
                  <p role="status" className={`mt-4 label ${message.ok ? "" : "text-destructive"}`}>
                    {message.ok && <Check className="inline w-4 h-4 mr-1" />}
                    {message.text}{" "}
                    {message.ok && (
                      <Link to="/cart" className="underline underline-offset-4 decoration-2">
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
                  <Link to="/archive?filter=collections" className="underline underline-offset-4 decoration-2 hover:bg-accent">
                    Ver la colección en el archivo
                  </Link>
                )}
              </Notice>
            )}

            {/* Envío y retiro */}
            {p.kind === "physical" && forSale && (
              <div className="mt-10 border-t-2 border-border pt-6">
                <h2 className="label mb-3">Envío y retiro</h2>
                <ul className="space-y-2">
                  {commerce.shipping.map((s) => (
                    <li key={s.title}>
                      <span className="font-semibold">{s.title}:</span> {s.text}
                    </li>
                  ))}
                </ul>
                {!commerce.checkoutEnabled && (
                  <p className="mt-4">
                    Las compras online todavía no están habilitadas. Para reservar escribinos a{" "}
                    <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-2">
                      {contact.instagramHandle}
                    </a>{" "}
                    o{" "}
                    <a href={`mailto:${contact.email}`} className="underline underline-offset-4 decoration-2">
                      {contact.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </main>
  );
}
