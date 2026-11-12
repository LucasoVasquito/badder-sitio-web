export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  status: "AVAILABLE" | "SOLD OUT" | "COMING SOON" | "UNAVAILABLE";
  price: number;
  description: string;
}

export const products: Product[] = [
  { 
    id: 1, 
    name: "BUNKER 001 TEE", 
    category: "MERCH", 
    image: "/drop3/foto (4).webp", 
    status: "SOLD OUT",
    price: 25000,
    description: "Remera de algodón pesado 24/1. Corte boxy fit, hombros caídos. Estampa en serigrafía en frente y espalda. Grifa lateral tejida. Talles del S al XL."
  },
  { 
    id: 2, 
    name: "NOISE HOODIE", 
    category: "MERCH", 
    image: "/drop3/foto (31).webp", 
    status: "COMING SOON",
    price: 48000,
    description: "Buzo canguro de frisa invisible premium. Estampa en serigrafía de alto relieve en el frente. Capucha forrada y grifa lateral."
  },
  { 
    id: 3, 
    name: "BADDER ZINE VOL.1", 
    category: "EDITORIAL", 
    image: "/drop2/foto (1).webp", 
    status: "UNAVAILABLE",
    price: 8000,
    description: "Primera edición de nuestro fanzine impreso. 24 páginas a color con fotografía de archivo, diseño gráfico y textos sobre la cultura de club local."
  },
  { id: 4, name: "ACID SAMPLE PACK", category: "DIGITAL", image: "/drop1/foto (5).webp", status: "AVAILABLE", price: 5000, description: "Colección de 50+ loops y one-shots de 303. Sonidos crudos y procesados, listos para usar en Ableton, FL Studio o cualquier DAW. Formato WAV 24-bit." },
  { id:5, name: "EXTASYS TEE", category: "MERCH", image: "/drop2/foto (11).webp", status: "AVAILABLE", price: 22000, description: "Remera de algodón 24/1. Corte regular. Estampa en serigrafía al agua, tacto cero. Diseño inspirado en la gráfica de los 90s." },
  { id: 6, name: "ROSSET POSTER", category: "PRINT", image: "/flyers/foto 4.webp", status: "SOLD OUT", price: 7500, description: "Póster impreso en papel ilustración de 300gr. Tamaño A3. Edición limitada y numerada de 50 unidades. No se vuelve a imprimir." },
  { id: 7, name: "GLITCH ASSETS", category: "DIGITAL", image: "/drop3/foto (40).webp", status: "UNAVAILABLE", price: 0, description: "Pack de texturas y assets visuales en alta resolución para VJs y diseñadores. Formatos PNG y MP4." },
  { id: 8, name: "BLUE CLIFFORD KNIT", category: "MERCH", image: "/drop3/foto (28).webp", status: "SOLD OUT", price: 65000, description: "Buzo tejido de hilo de algodón. Diseño custom-fit con intarsia en el frente y espalda. Producido en unidades ultra limitadas." },
];