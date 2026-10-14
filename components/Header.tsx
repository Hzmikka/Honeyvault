"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { FileText, Search } from "lucide-react";
import { commerceLinks, navLinks } from "@/data/content";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { findSearchMatches } from "@/lib/search";
import { navigateToSection } from "@/lib/navigation";
import { honeyvaultLocations } from "@/data/locations";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const es = language === "es";
  const { draft, updateOrder } = useOrder();
  const [searchMessage, setSearchMessage] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("site-search") ?? "");
    const matches = findSearchMatches(query);
    const input = event.currentTarget.querySelector<HTMLInputElement>("input");
    if (!matches.length) {
      const message = query.trim()
        ? (es ? "No encontramos coincidencias. Prueba con un pastel, tienda u ocasión." : "No matches found. Try a pastry, shop or occasion.")
        : (es ? "Escribe un pastel, tienda u ocasión." : "Enter a pastry, shop or occasion.");
      setSearchMessage(message);
      input?.setCustomValidity(message);
      input?.reportValidity();
      return;
    }
    input?.setCustomValidity("");
    const match = matches[0];
    if (match.kind === "pastry") updateOrder({ pastryId: match.id, intent: draft.intent ?? "pastry", occasion: draft.occasion || "Other" });
    if (match.kind === "location") {
      const location = honeyvaultLocations.find(shop => shop.id === match.id);
      updateOrder({ locationId: match.id, fulfillment: draft.fulfillment === "Local delivery" && !location?.fulfillment.localDelivery ? "Pickup" : draft.fulfillment });
    }
    setSearchMessage(es ? `${matches.length} coincidencia(s). Mostrando ${match.nameEs}.` : `${matches.length} match(es). Showing ${match.name}.`);
    navigateToSection(match.kind === "pastry" ? `pastry-${match.id}` : match.kind === "special-item" ? `order-item-${match.id}` : match.kind === "location" ? `location-${match.id}` : match.section);

  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{es ? "Saltar al contenido" : "Skip to content"}</a>
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label={es ? "Inicio de Honeyvault Bakery" : "Honeyvault Bakery home"}>
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
              onChange={event => event.currentTarget.setCustomValidity("")}
              placeholder={es ? "Buscar pasteles, tiendas u ocasiones..." : "Search pastries, locations, or occasions..."}
            />
            <button type="submit" aria-label={es ? "Buscar" : "Search"}>
              <Search size={15} strokeWidth={2.1} />
            </button>
            <span className="sr-only" role="status" aria-live="polite">{searchMessage}</span>
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
