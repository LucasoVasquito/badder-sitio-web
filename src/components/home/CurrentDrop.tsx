import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { publicProducts, isForSale, displayStatus } from "@/lib/commerce";

// Prendas de src/data/products.ts. Si hay algo a la venta (verificado) va primero; si no, piezas de archivo rotuladas como tales (sin precio).
const MAX_ITEMS = 4;
const apparel = publicProducts().filter((p) => p.category === "APPAREL");
const forSale = apparel.filter(isForSale);
const garments = (forSale.length ? forSale : apparel).slice(0, MAX_ITEMS);

export default function CurrentDrop() {
  if (garments.length === 0) return null;

  return (
    <section className="px-5 md:px-12 pt-20 md:pt-28">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader
          kicker={forSale.length ? "Prendas y objetos" : "Piezas de archivo · Compras deshabilitadas"}
          title="Indumentaria"
          link={{ to: "/shop", label: "Ver colección" }}
        />

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {garments.map((p) => {
            const available = isForSale(p);
            return (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 label text-muted-foreground">{p.collection ? `${p.collection.name} · ${p.collection.season}` : "BADDER"}</div>
                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <span className="font-semibold group-hover:underline underline-offset-4 decoration-2">{p.name}</span>
                    <span className={`label shrink-0 px-1.5 ${available ? "bg-accent text-accent-foreground" : "border border-border"}`}>{displayStatus(p)}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
