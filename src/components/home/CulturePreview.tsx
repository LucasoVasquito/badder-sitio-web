import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { posts } from "@/data/journal";

// Primer párrafo del texto, recortado para la bajada
const excerpt = (body: string, max = 150) => {
  const first = body.split("\n")[0].trim();
  return first.length > max ? `${first.slice(0, max).replace(/\s+\S*$/, "")}…` : first;
};

export default function CulturePreview() {
  const [lead, ...rest] = posts.slice(0, 3);
  if (!lead) return null;

  return (
    <section className="px-5 md:px-12 py-16 md:py-24 border-t border-border">
      <div className="wrap">
        <SectionHeader index="03" kicker="Editorial" title="Culture" link={{ to: "/culture", label: "Todas las notas" }} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
          {/* Nota principal */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="md:col-span-7 group"
          >
            <Link to={`/culture?post=${lead.id}`} className="block">
              <div className="aspect-[16/10] overflow-hidden bg-secondary border border-border">
                <img
                  src={lead.image}
                  alt={lead.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 label text-muted-foreground flex gap-3">
                <span className="text-foreground">{lead.category}</span>
                <span>{lead.date}</span>
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
                {lead.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">{excerpt(lead.body)}</p>
            </Link>
          </motion.article>

          {/* Notas secundarias en lista */}
          <div className="md:col-span-5 flex flex-col">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
                className="group border-t border-border py-6 first:pt-0 first:border-t-0 md:first:border-t md:first:pt-6"
              >
                <Link to={`/culture?post=${post.id}`} className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 aspect-square overflow-hidden bg-secondary border border-border">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 "
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="label text-muted-foreground flex flex-wrap gap-x-3">
                      <span className="text-foreground">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{post.subtitle}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
