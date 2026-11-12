import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { publicProducts, isForSale, displayStatus } from "@/lib/commerce";

// Prendas de src/data/products.ts. Primero lo que está a la venta (verificado);
// si no hay nada, se muestran piezas de archivo rotuladas como tales.
const MAX_ITEMS = 4;
const apparel = publicProducts().filter((p) => p.category === "APPAREL");
const forSale = apparel.filter(isForSale);
const garments = (forSale.length ? forSale : apparel).slice(0, MAX_ITEMS);

export default function CurrentDrop() {
  if (garments.length === 0) return null;

  return (
    <section className="px-5 md:px-12 py-16 md:py-20 border-t border-border">
      <div className="wrap">
        <SectionHeader
          index="06"
          kicker={forSale.length ? "Prendas & objetos" : "Nuevo drop en preparación · Archivo de prendas"}
          title="Current Drop"
          link={{ to: "/shop", label: "Ver Shop" }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {garments.map((p, i) => {
            const available = isForSale(p);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/shop/${p.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary border border-border">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${available ? "" : "opacity-70"}`}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-2 label">
                    <span className="text-foreground truncate">{p.name}</span>
                    <span className={`shrink-0 ${available ? "text-foreground" : "text-muted-foreground"}`}>{displayStatus(p)}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
