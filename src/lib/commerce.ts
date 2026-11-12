import { products, type Product, type ProductVariant } from "@/data/products";

// Configuración de compras. Todo queda deshabilitado hasta que exista un receptor real de pedidos.
// Ver CONTENIDO.md → "Activar compras online".
const orderEndpoint = (import.meta.env.VITE_ORDER_ENDPOINT as string | undefined)?.trim() ?? "";

export const commerce = {
  /** El checkout solo se habilita con la variable explícita Y un endpoint configurado. */
  checkoutEnabled: import.meta.env.VITE_CHECKOUT_ENABLED === "true" && orderEndpoint.length > 0,
  orderEndpoint,
  shipping: [
    { title: "Retiro", text: "Retiro en La Plata, a coordinar." },
    { title: "Envío", text: "El envío y su costo se coordinan por privado al confirmar el pedido." },
  ],
};

export const formatPrice = (n: number) => `$${n.toLocaleString("es-AR")}`;

export const getProduct = (id: number) => products.find((p) => p.id === id);

export const publicProducts = () => products.filter((p) => p.listed);

export const getVariant = (product: Product, sku?: string): ProductVariant | undefined =>
  sku ? product.variants?.find((v) => v.sku === sku) : undefined;

/** Stock disponible para el producto (o la variante elegida). */
export const availableStock = (product: Product, sku?: string) => {
  if (product.variants?.length) return getVariant(product, sku)?.stock ?? 0;
  return product.stock ?? 0;
};

/** ¿Se puede vender este producto en general? (sin mirar la variante) */
export const isForSale = (product: Product) =>
  product.verified &&
  product.status === "AVAILABLE" &&
  typeof product.price === "number" &&
  product.price > 0 &&
  (product.variants?.length ? product.variants.some((v) => v.stock > 0) : (product.stock ?? 0) > 0);

/** ¿Se puede agregar esta combinación producto/variante al carrito? */
export const canPurchase = (product: Product, sku?: string) => {
  if (!isForSale(product)) return false;
  if (product.variants?.length && !getVariant(product, sku)) return false;
  return availableStock(product, sku) > 0;
};

export const statusLabel: Record<Product["status"], string> = {
  AVAILABLE: "Disponible",
  "COMING SOON": "Próximamente",
  "SOLD OUT": "Agotado",
  ARCHIVE: "Archivo",
};

/** Estado que se muestra al público (un AVAILABLE sin verificar no se presenta como disponible). */
export const displayStatus = (product: Product) => {
  if (product.status === "AVAILABLE" && !isForSale(product)) return "A confirmar";
  return statusLabel[product.status];
};
