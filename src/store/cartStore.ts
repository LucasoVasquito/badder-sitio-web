import { create } from "zustand";
import { persist } from "zustand/middleware";
import { availableStock, canPurchase, getProduct } from "@/lib/commerce";

export interface CartLine {
  productId: number;
  /** Variante (talle/color). Vacío en productos sin variantes. */
  sku?: string;
  quantity: number;
}

export interface AddResult { ok: boolean; reason?: string }

interface CartState {
  lines: CartLine[];
  addItem: (productId: number, sku?: string, quantity?: number) => AddResult;
  setQuantity: (productId: number, sku: string | undefined, quantity: number) => void;
  removeItem: (productId: number, sku?: string) => void;
  clearCart: () => void;
}

const sameLine = (l: CartLine, productId: number, sku?: string) => l.productId === productId && l.sku === sku;

/** Descarta líneas que ya no se pueden comprar y ajusta cantidades al stock actual. */
const sanitize = (lines: CartLine[]): CartLine[] =>
  lines.flatMap((l) => {
    const p = getProduct(l.productId);
    if (!p || !canPurchase(p, l.sku)) return [];
    const qty = Math.min(Math.max(1, Math.floor(l.quantity)), availableStock(p, l.sku));
    return qty > 0 ? [{ ...l, quantity: qty }] : [];
  });

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (productId, sku, quantity = 1) => {
        const p = getProduct(productId);
        if (!p) return { ok: false, reason: "Producto no encontrado." };
        if (p.variants?.length && !sku) return { ok: false, reason: "Elegí un talle." };
        if (!canPurchase(p, sku)) return { ok: false, reason: "Este producto no está disponible para la venta." };

        const stock = availableStock(p, sku);
        const existing = get().lines.find((l) => sameLine(l, productId, sku));
        const next = (existing?.quantity ?? 0) + quantity;
        if (next > stock) return { ok: false, reason: `Solo hay ${stock} unidad${stock === 1 ? "" : "es"} disponible${stock === 1 ? "" : "s"}.` };

        set({
          lines: existing
            ? get().lines.map((l) => (sameLine(l, productId, sku) ? { ...l, quantity: next } : l))
            : [...get().lines, { productId, sku, quantity }],
        });
        return { ok: true };
      },
      setQuantity: (productId, sku, quantity) => {
        const p = getProduct(productId);
        if (!p) return;
        const qty = Math.min(Math.max(1, Math.floor(quantity)), availableStock(p, sku));
        set({ lines: get().lines.map((l) => (sameLine(l, productId, sku) ? { ...l, quantity: qty } : l)) });
      },
      removeItem: (productId, sku) => set({ lines: get().lines.filter((l) => !sameLine(l, productId, sku)) }),
      clearCart: () => set({ lines: [] }),
    }),
    {
      name: "badder-cart",
      version: 2,
      partialize: (s) => ({ lines: s.lines }),
      // Al recargar, se vuelve a validar contra el catálogo actual
      merge: (persisted, current) => ({
        ...current,
        lines: sanitize(((persisted as Partial<CartState>)?.lines ?? []) as CartLine[]),
      }),
      migrate: () => ({ lines: [] }),
    }
  )
);

export const useCartCount = () => useCartStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
