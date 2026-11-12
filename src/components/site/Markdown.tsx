import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

// Renderizador de Markdown mínimo y seguro (sin HTML crudo):
// títulos (#, ##, ###), párrafos, listas (- / 1.), citas (>), imágenes ![alt](src "pie"),
// enlaces [texto](url), **negrita**, *itálica* y `código`.

const isInternal = (url: string) => url.startsWith("/") && !url.startsWith("//");

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\[([^\]]+)\]\(([^)\s]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${keyBase}-${i++}`;
    if (m[1]) {
      const url = m[3];
      const safe = /^(https?:|mailto:|\/)/.test(url);
      if (!safe) out.push(m[2]);
      else if (isInternal(url))
        out.push(
          <Link key={k} to={url} className="text-foreground underline underline-offset-4">
            {m[2]}
          </Link>
        );
      else
        out.push(
          <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">
            {m[2]}
          </a>
        );
    } else if (m[4]) out.push(<strong key={k} className="text-foreground font-semibold">{m[5]}</strong>);
    else if (m[6]) out.push(<em key={k}>{m[7]}</em>);
    else if (m[8]) out.push(<code key={k} className="font-mono text-xs bg-secondary px-1">{m[9]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n\s*\n/);
  return (
    <div className="flex flex-col gap-6 text-[15px] md:text-base leading-relaxed text-muted-foreground">
      {blocks.map((block, b) => {
        const lines = block.split("\n");
        const key = `b${b}`;
        const h = block.match(/^(#{1,3})\s+(.*)$/);
        if (h && lines.length === 1) {
          const cls = "font-display text-foreground leading-tight mt-4";
          if (h[1].length === 1) return <h2 key={key} className={`${cls} text-3xl md:text-4xl`}>{inline(h[2], key)}</h2>;
          if (h[1].length === 2) return <h3 key={key} className={`${cls} text-2xl md:text-3xl`}>{inline(h[2], key)}</h3>;
          return <h4 key={key} className="label text-foreground mt-4">{inline(h[2], key)}</h4>;
        }
        const img = block.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
        if (img) {
          return (
            <figure key={key} className="my-4">
              <img src={img[2]} alt={img[1]} loading="lazy" className="w-full h-auto border border-border" />
              {img[3] && <figcaption className="mt-2 label text-muted-foreground">{img[3]}</figcaption>}
            </figure>
          );
        }
        if (lines.every((l) => /^\d+\.\s+/.test(l))) {
          return (
            <ol key={key} className="flex flex-col border-t border-border">
              {lines.map((l, i) => (
                <li key={i} className="flex gap-4 py-2 border-b border-border">
                  <span className="label text-muted-foreground pt-1 w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground">{inline(l.replace(/^\d+\.\s+/, ""), `${key}-${i}`)}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return (
            <ul key={key} className="flex flex-col gap-2 pl-4 list-disc marker:text-foreground">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^[-*]\s+/, ""), `${key}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => l.startsWith(">"))) {
          return (
            <blockquote key={key} className="border-l-2 border-accent pl-5 font-serif text-xl md:text-2xl text-foreground leading-snug">
              {inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "), key)}
            </blockquote>
          );
        }
        return (
          <p key={key}>
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {inline(l, `${key}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
