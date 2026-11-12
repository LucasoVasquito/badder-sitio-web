// Contenido editorial en Markdown con frontmatter simple (sin dependencias).
// Formato en CONTENIDO.md → "Culture".

export interface Frontmatter {
  [key: string]: string | string[];
}

/** Parsea `---\nclave: valor\nlista:\n  - item\n---\ncuerpo` */
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const text = raw.replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text.trim() };
  const data: Frontmatter = {};
  let listKey: string | null = null;
  for (const line of m[1].split("\n")) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      (data[listKey] as string[]).push(item[1].trim());
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = value.trim();
      listKey = null;
    }
  }
  return { data, body: m[2].trim() };
}

const str = (v: string | string[] | undefined) => (Array.isArray(v) ? "" : v ?? "");
const list = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);
/** "texto | url" → { text, url } */
const pair = (s: string) => {
  const [a, b] = s.split("|").map((x) => x.trim());
  return { text: a, url: b };
};

// ---------- CULTURE ----------

export const CULTURE_CATEGORIES = ["BADDER FILES", "SCENE", "SOUND", "DESIGN", "CULTURE", "REFERENCES"] as const;
export type CultureCategory = (typeof CULTURE_CATEGORIES)[number];

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  /** ISO: 2025-10-24 */
  date: string;
  category: CultureCategory;
  cover: string;
  images: { src: string; caption?: string }[];
  references: { text: string; url?: string }[];
  related: string[];
  body: string;
}

const files = import.meta.glob("/src/content/culture/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const articles: Article[] = Object.values(files)
  .map((raw) => {
    const { data, body } = parseFrontmatter(raw);
    const category = str(data.category).toUpperCase() as CultureCategory;
    return {
      id: str(data.id),
      title: str(data.title),
      subtitle: str(data.subtitle),
      date: str(data.date),
      category: CULTURE_CATEGORIES.includes(category) ? category : "CULTURE",
      cover: str(data.cover),
      images: list(data.images).map((s) => {
        const p = pair(s);
        return { src: p.text, caption: p.url };
      }),
      references: list(data.references).map(pair),
      related: list(data.related),
      body,
    };
  })
  .filter((a) => a.id && a.title)
  .sort((a, b) => b.date.localeCompare(a.date));

export const getArticle = (id: string) => articles.find((a) => a.id === id);

/** 2025-10-24 → 2025.10.24 */
export const formatDate = (iso: string) => iso.replace(/-/g, ".");

/** Relacionados: los indicados en el archivo; si no hay, los más recientes de la misma categoría o del resto. */
export const relatedTo = (a: Article, max = 2) => {
  const explicit = a.related.map(getArticle).filter(Boolean) as Article[];
  if (explicit.length) return explicit.slice(0, max);
  const same = articles.filter((x) => x.id !== a.id && x.category === a.category);
  const rest = articles.filter((x) => x.id !== a.id && x.category !== a.category);
  return [...same, ...rest].slice(0, max);
};

/** Primer párrafo sin marcas de Markdown (para bajadas y meta description). */
export const excerptOf = (body: string, max = 160) => {
  const first = body.split(/\n\s*\n/)[0].replace(/[*_`#>]|!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, "")}…` : first;
};
