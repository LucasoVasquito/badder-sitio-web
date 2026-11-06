// Importamos las tapas de los álbumes de foto
import tom from "@/assets/tom.webp";
import emergent from "@/assets/emergent.webp";
import nahu from "@/assets/nahu.webp";
import goro from "@/assets/goro.webp";
import verano2025 from "@/assets/verano2025.webp";
import rosset from "@/assets/rosset.webp";
import cuchate_esta from "@/assets/cuchate.esta.webp";
import sesion from "@/assets/sesion.webp";
import capital from "@/assets/capital.webp";
import lpsport1 from "@/assets/lpsport1.webp";
import lpsport2 from "@/assets/lpsport2.webp";
import flash from "@/assets/flash.webp";

// 1. FOTOS
export const photos = [
  { id: "tom", type: "FOTO", thumb: tom, title: "Badder Showcase - Tom", meta: "Juan Francisco Arias / 2024", folder: "tom", imageCount: 41 },
  { id: "emergent", type: "FOTO", thumb: emergent, title: "Badder Showcase - Emergent", meta: "- / 2024", folder: "emergent", imageCount: 19 },
  { id: "nahu", type: "FOTO", thumb: nahu, title: "Segundo Drop: Bootleg", meta: "Nahuel y Lucas Bengochea / Dic 2024", folder: "nahu", imageCount: 11 },
  { id: "goro", type: "FOTO", thumb: goro, title: "Segundo drop (sesion)", meta: "Juan Francisco Arias / 2025", folder: "goro", imageCount: 26 },
  { id: "verano2025", type: "FOTO", thumb: verano2025, title: "Secuencias: Verano 2025", meta: "Juan Francisco Arias / 2025", folder: "verano2025", imageCount: 11 },
  { id: "rosset", type: "FOTO", thumb: rosset, title: "Badder Showcase - Rosset", meta: "Juan Francisco Arias / 2025", folder: "rosset", imageCount: 21 },
  { id: "cuchate.esta", type: "FOTO", thumb: cuchate_esta, title: "Uriel Galeano - Cuchate.esta", meta: "Juan Francisco Arias / 2025", folder: "cuchate.esta", imageCount: 17 },
  { id: "sesion", type: "FOTO", thumb: sesion, title: "Tercer drop (sesion)", meta: "Arias - Anguis - Crippa / 2025", folder: "sesion", imageCount: 37 },
  { id: "capital", type: "FOTO", thumb: capital, title: "011 - Capital Federal", meta: "Arias - Anguis - Galeano - Sessa / 2025", folder: "capital", imageCount: 33 },
  { id: "lpsport1", type: "FOTO", thumb: lpsport1, title: "Evento - La Plata Sport 1", meta: "Arias - Anguis - Cubilla / 2025", folder: "sport1", imageCount: 19 },
  { id: "lpsport2", type: "FOTO", thumb: lpsport2, title: "Evento - La Plata Sport 2", meta: "Arias - Ariotti - @Tripa.sbk / 2025", folder: "sport2", imageCount: 18 },
  { id: "flash", type: "FOTO", thumb: flash, title: "Ediciones Flash", meta: "Juan Francisco Arias / 2025", folder: "flash", imageCount: 19 }
];

// 2. FLYERS
export const flyers = [
  { id: "f2", type: "FLYER", title: "BADDER SHOWCASE - TOM", meta: "Lucas Nicolas Bengochea / 2024", thumb: "/flyers/foto 1.webp", link: "/flyers/foto 1.webp" },
  { id: "f4", type: "FLYER", title: "EMERGENT X BADDER", meta: "Lucas Nicolas Bengochea / 2024", thumb: "/flyers/foto 2.webp", link: "/flyers/foto 2.webp" },
  { id: "f6", type: "FLYER", title: "LEVELS", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 3.webp", link: "/flyers/foto 3.webp" },
  { id: "f8", type: "FLYER", title: "ROSSET CLUB", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 4.webp", link: "/flyers/foto 4.webp" },
  { id: "f9", type: "FLYER", title: "ROSSET CLUB - ANGUIS PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 5.webp", link: "/flyers/foto 5.webp" },
  { id: "f10", type: "FLYER", title: "ROSSET CLUB - POLLINI PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 6.webp", link: "/flyers/foto 6.webp" },
  { id: "f11", type: "FLYER", title: "ROSSET CLUB - SOULBEAT PROMO", meta: "Lucas Nicolas Bengochea / 2025", thumb: "/flyers/foto 7.webp", link: "/flyers/foto 7.webp" }
];

// 3. MOODBOARDS
export const moodboards = [
  { id: "m1", type: "MOODBOARD", title: "CATEDRAL VECTOR", meta: "REFERENCIA / DROP 3", thumb: "/drop3/foto (21).webp", link: "/drop3/foto (21).webp" },
  { id: "m2", type: "MOODBOARD", title: "SANCOR ABANDONADO", meta: "REFERENCIA / LOCACIÓN", thumb: "/drop3/foto (26).webp", link: "/drop3/foto (26).webp" },
  { id: "m3", type: "MOODBOARD", title: "ESQUELETO CONCEPT", meta: "REFERENCIA / DROP 2", thumb: "/drop2/foto (8).webp", link: "/drop2/foto (8).webp" },
  { id: "m4", type: "MOODBOARD", title: "MOCKUP VERANO", meta: "REFERENCIA / UNRELEASED", thumb: "/verano2026/foto (5).webp", link: "/verano2026/foto (5).webp" }
];

// Unificamos el archivo
export const archiveItems = [...photos, ...flyers, ...moodboards];
