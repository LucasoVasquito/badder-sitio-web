// Adaptador: las publicaciones viven en src/content/culture/*.md (ver lib/content.ts).
// Se mantiene esta forma para los módulos que ya la usan (Home → Culture).

import { articles, formatDate } from "@/lib/content";

export interface JournalPost {
  id: string;
  category: string;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  body: string;
}

export const posts: JournalPost[] = articles.map((a) => ({
  id: a.id,
  category: a.category,
  date: formatDate(a.date),
  title: a.title,
  subtitle: a.subtitle,
  image: a.cover,
  body: a.body,
}));
