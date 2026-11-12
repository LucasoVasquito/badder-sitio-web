import { Link } from "react-router-dom";
import { Duotone, FontCycleTitle, Halftone, Sticker, Tape } from "@/components/flyer";
import { posts } from "@/data/journal";

const excerpt = (body: string, max = 150) => {
  const first = body.split("\n").find((l) => l.trim() && !l.startsWith("#"))?.trim() ?? "";
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, "")}…` : first;
};

// Una variante de tratamiento de imagen, una rotación, un fondo y una tipografía por nota.
const CARDS = [
  { rot: "-rotate-[2.5deg]", mt: "md:mt-0", dark: true, img: "bitmap", titleCls: "f-news font-bold" },
  { rot: "rotate-[1.8deg]", mt: "md:mt-16", dark: false, img: "duo", titleCls: "f-unifraktur" },
  { rot: "-rotate-[1deg]", mt: "md:mt-6", dark: true, img: "color", titleCls: "f-rye" },
] as const;

// Culture: sección papel con notas como recortes pegados con cinta.
export default function CulturePreview() {
  const list = posts.slice(0, 3);
  if (list.length === 0) return null;

  return (
    <section className="surface-paper relative overflow-hidden px-5 md:px-12 py-20 md:py-28">
      <Halftone color="hsl(var(--ink))" size={8} opacity={0.18} />
      <div className="relative max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <div className="label text-muted-foreground mb-3">Lectura · Escena · Sonido · Diseño</div>
            <FontCycleTitle id="culture" font="seagram" as="h2" className="text-[clamp(3.5rem,12vw,11rem)] leading-[0.8] text-[hsl(var(--a))] -rotate-2 origin-left">
              Culture
            </FontCycleTitle>
          </div>
          <Link to="/culture" className="label inline-flex items-center min-h-[44px] px-4 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors">
            Todas las notas →
          </Link>
        </div>

        <ul className="grid gap-x-10 gap-y-14 md:grid-cols-3">
          {list.map((post, i) => {
            const c = CARDS[i % CARDS.length];
            const card = c.dark ? "surface-dark" : "bg-[hsl(var(--paper))] text-[hsl(var(--ink))] border-2 border-[hsl(var(--ink))]";
            return (
              <li key={post.id} className={`${c.mt}`}>
                <article className={`cut relative ${c.rot} ${card} p-3 pb-5 shadow-hard max-md:!rotate-[-1deg]`}>
                  <Tape rotate={i % 2 ? 5 : -4} />
                  <Link to={`/culture/${post.id}`} className="block">
                    <div className="relative">
                      {c.img === "bitmap" && <Duotone src={post.image} mode="bitmap" className="w-full aspect-[4/3] object-cover" />}
                      {c.img === "duo" && <Duotone src={post.image} mode="duo" className="w-full aspect-[4/3] object-cover" />}
                      {c.img === "color" && <img src={post.image} alt="" loading="lazy" className="w-full aspect-[4/3] object-cover" style={{ filter: "saturate(1.7) contrast(1.1)" }} />}
                      <Sticker tone={i === 1 ? "b" : "a"} rotate={i % 2 ? 4 : -5} className="absolute -bottom-3 left-2">
                        {post.category}
                      </Sticker>
                    </div>
                    <div className="label text-muted-foreground mt-6">{post.date}</div>
                    <h3 className={`${c.titleCls} text-[clamp(1.6rem,1rem+1.6vw,2.4rem)] leading-[1.05] mt-1`}>{post.title}</h3>
                    <p className="mt-3 text-[17px] leading-snug">{excerpt(post.body)}</p>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
