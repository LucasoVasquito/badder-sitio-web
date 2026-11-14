// Catálogo de BADDER.
//
// REGLA: un producto solo se puede comprar si `verified: true`, `status: "AVAILABLE"`,
// tiene `price` y stock (> 0). Todo lo que no cumpla eso se muestra como archivo o no se muestra.
// Ver CONTENIDO.md → "Shop" para cargar productos nuevos.

export type ProductKind = "physical" | "digital";
export type ProductCategory = "APPAREL" | "PRINT" | "EDITORIAL" | "DIGITAL";
/**
 * AVAILABLE   → a la venta (requiere verified, precio y stock)
 * COMING SOON → anunciado, no se puede comprar
 * SOLD OUT    → agotado, no se puede comprar
 * ARCHIVE     → pieza histórica de un drop anterior; se muestra como archivo
 */
export type ProductStatus = "AVAILABLE" | "COMING SOON" | "SOLD OUT" | "ARCHIVE";

export interface ProductVariant {
  sku: string;
  size?: string;
  color?: string;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  kind: ProductKind;
  category: ProductCategory;
  status: ProductStatus;
  /** true solo cuando BADDER confirmó nombre, precio, stock y ficha. */
  verified: boolean;
  /** false = no aparece en el sitio (datos de ejemplo pendientes de confirmar). */
  listed: boolean;
  /** La primera imagen es la portada. */
  images: string[];
  /** Precio en ARS. Se muestra solo si el producto está verificado. */
  price?: number;
  description?: string;
  materials?: string;
  printing?: string;
  collection?: { name: string; season: string };
  /** Créditos de diseño (tomados del lookbook de la colección). */
  credits?: string;
  /** Indumentaria: una variante por talle/color con su stock. */
  variants?: ProductVariant[];
  /** Productos sin variantes. */
  stock?: number;
  /** Texto original del catálogo anterior, sin verificar. No se muestra. */
  unverifiedNotes?: string;

  // --- v4: Line-up (remeras) y Wheatpaste (cuadros) ---
  /** Dónde se exhibe en /shop: 'tee' = line-up, 'print' = pared de afiches. Sin valor = no se exhibe ahí. */
  format?: "tee" | "print";
  /** Remeras: las destacadas van primero en el line-up (headliner). */
  featured?: boolean;
  /**
   * Remeras: foto de frente / espalda (idealmente PNG recortado). TODO: faltan.
   * Mientras no existan, el escenario usa `images[0]` / `images[1]`; sin espalda se muestra "FALTA ARCHIVO".
   */
  imageFront?: string;
  imageBack?: string;
  /** Cuadros: medidas disponibles (la primera es la que se muestra en la pared). */
  sizes?: PrintSize[];
  /** Cuadros: precio por medida en ARS. Sin precio se muestra "CONSULTAR". */
  sizePrices?: Partial<Record<PrintSize, number>>;
  /** Cuadros: variantes de marco (la primera es la de la pared). */
  frames?: PrintFrame[];
  /** Cuadros: foto REAL del cuadro colgado. Si no existe no se muestra la pestaña "Visto en la pared". */
  imageInSitu?: string;
  /** Datos provisorios: se muestran con la marca TODO hasta que BADDER los confirme. */
  todo?: boolean;
}

export type PrintSize = "A4" | "A3" | "50×70";
export type PrintFrame = "negro" | "blanco" | "sin marco";
/** Medidas reales en cm (ancho × alto, vertical). */
export const PRINT_SIZES_CM: Record<PrintSize, [number, number]> = { A4: [21, 29.7], A3: [29.7, 42], "50×70": [50, 70] };

