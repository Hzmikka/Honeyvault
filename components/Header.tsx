"use client";

import { FormEvent } from "react";
import Image from "next/image";
import { FileText, Search } from "lucide-react";
import { commerceLinks, navLinks } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";

const searchTargets = [
  {
    id: "textures",
    terms: [
      "pastry", "pastries", "croissant", "roll", "chocolate", "almond", "pistachio",
      "strawberry", "texture", "textures", "menu", "pastel", "pasteles", "almendra",
      "pistacho", "fresa", "textura", "texturas", "dulce", "dulces",
    ],
  },
  {
    id: "large-orders",
    terms: [
      "box", "boxes", "custom", "cake", "cakes", "birthday", "brunch", "event", "tray",
      "trays", "office", "dessert", "large order", "order", "team", "gifting", "caja",
      "cajas", "personalizado", "cumpleaños", "evento", "bandeja", "oficina", "postre",
      "pedido grande", "equipo", "regalo", "celebracion", "celebración",
    ],
  },
  {
    id: "locations",
    terms: [
      "location", "locations", "shop", "shops", "map", "miami", "wynwood", "coral",
      "gables", "south", "beach", "pickup", "delivery", "ubicacion", "ubicación",
      "ubicaciones", "tienda", "tiendas", "mapa", "recogida", "entrega",
    ],
  },
  {
    id: "proof",
    terms: [
      "review", "reviews", "testimonial", "testimonials", "rating", "ratings", "guest",
      "guests", "love", "reseña", "reseñas", "testimonio", "testimonios", "opiniones",
      "clientes",
    ],
  },
  {
    id: "large-order-inquiry",
    terms: [
      "large order", "custom order", "birthday", "office", "team", "dessert table", "gifting",
      "production", "request", "date", "contact", "pedido grande", "pedido personalizado",
      "cumpleaños", "oficina", "equipo", "mesa de postres", "regalo", "produccion",
      "producción", "solicitud", "fecha", "contacto", "formulario",
    ],
  },
];

function getSearchTarget(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return "textures";

  return (
    searchTargets.find((target) =>
      target.terms.some((term) => normalizedQuery.includes(term)),
    )?.id ?? "textures"
  );
}

export function Header() {
  const { language, setLanguage } = useLanguage();
  const es = language === "es";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("site-search") ?? "");
    const targetId = getSearchTarget(query);
    const target = document.getElementById(targetId);

    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label="Honeyvault Bakery home">
          <Image
            src="/images/logo/Primary-Logo.png"
            alt="Honeyvault Bakery"
            width={600}
            height={362}
            priority
            sizes="128px"
          />
        </a>

        <nav className="desktop-nav" aria-label={es ? "Navegación principal" : "Primary navigation"}>
          {navLinks.map((link) => (
            <a href={link.href} key={link.label}>
              {es ? link.labelEs : link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <form className="search-pill" role="search" onSubmit={handleSearch}>
            <label className="sr-only" htmlFor="site-search">
              {es
                ? "Buscar pasteles, tiendas y pedidos grandes"
                : "Search pastries, locations and large orders"}
            </label>
            <input
              id="site-search"
              name="site-search"
              type="search"
              placeholder={es ? "Buscar pasteles, tiendas u ocasiones..." : "Search pastries, locations, or occasions..."}
            />
            <button type="submit" aria-label={es ? "Buscar" : "Search"}>
              <Search size={15} strokeWidth={2.1} />
            </button>
          </form>

          <div className="language-toggle" aria-label={es ? "Idioma" : "Language"}>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={language === "es" ? "active" : ""}
              aria-pressed={language === "es"}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
          </div>

          <a className="inquiry-header-button" href={commerceLinks.inquiry}>
            <FileText size={14} strokeWidth={2} aria-hidden="true" />
            <span>{es ? "Planear" : "Plan order"}</span>
          </a>

          <a className="signin-button" href={commerceLinks.orderNow}>
            {es ? "Pedir" : "Order"}
          </a>
        </div>
      </div>
    </header>
  );
}
