import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { posts } from "@/data/journal";

const excerpt = (body: string, max = 170) => {
  const first = body.split("\n")[0].trim();
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, "")}…` : first;
};

// Notas: una nota principal con imagen + índice de lectura (PT Serif para los títulos).
export default function CulturePreview() {
  const [lead, ...rest] = posts.slice(0, 4);
  if (!lead) return null;

  return (
    <section className="px-5 md:px-12 pt-20 md:pt-28">
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader kicker="Lectura" title="Notas" link={{ to: "/culture", label: "Todas las notas" }} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-10">
          <article className="md:col-span-7 group">
            <Link to={`/culture/${lead.id}`} className="block">
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img src={lead.image} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 label text-muted-foreground flex gap-3">
                <span className="text-foreground">{lead.category}</span>
                <span>{lead.date}</span>
              </div>
              <h3 className="mt-2 font-serif font-bold text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-[1.1] group-hover:underline underline-offset-4 decoration-2">
                {lead.title}
              </h3>
              <p className="mt-3 text-lg max-w-[56ch]">{excerpt(lead.body)}</p>
            </Link>
          </article>

          <ul className="md:col-span-5 border-t-2 border-border self-start">
            {rest.map((post) => (
              <li key={post.id} className="border-b border-border">
                <Link to={`/culture/${post.id}`} className="group flex gap-4 py-5">
                  <div className="w-24 aspect-square shrink-0 overflow-hidden bg-secondary">
                    <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="label text-muted-foreground flex flex-wrap gap-x-3">
                      <span className="text-foreground">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="mt-1 font-serif font-bold text-xl leading-tight group-hover:underline underline-offset-4 decoration-2">{post.title}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
