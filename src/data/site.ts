// Estructura de navegación y datos de contacto compartidos (menú, footer y Home).

export interface NavSection {
  label: string;
  path: string;
  /** Rutas que también marcan esta sección como activa. */
  match?: string[];
}

export const mainSections: NavSection[] = [
  { label: "Notas", path: "/culture" },
  { label: "Música", path: "/music" },
  { label: "Archivo", path: "/archive" },
  { label: "Indumentaria", path: "/shop", match: ["/cart"] },
  { label: "Estudio", path: "/studio" },
];

export const communitySection: NavSection = { label: "Participar", path: "/community" };

export const contact = {
  instagramHandle: "@badder.experience",
  instagramUrl: "https://instagram.com/badder.experience",
  email: "contact@badderexperience.com",
  location: "La Plata, Buenos Aires, ARG",
};

export const isSectionActive = (section: NavSection, pathname: string) => {
  if (section.path === "/") return pathname === "/";
  return [section.path, ...(section.match ?? [])].some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
};
