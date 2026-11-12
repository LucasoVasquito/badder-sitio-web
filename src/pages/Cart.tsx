import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { getProduct, getVariant, availableStock, formatPrice, commerce } from "@/lib/commerce";
import { submitJSON } from "@/lib/submit";
import { contact } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";
import PageHeader from "@/components/site/PageHeader";
import Notice, { EmptyState } from "@/components/site/Notice";
import { btn } from "@/lib/ui";

const inputCls =
 "w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-foreground transition-colors rounded-none";

export default function Cart() {
  usePageMeta({ title: "Carrito" });
  const { lines, setQuantity, removeItem, clearCart } = useCartStore();

  const rows = lines.flatMap((l) => {
    const p = getProduct(l.productId);
    if (!p || !p.price) return [];
    const v = getVariant(p, l.sku);
    return [{ line: l, product: p, variant: v, stock: availableStock(p, l.sku), subtotal: p.price * l.quantity }];
  });
  const total = rows.reduce((n, r) => n + r.subtotal, 0);

  const summary = rows
    .map((r) => `- ${r.product.name}${r.variant ? ` (${[r.variant.size, r.variant.color].filter(Boolean).join(" / ")})` : ""} x${r.line.quantity} = ${formatPrice(r.subtotal)}`)
    .join("\n");

  // Checkout real (solo si está configurado)
  const [form, setForm] = useState({ name: "", email: "", phone: "", delivery: "RETIRO", address: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{ reference?: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) return setError("Completá nombre, mail y teléfono.");
    if (form.delivery === "ENVIO" && !form.address.trim()) return setError("Ingresá la dirección de envío.");
    setError("");
    setSending(true);
    const result = await submitJSON(commerce.orderEndpoint, {
      customer: form,
      items: rows.map((r) => ({ productId: r.product.id, sku: r.line.sku ?? null, quantity: r.line.quantity, unitPrice: r.product.price })),
      total,
    });
    setSending(false);
    if (result.ok) {
      // El pedido fue recibido por el servidor: recién ahí se vacía el carrito
      setConfirmed({ reference: result.reference });
      clearCart();
    } else {
      // Ante cualquier error el carrito se conserva
      setError(result.error ?? "Error desconocido.");
    }
  };

  if (confirmed) {
    return (
      <main className="bg-background min-h-screen pt-10 md:pt-16 pb-16">
        <div className="px-5 md:px-12 max-w-3xl mx-auto">
          <PageHeader kicker="Pedido recibido" title="Gracias" />
          <Notice title="Recibimos tu pedido" tone="success">
            {confirmed.reference && <>Referencia: <span className="text-foreground">{confirmed.reference}</span>. </>}
            Te vamos a escribir a {form.email} para coordinar el pago y la entrega.
          </Notice>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen pt-10 md:pt-16 pb-16 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker={`Carrito / ${rows.length} ítem${rows.length === 1 ? "" : "s"}`} title="Cart" />

        {rows.length === 0 ? (
          <EmptyState title="El carrito está vacío.">
            <Link to="/shop" className={btn.primary}>
              Ir al Shop
            </Link>
          </EmptyState>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Líneas */}
            <ul className="lg:col-span-7 flex flex-col border-t border-border">
              {rows.map(({ line, product, variant, stock, subtotal }) => (
                <li key={`${line.productId}-${line.sku ?? ""}`} className="flex gap-4 py-5 border-b border-border">
                  <Link to={`/shop/${product.id}`} className="w-20 h-24 shrink-0 bg-secondary border border-border overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-display text-xl text-foreground truncate">{product.name}</h2>
                        {variant && (
                          <div className="label text-muted-foreground mt-1">
                            {[variant.size && `Talle ${variant.size}`, variant.color].filter(Boolean).join(" · ")}
                          </div>
                        )}
                        <div className="label text-muted-foreground mt-1">{formatPrice(product.price!)} c/u</div>
                      </div>
                      <button type="button" onClick={() => removeItem(line.productId, line.sku)} aria-label={`Quitar ${product.name}`} className="text-muted-foreground hover:text-foreground self-start p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button type="button" aria-label="Restar uno" disabled={line.quantity <= 1} onClick={() => setQuantity(line.productId, line.sku, line.quantity - 1)} className="p-2 disabled:opacity-30">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center label text-foreground" aria-live="polite">{line.quantity}</span>
                        <button type="button" aria-label="Sumar uno" disabled={line.quantity >= stock} onClick={() => setQuantity(line.productId, line.sku, line.quantity + 1)} className="p-2 disabled:opacity-30">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono text-sm tracking-widest text-foreground">{formatPrice(subtotal)}</span>
                    </div>
                    {line.quantity >= stock && <span className="label text-muted-foreground">Máximo disponible</span>}
                  </div>
                </li>
              ))}
            </ul>

            {/* Resumen y checkout */}
            <aside className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex justify-between font-mono text-lg uppercase tracking-widest border-b border-border pb-4">
                <span className="text-muted-foreground">Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="label text-muted-foreground leading-relaxed">Envío no incluido: se coordina al confirmar el pedido.</p>

              {commerce.checkoutEnabled ? (
                <form onSubmit={submit} className="flex flex-col gap-6" noValidate>
                  {[
                    ["name", "Nombre y apellido *", "text"],
                    ["email", "Mail *", "email"],
                    ["phone", "Teléfono *", "tel"],
                  ].map(([key, label, type]) => (
                    <label key={key} className="flex flex-col gap-1">
                      <span className="label text-muted-foreground">{label}</span>
                      <input type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={inputCls} required />
                    </label>
                  ))}
                  <fieldset className="flex gap-4">
                    <legend className="label text-muted-foreground mb-2">Entrega</legend>
                    {["RETIRO", "ENVIO"].map((d) => (
                      <label key={d} className="flex items-center gap-2 text-sm">
                        <input type="radio" name="delivery" value={d} checked={form.delivery === d} onChange={() => setForm({ ...form, delivery: d })} />
                        {d === "RETIRO" ? "Retiro en La Plata" : "Envío"}
                      </label>
                    ))}
                  </fieldset>
                  {form.delivery === "ENVIO" && (
                    <label className="flex flex-col gap-1">
                      <span className="label text-muted-foreground">Dirección *</span>
                      <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputCls} />
                    </label>
                  )}
                  {error && <Notice title="No pudimos enviar el pedido" tone="error">{error} Tu carrito se mantiene.</Notice>}
                  <button type="submit" disabled={sending} className={btn.primary}>
                    {sending ? "Enviando…" : "Enviar pedido"}
                  </button>
                </form>
              ) : (
                <Notice title="Compras online todavía no habilitadas">
                  <p>Todavía no recibimos pedidos desde la web. Para consultar disponibilidad y reservar, escribinos:</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className={btn.secondary}>
                      Instagram ↗
                    </a>
                    <a
                      href={`mailto:${contact.email}?subject=${encodeURIComponent("Consulta Shop BADDER")}&body=${encodeURIComponent(`Hola BADDER, quiero consultar por:\n${summary}\n\nTotal estimado: ${formatPrice(total)}`)}`}
                      className={btn.secondary}
                    >
                      Consultar por mail
                    </a>
                  </div>
                </Notice>
              )}
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
