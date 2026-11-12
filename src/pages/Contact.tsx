import { useState } from "react";
import ArtistsSection from "../components/ArtistsSection";
import PageHeader from "@/components/site/PageHeader";
import Notice from "@/components/site/Notice";
import { btn } from "@/lib/ui";
import { contact } from "@/data/site";
import { submitJSON } from "@/lib/submit";
import { usePageMeta } from "@/lib/usePageMeta";

// Si VITE_CONTACT_ENDPOINT está configurado, el formulario envía de verdad.
// Si no, arma el mail en la aplicación de correo del usuario (no simula un envío).
const CONTACT_ENDPOINT = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() ?? "";

const subjects = [
  { value: "Colaboración", label: "Colaboración" },
  { value: "Studio", label: "Studio: sonido, visuales o diseño" },
  { value: "Booking", label: "Booking / DJ set" },
  { value: "Demo", label: "Demo / música" },
  { value: "Otro", label: "Otro" },
];

const field = "w-full bg-transparent border-2 border-border px-3 min-h-[48px] py-2 text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring rounded-none";

export default function Contact() {
  usePageMeta({ title: "Contacto", description: "Contacto con BADDER: colaboraciones, Studio, bookings y demos." });
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0].value, message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setState("error");
      setError("Completá nombre, un mail válido y el mensaje.");
      return;
    }
    if (!CONTACT_ENDPOINT) {
      const body = `${form.message}\n\n— ${form.name} (${form.email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`[${form.subject}] ${form.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState("sending");
    const r = await submitJSON(CONTACT_ENDPOINT, form);
    if (r.ok) setState("sent");
    else {
      setState("error");
      setError(r.error ?? "No se pudo enviar.");
    }
  };

  return (
    <main data-accent="lime" className="bg-background min-h-screen pt-10 md:pt-16 pb-0 overflow-hidden">
      <div className="px-5 md:px-12 max-w-[1440px] mx-auto">
        <PageHeader kicker="Contacto / Colaboraciones / Bookings" title="Contacto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16">
          <div className="flex flex-col gap-10">
            <p className="text-lg max-w-[48ch]">
              Para colaboraciones, trabajos de Studio, bookings o para mostrarnos lo que hacés, escribinos por Instagram o por mail.
            </p>
            <dl className="flex flex-col gap-6">
              <div>
                <dt className="label text-muted-foreground mb-1">Mail</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="underline underline-offset-4 decoration-2 hover:bg-accent break-all">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-muted-foreground mb-1">Instagram</dt>
                <dd>
                  <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 decoration-2 hover:bg-accent">
                    {contact.instagramHandle} ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-muted-foreground mb-1">Base</dt>
                <dd className="text-foreground">{contact.location}</dd>
              </div>
            </dl>
          </div>

          {state === "sent" ? (
            <Notice title="Mensaje enviado" tone="success">
              Recibimos tu mensaje. Te respondemos a {form.email}.
            </Notice>
          ) : (
            <form className="flex flex-col gap-6" onSubmit={submit} noValidate>
              {!CONTACT_ENDPOINT && (
                <p className="label text-muted-foreground leading-relaxed">
                  Al enviar se abre tu aplicación de correo con el mensaje listo. El envío se hace desde ahí.
                </p>
              )}
              <label className="flex flex-col gap-1">
                <span className="label">Nombre / proyecto</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} autoComplete="name" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="label">Mail</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} autoComplete="email" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="label">Asunto</span>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={`${field} appearance-none cursor-pointer`}>
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value} className="bg-background">
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="label">Mensaje</span>
                <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none py-3`} />
              </label>
              {state === "error" && <Notice title="No se pudo enviar" tone="error">{error}</Notice>}
              <button type="submit" disabled={state === "sending"} className={btn.primary}>
                {state === "sending" ? "Enviando…" : CONTACT_ENDPOINT ? "Enviar mensaje" : "Escribir mail"}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t-2 border-border" id="bookings">
        <ArtistsSection />
      </div>
    </main>
  );
}
