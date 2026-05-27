import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
  p: z.enum(["date-box", "blind-date"]).catch("date-box"),
});

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Finalizează comanda — Blind Date with a Book" },
      { name: "description", content: "Completează datele de livrare. Plata se face ramburs la curier." },
    ],
  }),
});

const PRODUCT_INFO = {
  "date-box": { name: "Date Box — Mistery Box", price: 130 },
  "blind-date": { name: "Blind Date with a Book — Mistery Book", price: 60 },
} as const;

const GENRES = ["Thriller", "Romance", "Dark Romance", "Fantasy"];

function CheckoutPage() {
  const { p } = Route.useSearch();
  const navigate = useNavigate();
  const product = PRODUCT_INFO[p as keyof typeof PRODUCT_INFO];
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    county: "",
    postal: "",
    genre: GENRES[0],
    notes: "",
  });
  const orderId = useMemo(() => Math.random().toString(36).slice(2, 8).toUpperCase(), []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = { id: orderId, product: p, productName: product.name, price: product.price, ...form, createdAt: new Date().toISOString() };
    try {
      const prev = JSON.parse(localStorage.getItem("bdwab_orders") || "[]");
      localStorage.setItem("bdwab_orders", JSON.stringify([...prev, order]));
    } catch {}
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="relative min-h-screen px-6 py-20">
        <div className="mx-auto max-w-xl rounded-sm border border-gold/30 bg-[oklch(0.13_0.02_20/0.6)] p-10 text-center backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Mulțumim ✦</p>
          <h1 className="mt-6 font-display text-4xl text-foreground">Comanda ta a fost primită</h1>
          <p className="mt-6 font-serif text-lg text-muted-foreground">
            Număr comandă: <span className="text-gold">#{orderId}</span>
          </p>
          <p className="mt-4 font-serif text-base text-muted-foreground">
            Te vom contacta în cel mai scurt timp la <span className="text-foreground">{form.phone}</span> pentru a confirma livrarea. Plata se face <span className="text-gold">ramburs, la curier</span>.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-3 rounded-sm border border-gold/70 px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            ← Înapoi la pagina principală
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold">
          ← Înapoi
        </Link>
        <h1 className="mt-6 font-display text-4xl text-foreground sm:text-5xl">Finalizează comanda</h1>
        <p className="mt-3 font-serif text-lg text-muted-foreground">Plata se face ramburs, la curier. Transport gratuit.</p>

        {/* Summary */}
        <div className="mt-8 flex items-center justify-between rounded-sm border border-gold/20 bg-[oklch(0.13_0.02_20/0.5)] p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Pachet ales</p>
            <p className="mt-1 font-display text-xl">{product.name}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-gold">{product.price} lei</p>
            <button
              type="button"
              onClick={() => navigate({ to: "/checkout", search: { p: p === "date-box" ? "blind-date" : "date-box" } })}
              className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
            >
              Schimbă pachetul
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <Field label="Nume complet" value={form.name} onChange={set("name")} required />
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Telefon" type="tel" value={form.phone} onChange={set("phone")} required />
            <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
          </div>
          <Field label="Adresă (stradă, număr, bloc, ap.)" value={form.address} onChange={set("address")} required />
          <div className="grid gap-6 sm:grid-cols-3">
            <Field label="Oraș" value={form.city} onChange={set("city")} required />
            <Field label="Județ" value={form.county} onChange={set("county")} required />
            <Field label="Cod poștal" value={form.postal} onChange={set("postal")} required />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gold/80">Genul cărții</label>
            <select
              value={form.genre}
              onChange={set("genre")}
              className="mt-2 w-full rounded-sm border border-gold/30 bg-[oklch(0.13_0.02_20/0.6)] px-4 py-3 font-serif text-base text-foreground outline-none transition-colors focus:border-gold"
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.3em] text-gold/80">Mențiuni (opțional)</label>
            <textarea
              value={form.notes}
              onChange={set("notes")}
              rows={3}
              placeholder="Cărți deja citite, preferințe, alergii la spoilere..."
              className="mt-2 w-full resize-none rounded-sm border border-gold/30 bg-[oklch(0.13_0.02_20/0.6)] px-4 py-3 font-serif text-base text-foreground outline-none transition-colors focus:border-gold"
            />
          </div>

          <div className="rounded-sm border border-gold/15 bg-[oklch(0.13_0.02_20/0.4)] p-5 text-sm text-muted-foreground">
            <p className="font-display uppercase tracking-[0.2em] text-gold/90">Metoda de plată</p>
            <p className="mt-2 font-serif">💰 Ramburs la curier — plătești când primești coletul.</p>
          </div>

          <button
            type="submit"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-sm border border-gold/70 bg-gradient-to-b from-[oklch(0.36_0.13_15)] to-[oklch(0.22_0.08_15)] px-8 py-4 font-display text-base tracking-[0.2em] text-foreground uppercase shadow-[0_8px_40px_-12px_oklch(0.74_0.12_80/0.4)] transition-all duration-500 hover:border-gold hover:shadow-[0_8px_50px_-8px_oklch(0.74_0.12_80/0.7)] hover:-translate-y-0.5"
          >
            <span>Trimite comanda · {product.price} lei</span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.3em] text-gold/80">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-sm border border-gold/30 bg-[oklch(0.13_0.02_20/0.6)] px-4 py-3 font-serif text-base text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
