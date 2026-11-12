import { Link } from "react-router-dom";
import { OpArt, ThornFrame, Sticker } from "@/components/flyer";
import { publicProducts, isForSale, displayStatus } from "@/lib/commerce";

// Prendas de src/data/products.ts. Si hay algo a la venta (verificado) va primero; si no, piezas de archivo rotuladas como tales (sin precio).
const MAX_ITEMS = 4;
const apparel = publicProducts().filter((p) => p.category === "APPAREL");
const forSale = apparel.filter(isForSale);
const garments = (forSale.length ? forSale : apparel).slice(0, MAX_ITEMS);
const ROT = ["-rotate-[2deg]", "rotate-[1.5deg]", "-rotate-[1deg]", "rotate-[2.5deg]"];

export default function CurrentDrop() {
  if (garments.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-background px-5 md:px-12 py-20 md:py-28">
      <OpArt className="-z-10 opacity-80" />
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-12 items-center">
          <div className="md:col-span-6 relative min-h-[320px]">
            <div className="relative max-w-[480px] -rotate-[2deg]">
              <ThornFrame className="bg-[hsl(var(--ink))]">
                <img src="/drop3/foto (10).webp" alt="Gráfica del perrito fumador, Drop 3" loading="lazy" className="w-full aspect-[4/5] object-contain" />
              </ThornFrame>
              <img
                src="/drop3/foto (27).webp"
                alt=""
                aria-hidden
                data-depth="30"
                loading="lazy"
                className="absolute -bottom-6 -right-10 md:-right-20 w-[55%] h-auto object-contain z-10"
              />
            </div>
          </div>

          <div className="md:col-span-6 relative">
            <span aria-hidden className="f-script block text-[clamp(3rem,8vw,7rem)] leading-none text-[hsl(var(--a))] -rotate-6 ml-2 -mb-2 relative z-10">
              current
            </span>
            <h2 className="f-ethno text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.95] bg-background inline-block pr-3">Drop 3</h2>
            <div className="label mt-3 bg-background inline-block px-2 py-1">SS25 · {forSale.length ? "Prendas y objetos" : "Piezas de archivo · Compras deshabilitadas"}</div>

            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8">
              {garments.map((p, i) => {
                const available = isForSale(p);
                return (
                  <li key={p.id}>
                    <Link to={`/shop/${p.id}`} className={`cut group block ${ROT[i % ROT.length]} bg-background border-2 border-foreground`}>
                      <div className="aspect-[3/4] overflow-hidden bg-secondary">
                        <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      <div className="p-2">
                        <div className="label text-muted-foreground">{p.collection ? `${p.collection.name} · ${p.collection.season}` : "BADDER"}</div>
                        <div className="f-news font-bold leading-tight">{p.name}</div>
                        <Sticker tone={available ? "b" : "paper"} rotate={0} className="mt-1">
                          {displayStatus(p)}
                        </Sticker>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link to="/shop" className="inline-flex items-center min-h-[48px] mt-10 px-6 border-2 border-foreground bg-background label hover:bg-accent hover:text-accent-foreground transition-colors">
              Ver colección →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
