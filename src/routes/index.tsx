import { createFileRoute, Link } from "@tanstack/react-router";
import heroBook from "../assets/hero-book.jpg";
import gothicWindow from "../assets/gothic-window.jpg";
import dateBox1 from "../assets/date-box-1.jpg";

import blindBook1 from "../assets/blind-book-1.jpg";
import blindBook2 from "../assets/blind-book-2.jpg";
import blindBook3 from "../assets/blind-book-3.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Blind Date with a Book — Mistery Box & Mistery Book" },
      {
        name: "description",
        content:
          "Date Box și Blind Date with a Book — pachete misterioase cu o carte la alegere și surprize bookish. Livrare cu plata ramburs.",
      },
      { property: "og:title", content: "Blind Date with a Book" },
      {
        property: "og:description",
        content:
          "Două pachete misterioase: Date Box (130 lei) și Blind Date with a Book (60 lei). Transport gratuit, plata ramburs.",
      },
    ],
  }),
});

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="ornament flex-1 max-w-[6rem]" aria-hidden />
      <svg viewBox="0 0 24 24" width="20" height="20" className="text-gold animate-flicker" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2l1.6 4.9L18.5 8l-4 3.4 1.3 5.1L12 13.9 8.2 16.5l1.3-5.1L5.5 8l4.9-1.1L12 2z"
        />
      </svg>
      <span className="ornament flex-1 max-w-[6rem]" aria-hidden />
    </div>
  );
}