export const products: Product[] = [
  // --- Prendas de drops anteriores (archivo) ---
  {
    id: 1,
    name: "BUNKER 001 TEE",
    kind: "physical",
    category: "APPAREL",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precio y stock reales
    price: 25000,
    variants: [
      { sku: "BKR-S", size: "S", stock: 5 },
      { sku: "BKR-M", size: "M", stock: 5 },
      { sku: "BKR-L", size: "L", stock: 5 },
      { sku: "BKR-XL", size: "XL", stock: 5 },
    ],
    listed: true,
    images: ["/drop3/foto (4).webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Lucas Nicolas Bengochea",
    format: "tee",
    featured: true,
    // TODO: PNG recortados de frente y espalda (imageFront / imageBack).
    unverifiedNotes:
      "Catálogo anterior: SOLD OUT, $25.000. Remera de algodón pesado 24/1. Corte boxy fit, hombros caídos. Estampa en serigrafía en frente y espalda. Grifa lateral tejida. Talles del S al XL.",
  },
  {
    id: 2,
    name: "NOISE HOODIE",
    kind: "physical",
    category: "APPAREL",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precio y stock reales
    price: 48000,
    variants: [
      { sku: "NHD-S", size: "S", stock: 5 },
      { sku: "NHD-M", size: "M", stock: 5 },
      { sku: "NHD-L", size: "L", stock: 5 },
      { sku: "NHD-XL", size: "XL", stock: 5 },
    ],
    listed: true,
    images: ["/drop3/foto (31).webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Lucas Nicolas Bengochea",
    format: "tee",
    // TODO: PNG recortados de frente y espalda (imageFront / imageBack).
    unverifiedNotes:
      "Catálogo anterior: COMING SOON, $48.000. Buzo canguro de frisa invisible premium. Estampa en serigrafía de alto relieve en el frente. Capucha forrada y grifa lateral.",
  },
  {
    id: 5,
    name: "EXTASYS TEE",
    kind: "physical",
    category: "APPAREL",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precio y stock reales
    price: 22000,
    variants: [
      { sku: "EXT-S", size: "S", stock: 5 },
      { sku: "EXT-M", size: "M", stock: 5 },
      { sku: "EXT-L", size: "L", stock: 5 },
      { sku: "EXT-XL", size: "XL", stock: 5 },
    ],
    listed: true,
    images: ["/drop2/foto (11).webp", "/drop2/foto (1).webp", "/drop2/foto (21).webp"],
    collection: { name: "DROP 2", season: "FW24" },
    credits: "Javier Almiron",
    format: "tee",
    // TODO: PNG recortados de frente y espalda (imageFront / imageBack).
    unverifiedNotes:
      "Catálogo anterior: AVAILABLE, $22.000. Remera de algodón 24/1. Corte regular. Estampa en serigrafía al agua, tacto cero. Diseño inspirado en la gráfica de los 90s.",
  },
  {
    id: 8,
    name: "BLUE CLIFFORD KNIT",
    kind: "physical",
    category: "APPAREL",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precio y stock reales
    price: 65000,
    variants: [
      { sku: "BCK-S", size: "S", stock: 5 },
      { sku: "BCK-M", size: "M", stock: 5 },
      { sku: "BCK-L", size: "L", stock: 5 },
      { sku: "BCK-XL", size: "XL", stock: 5 },
    ],
    listed: true,
    images: ["/drop3/foto (28).webp", "/drop3/foto (27).webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Juan Francisco Arias - Lucas Nicolas Bengochea",
    format: "tee",
    // TODO: PNG recortados de frente y espalda (imageFront / imageBack).
    unverifiedNotes:
      "Catálogo anterior: SOLD OUT, $65.000. Buzo tejido de hilo de algodón. Diseño custom-fit con intarsia en el frente y espalda. Producido en unidades ultra limitadas.",
  },

  // --- Artículos de ejemplo del catálogo anterior: ocultos hasta confirmar que existen ---
  {
    id: 3,
    name: "BADDER ZINE VOL.1",
    kind: "physical",
    category: "EDITORIAL",
    status: "COMING SOON",
    verified: false,
    listed: false,
    images: ["/drop2/foto (1).webp"],
    unverifiedNotes:
      "Catálogo anterior: UNAVAILABLE, $8.000. Primera edición de nuestro fanzine impreso. 24 páginas a color con fotografía de archivo, diseño gráfico y textos sobre la cultura de club local.",
  },
  {
    id: 4,
    name: "ACID SAMPLE PACK",
    kind: "digital",
    category: "DIGITAL",
    status: "COMING SOON",
    verified: false,
    listed: false,
    images: ["/drop1/foto (5).webp"],
    unverifiedNotes:
      "Catálogo anterior: AVAILABLE, $5.000. Colección de 50+ loops y one-shots de 303. Formato WAV 24-bit.",
  },
  {
    id: 6,
    name: "ROSSET POSTER",
    kind: "physical",
    category: "PRINT",
    status: "SOLD OUT",
    verified: false,
    listed: false,
    images: ["/flyers/foto 4.webp"],
    unverifiedNotes:
      "Catálogo anterior: SOLD OUT, $7.500. Póster A3 en papel ilustración 300gr. Edición limitada y numerada de 50 unidades.",
  },
  {
    id: 7,
    name: "GLITCH ASSETS",
    kind: "digital",
    category: "DIGITAL",
    status: "COMING SOON",
    verified: false,
    listed: false,
    images: ["/drop3/foto (40).webp"],
    unverifiedNotes: "Catálogo anterior: UNAVAILABLE. Pack de texturas y assets visuales para VJs y diseñadores.",
  },

  // --- Cuadros (pared de galería). TODO: diseños provisorios tomados de public/img; sin precio ni ficha real.
  //     Confirmar título, año, técnica, medidas y precio (`sizePrices`), sacar `todo`, y cargar la foto real del cuadro colgado en `imageInSitu`.
  {
    id: 20,
    name: "DJ AZUL",
    kind: "physical",
    category: "PRINT",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precios y stock reales
    price: 12000,
    stock: 10,
    sizePrices: { "50×70": 30000, A3: 22000, A4: 12000 },
    listed: true,
    images: ["/img/d3-dj-azul.webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Lucas Nicolas Bengochea",
    printing: "TODO: técnica",
    format: "print",
    sizes: ["50×70", "A3", "A4"],
    frames: ["negro", "blanco", "sin marco"],
    todo: true,
  },
  {
    id: 21,
    name: "PERRITO",
    kind: "physical",
    category: "PRINT",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precios y stock reales
    price: 12000,
    stock: 10,
    sizePrices: { "50×70": 30000, A3: 22000, A4: 12000 },
    listed: true,
    images: ["/img/p-drop3.webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Lucas Nicolas Bengochea",
    printing: "TODO: técnica",
    format: "print",
    sizes: ["A3", "A4", "50×70"],
    frames: ["blanco", "negro", "sin marco"],
    todo: true,
  },
  {
    id: 22,
    name: "THE SHOWCASE",
    kind: "physical",
    category: "PRINT",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precios y stock reales
    price: 12000,
    stock: 10,
    sizePrices: { "50×70": 30000, A3: 22000, A4: 12000 },
    listed: true,
    images: ["/img/d3-showcase.webp"],
    collection: { name: "DROP 3", season: "SS26" },
    credits: "Lucas Nicolas Bengochea",
    printing: "TODO: técnica",
    format: "print",
    sizes: ["A4", "A3", "50×70"],
    frames: ["negro", "blanco", "sin marco"],
    todo: true,
  },
  {
    id: 23,
    name: "EMERGENT",
    kind: "physical",
    category: "PRINT",
    status: "AVAILABLE",
    verified: true, // TODO: dato de ejemplo para testear compras; confirmar precios y stock reales
    price: 12000,
    stock: 10,
    sizePrices: { "50×70": 30000, A3: 22000, A4: 12000 },
    listed: true,
    images: ["/img/f-2.webp"],
    collection: { name: "Emergent x Badder", season: "2024" },
    printing: "TODO: técnica",
    format: "print",
    sizes: ["A3", "50×70", "A4"],
    frames: ["negro", "blanco", "sin marco"],
    todo: true,
  },

  // --- Remeras nuevas: completar con datos reales y pasar verified a true ---
  // {
  //   id: 9,
  //   name: "NOMBRE REAL",
  //   kind: "physical",
  //   category: "APPAREL",
  //   status: "AVAILABLE",
  //   verified: true,
  //   listed: true,
  //   images: ["/shop/remera-1/frente.webp", "/shop/remera-1/espalda.webp"],
  //   price: 0,
  //   description: "…",
  //   materials: "…",
  //   printing: "…",
  //   variants: [
  //     { sku: "R1-NEGRO-S", size: "S", color: "Negro", stock: 0 },
  //     { sku: "R1-NEGRO-M", size: "M", color: "Negro", stock: 0 },
  //   ],
  // },
];
