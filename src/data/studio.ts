// STUDIO: servicios agrupados por área.
// `confirmed: false` = no se muestra hasta que BADDER confirme que lo ofrece (y con qué recursos).
// `examples` apunta a trabajos reales del sitio.

export interface StudioService {
  id: string;
  name: string;
  brief: string;
  includes: string[];
  examples: { label: string; to: string }[];
  confirmed: boolean;
}

export interface StudioArea {
  id: string;
  title: string;
  intro: string;
  services: StudioService[];
}

export const studioAreas: StudioArea[] = [
  {
    id: "sound",
    title: "Sound",
    intro: "Mezcla, master y registro de sets, desde la misma escena que produce los releases de BADDER.",
    services: [
      {
        id: "mixing",
        name: "Mixing",
        brief: "Mezcla de tracks de música electrónica a partir de stems.",
        includes: ["Recepción de stems", "Devolución sobre la estructura del track", "Mezcla final"],
        examples: [{ label: "Releases de Uriel Galeano y Anguis", to: "/music#releases" }],
        confirmed: true,
      },
      {
        id: "mastering",
        name: "Mastering",
        brief: "Master de tracks y de sets grabados para que suenen en el club y en plataformas.",
        includes: ["Master estéreo", "Control de rango dinámico", "Versiones para streaming y club, a consultar"],
        examples: [{ label: "Master de los DJ sets de BADDER", to: "/music#dj-sets" }],
        confirmed: true,
      },
      {
        id: "dj-set-recording",
        name: "Grabación de DJ sets",
        brief: "Registro de sets en vivo, con audio masterizado y video editado.",
        includes: ["Registro del set", "Master del audio", "Edición del video para YouTube y redes"],
        examples: [
          { label: "Emergent x Badder", to: "/archive/emergent" },
          { label: "Badder Showcase — Uriel Galeano", to: "/archive/video-4" },
        ],
        confirmed: true,
      },
      {
        id: "music-production",
        name: "Producción musical",
        brief: "Producción de tracks y EPs de música electrónica.",
        includes: ["Alcance a definir en cada consulta"],
        examples: [{ label: "Not Rules EP", to: "/music#releases" }],
        confirmed: true,
      },
      {
        id: "practice-space",
        name: "Espacio para practicar y grabar sesiones",
        brief: "",
        includes: [],
        examples: [],
        confirmed: false,
      },
    ],
  },
  {
    id: "visual",
    title: "Visual Production",
    intro: "Fotografía, video y motion: el mismo equipo que documenta el archivo de BADDER.",
    services: [
      {
        id: "photography",
        name: "Fotografía",
        brief: "Fotografía de eventos, sesiones de producto y retratos de artistas.",
        includes: ["Cobertura y selección", "Edición de color", "Entrega en alta y versiones para redes"],
        examples: [
          { label: "011 — Capital Federal", to: "/archive/capital" },
          { label: "Sesión Drop 3", to: "/archive/drop-3" },
        ],
        confirmed: true,
      },
      {
        id: "event-coverage",
        name: "Registro de eventos",
        brief: "Fotografía y video de fechas, showcases y ciclos.",
        includes: ["Fotos y video del evento", "Piezas cortas para redes"],
        examples: [{ label: "Badder Showcase — Rosset Club", to: "/archive/rosset" }],
        confirmed: true,
      },
      {
        id: "video-editing",
        name: "Producción audiovisual, video y edición",
        brief: "Entrevistas, sets y piezas audiovisuales: desde el registro hasta la edición final.",
        includes: ["Edición", "Color", "Formatos para YouTube, Reels y TikTok"],
        examples: [{ label: "Badder Interview: Lucas Ferro x Luis Zerillo", to: "/archive/video-1" }],
        confirmed: true,
      },
      {
        id: "motion",
        name: "Visualizers y motion graphics",
        brief: "Motion flyers, teasers y visualizers para tracks y fechas.",
        includes: ["Motion flyer o teaser vertical", "Visualizer para un track"],
        examples: [
          { label: "You Look At Me — Visual concept", to: "/archive/you-look-at-me" },
          { label: "Motion flyers", to: "/archive?filter=video" },
        ],
        confirmed: true,
      },
    ],
  },
  {
    id: "design",
    title: "Design",
    intro: "Gráfica para la escena: flyers, presskits, identidades y web.",
    services: [
      {
        id: "flyers",
        name: "Diseño gráfico y flyers",
        brief: "Flyers y piezas gráficas para fechas, ciclos y lanzamientos.",
        includes: ["Flyer principal", "Adaptaciones para redes", "Versión animada, a consultar"],
        examples: [{ label: "Flyers en el archivo", to: "/archive?filter=graphic-design" }],
        confirmed: true,
      },
      {
        id: "presskits",
        name: "Presskits",
        brief: "Presskits para DJs y productores, listos para mandar a bookers y clubes.",
        includes: ["Diseño del documento", "Textos e imágenes del artista", "Versión PDF"],
        examples: [{ label: "Presskits de Uriel Galeano y Anguis", to: "/music#artists" }],
        confirmed: true,
      },
      {
        id: "identity",
        name: "Identidad visual para artistas y proyectos",
        brief: "Logotipos, sistemas gráficos y estampas: lo mismo que construimos para BADDER.",
        includes: ["Logotipo y variantes", "Piezas de aplicación", "Estampas para indumentaria"],
        examples: [
          { label: "Identidad BADDER — Drop 1", to: "/archive/drop-1" },
          { label: "Drop 3", to: "/archive/drop-3" },
        ],
        confirmed: true,
      },
      {
        id: "release-art",
        name: "Arte para lanzamientos",
        brief: "",
        includes: [],
        examples: [],
        confirmed: false,
      },
      {
        id: "web",
        name: "Diseño y desarrollo web",
        brief: "Sitios para artistas, sellos y proyectos culturales.",
        includes: ["Diseño", "Desarrollo", "Puesta en línea"],
        examples: [{ label: "Este sitio", to: "/" }],
        confirmed: true,
      },
    ],
  },
];

// Casos reales (versión resumida de los casos de estudio anteriores)
export const studioCases = [
  {
    id: "CASE 01",
    client: "Badder Showcase",
    title: "Experiencia audiovisual y registro en vivo",
    description: "Dirección de arte, visuales, registro y edición del ciclo Badder Showcase, desde la pista hasta el archivo.",
    services: ["Dirección audiovisual", "Visuales", "Reels"],
    image: "/cuchate.esta/foto (4).webp",
    to: "/archive/rosset",
  },
  {
    id: "CASE 02",
    client: "Releases",
    title: "Sonido para lanzamientos",
    description: "Producción, mezcla y master de los lanzamientos de Uriel Galeano y Anguis.",
    services: ["Producción musical", "Mixing", "Mastering"],
    image: "/audio/cover (6).webp",
    to: "/music#releases",
  },
  {
    id: "CASE 03",
    client: "Bunker 001",
    title: "Cápsula de indumentaria e identidad",
    description: "Universo visual completo de un drop: logotipos, estampas y campaña fotográfica.",
    services: ["Dirección creativa", "Identidad visual", "Diseño gráfico"],
    image: "/drop3/foto (26).webp",
    to: "/archive/drop-3",
  },
];