type Product = {
  id: "date-box" | "blind-date";
  name: string;
  tagline: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "date-box",
    name: "Date Box",
    tagline: "Mistery Box",
    description:
      "O cutie plină de magie: o carte la alegere (thriller, romance, dark romance sau fantasy) însoțită de multe surprize bookish atent alese.",
    price: 130,
    images: [dateBox1],
    features: [
      "📖 o carte — genul la alegerea ta",
      "☕ cană tematică + accesorii",
      "🔖 semne de carte & clipsuri",
      "🖊️ pixuri, markere, stickere",
      "📋 reading list & book review",
      "🎁 multe alte surprize",
    ],
  },
  {
    id: "blind-date",
    name: "Blind Date with a Book",
    tagline: "Mistery Book",
    description:
      "Cartea misterioasă învelită cu grijă — alege genul (thriller, romance, dark romance, fantasy) și descoperă-o alături de articole bookish dedicate.",
    price: 60,
    images: [blindBook1, blindBook2, blindBook3],
    features: [
      "📖 o carte — genul la alegerea ta",
      "🔖 semne de carte drăguțe",
      "🖊️ pix & marker",
      "🎨 stickere bookish",
      "📝 sticky notes",
      "❤️ multă, multă iubire",
    ],
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      id={product.id}
      className="group relative grid grid-cols-1 gap-10 rounded-sm border border-gold/15 bg-[oklch(0.13_0.02_20/0.5)] p-6 backdrop-blur-sm md:grid-cols-2 md:p-10"
      style={{ animation: `fadeUp 1s ease-out ${0.1 + index * 0.15}s both` }}
    >
      <div className={`flex flex-col gap-4 ${index % 2 === 1 ? "md:order-2" : ""}`}>
        <div className="vignette relative overflow-hidden rounded-sm border border-gold/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          <img
            src={product.images[0]}
            alt={`${product.name} — fotografie principală`}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(1).map((src, i) => (
              <div
                key={src}
                className="vignette overflow-hidden rounded-sm border border-gold/15"
              >
                <img
                  src={src}
                  alt={`${product.name} — detaliu ${i + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-1" : ""}`}>
        <p className="text-xs uppercase tracking-[0.45em] text-gold/80">{product.tagline}</p>
        <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">{product.name}</h3>
        <p className="mt-5 font-serif text-lg text-muted-foreground sm:text-xl">
          {product.description}
        </p>

        <ul className="mt-6 space-y-3 font-serif text-base text-muted-foreground">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-3 inline-block h-px w-5 flex-shrink-0 bg-gold/60" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-end justify-between gap-4 border-t border-gold/10 pt-6">
          <div>
            <p className="font-display text-4xl text-gold">{product.price} lei</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Transport gratuit · Plata ramburs
            </p>
          </div>
        </div>

        <Link
          to="/checkout"
          search={{ p: product.id }}
          className="group/btn relative mt-6 inline-flex items-center justify-center gap-3 overflow-hidden rounded-sm border border-gold/70 bg-gradient-to-b from-[oklch(0.36_0.13_15)] to-[oklch(0.22_0.08_15)] px-8 py-4 font-display text-base tracking-[0.2em] text-foreground uppercase shadow-[0_8px_40px_-12px_oklch(0.74_0.12_80/0.4)] transition-all duration-500 hover:border-gold hover:shadow-[0_8px_50px_-8px_oklch(0.74_0.12_80/0.7)] hover:-translate-y-0.5"
        >
          <span>Comandă acum</span>
          <span aria-hidden className="transition-transform duration-500 group-hover/btn:translate-x-1">→</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
        </Link>
      </div>
    </article>
  );
}

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6 animate-fade-in">
        <a href="#top" className="font-display text-lg tracking-widest text-gold">
          ✦ BDWAB
        </a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.25em] text-muted-foreground sm:flex">
          <a href="#date-box" className="transition-colors hover:text-gold">Date Box</a>
          <a href="#blind-date" className="transition-colors hover:text-gold">Blind Date</a>
          <a href="#order" className="transition-colors hover:text-gold">Comandă</a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-8 pb-20 md:grid-cols-2 md:pt-16 md:pb-28">
          <div className="relative z-10">
            <h1 className="animate-fade-up delay-100 mt-6 font-display text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              Blind Date <span className="italic text-gold">with a</span> Book
            </h1>
            <p className="animate-fade-up delay-200 mt-6 max-w-md font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl">
              Lasă destinul să-ți aleagă următoarea lectură. Două pachete misterioase, multă magie bookish.
            </p>

            <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#order"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-sm border border-gold/70 bg-gradient-to-b from-[oklch(0.36_0.13_15)] to-[oklch(0.22_0.08_15)] px-8 py-4 font-display text-base tracking-[0.2em] text-foreground uppercase shadow-[0_8px_40px_-12px_oklch(0.74_0.12_80/0.4)] transition-all duration-500 hover:border-gold hover:shadow-[0_8px_50px_-8px_oklch(0.74_0.12_80/0.7)] hover:-translate-y-0.5"
              >
                <span>Vezi pachetele</span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">↓</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </a>
            </div>

            <Ornament className="mt-12 max-w-sm" />
          </div>

          <div className="animate-fade-in delay-200 relative">
            <div className="vignette relative overflow-hidden rounded-sm border border-gold/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <img
                src={heroBook}
                alt="O carte învelită în hârtie kraft, sigilată cu ceară, înconjurată de trandafiri uscați și lumânări."
                width={1536}
                height={1536}
                className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
              />
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,oklch(0.74_0.12_80/0.18),transparent_70%)] blur-2xl" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="order"
        className="relative border-y border-gold/10 bg-[oklch(0.12_0.02_20/0.6)] backdrop-blur-sm"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Pachetele noastre</p>
            <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
              Alege-ți <em className="text-gold">întâlnirea</em>
            </h2>
            <Ornament className="mt-8" />
          </div>

          <div className="mt-16 flex flex-col gap-12">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Gothic CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={gothicWindow} alt="" loading="lazy" aria-hidden className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
          <p className="text-xs uppercase tracking-[0.45em] text-gold/80">Pășește în bibliotecă</p>
          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
            Te încrezi în <em className="text-gold">destin</em>?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl text-muted-foreground sm:text-2xl">
            Plata se face ramburs, direct la curier. Transport gratuit pentru ambele pachete.
          </p>
          <Ornament className="mt-12" />
        </div>
      </section>

      <footer className="relative border-t border-gold/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            © {new Date().getFullYear()} Blind Date with a Book
          </p>
          <p className="font-serif text-sm italic text-muted-foreground">
            „Cărțile sunt o magie unic de portabilă." ✦
          </p>
        </div>
      </footer>
    </main>
  );
}
