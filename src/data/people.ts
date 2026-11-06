// Personas vinculadas a BADDER.
// Solo datos verificables: nombre, rol y documentos existentes (presskits).
// Para agregar un link (Instagram, SoundCloud, portfolio) sumalo en `links` SOLO con la URL real.

export interface PersonLink {
  label: string;
  url: string;
}

export interface Person {
  id: string;
  name: string;
  roles: string;
  /** Aparece en MUSIC → Artists */
  artist?: boolean;
  presskit?: {
    url: string;
    cover: string;
    design: string;
  };
  links: PersonLink[];
}

export const people: Person[] = [
  {
    id: "uriel-galeano",
    name: "Uriel Galeano",
    roles: "DJ, producer, mixing & mastering",
    artist: true,
    presskit: {
      url: "https://drive.google.com/file/d/1SCTdv-7YGYAFckJc21scFGeyBDY76tOD/view?usp=sharing",
      cover: "/presskits/presskit (1).png",
      design: "Lucas Nicolas Bengochea - Juan Francisco Arias",
    },
    links: [],
  },
  {
    id: "anguis",
    name: "Anguis",
    roles: "DJ, producer, mixing & mastering",
    artist: true,
    presskit: {
      url: "https://drive.google.com/file/d/1x8DdAEzGIS2ElfPxVNBsAjF8FBRKWlxe/view?usp=sharing",
      cover: "/presskits/presskit (2).png",
      design: "Lucas Nicolas Bengochea - Juan Francisco Arias",
    },
    links: [],
  },
  { id: "lucas-nicolas-bengochea", name: "Lucas Nicolas Bengochea", roles: "Branding, diseño y dirección de arte", links: [] },
  { id: "javier-almiron", name: "Javier Almirón", roles: "Branding, diseño y dirección de arte", links: [] },
  { id: "juan-francisco-arias", name: "Juan Francisco Arias (wacho.ph)", roles: "Fotografía, video, visuales y dirección de arte", links: [] },
];

export const artists = people.filter((p) => p.artist);
