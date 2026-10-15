"use client";

import Image from "next/image";
import { FormEvent, MouseEvent, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search } from "lucide-react";
import { navLinks } from "@/data/content";
import { honeyvaultLocations } from "@/data/locations";
import { useLanguage } from "@/components/LanguageProvider";
import { useOrder } from "@/components/OrderProvider";
import { findSearchMatches, SearchMatch } from "@/lib/search";
import { navigateToSection } from "@/lib/navigation";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { draft, updateOrder } = useOrder();
  const es = language === "es";
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDetailsElement>(null);
  const matches = findSearchMatches(query);
  const resultsVisible = open && !!query.trim();
  function select(match: SearchMatch) {
    if (match.kind === "pastry") updateOrder({ pastryId: match.id, intent: "pastry" });
    if (match.kind === "box") updateOrder({ boxId: match.id, intent: "box" });
    if (match.kind === "location") {
      const shop = honeyvaultLocations.find(location => location.id === match.id);
      updateOrder({ locationId: match.id, fulfillment: draft.fulfillment === "Local delivery" && !shop?.fulfillment.localDelivery ? "Pickup" : draft.fulfillment });
    }
    setOpen(false);
    navigateToSection(match.kind === "pastry" ? `pastry-${match.id}` : match.kind === "box" ? `box-${match.id}` : match.kind === "special-item" ? `order-item-${match.id}` : match.kind === "location" ? `location-${match.id}` : match.section);
  }
  function followLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (menuRef.current) menuRef.current.open = false;
    navigateToSection(href.slice(1));
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setOpen(true); if (matches.length === 1) select(matches[0]); }
  return <header className="site-header">
    <a className="skip-link" href="#main-content">{es ? "Saltar al contenido" : "Skip to content"}</a>
    <div className="demo-topline"><span>{es ? "Honeyvault es una demo · pedidos y precios de muestra" : "Honeyvault is a demo · sample orders & prices"}</span><a href="#studio">Celeste Web Studio <ArrowUpRight size={12} aria-hidden="true" /></a></div>
    <div className="container header-inner">
      <a className="logo" href="#top" aria-label={es ? "Inicio de Honeyvault Bakery" : "Honeyvault Bakery home"}><Image src="/images/logo/Primary-Logo.png" alt="Honeyvault Bakery" width={600} height={362} priority sizes="100px" /></a>
      <nav className="desktop-nav" aria-label={es ? "Navegación principal" : "Primary navigation"}>{navLinks.map(link => <a href={link.href} key={link.label} onClick={event => followLink(event, link.href)}>{es ? link.labelEs : link.label}</a>)}</nav>
      <div className="header-actions">
        <div className="site-search" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }} onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.querySelector("input")?.focus(); setOpen(false); } }}>
          <form className="search-pill" role="search" onSubmit={submit}><label className="sr-only" htmlFor="site-search">{es ? "Buscar pasteles, cajas o tiendas" : "Search pastries, boxes or shops"}</label><input id="site-search" type="search" value={query} autoComplete="off" onChange={event => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} aria-controls={resultsVisible ? "search-results" : undefined} placeholder={es ? "Buscar pasteles, cajas..." : "Search pastries, boxes..."} /><button type="submit" aria-controls={resultsVisible ? "search-results" : undefined} aria-expanded={resultsVisible} aria-label={es ? "Buscar" : "Search"}><Search size={16} aria-hidden="true" /></button></form>
          {resultsVisible && <div className="search-results" id="search-results"><p role="status">{matches.length ? `${matches.length} ${es ? (matches.length === 1 ? "coincidencia" : "coincidencias") : (matches.length === 1 ? "match" : "matches")}` : (es ? "No encontramos coincidencias." : "No matches found.")}</p>{matches.length ? <ul>{matches.map(match => <li key={`${match.kind}-${match.id}`}><a href={`#${match.section}`} onClick={event => { event.preventDefault(); select(match); }}>{es ? match.nameEs : match.name}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul> : <><span>{es ? "Prueba «pistacho», «brunch» o «Coral Gables»." : "Try “pistachio”, “brunch” or “Coral Gables”."}</span><a href="#textures" onClick={() => setOpen(false)}>{es ? "Ver pasteles" : "Browse pastries"}</a><a href="#boxes" onClick={() => setOpen(false)}>{es ? "Ver cajas" : "Browse boxes"}</a></>}</div>}
        </div>
        <div className="language-toggle" aria-label={es ? "Idioma" : "Language"}>{(["en", "es"] as const).map(value => <button type="button" key={value} className={language === value ? "active" : ""} aria-pressed={language === value} onClick={() => setLanguage(value)}>{value.toUpperCase()}</button>)}</div>
        <a className="signin-button" href="#large-order-inquiry" onClick={event => followLink(event, "#large-order-inquiry")}>{es ? "Armar pedido" : "Build an order"}</a>
        <details className="compact-navigation" ref={menuRef}><summary>{es ? "Menú" : "Menu"}<Menu size={16} aria-hidden="true" /></summary><nav aria-label={es ? "Navegación móvil" : "Mobile navigation"}>{navLinks.map(link => <a href={link.href} key={link.label} onClick={event => followLink(event, link.href)}>{es ? link.labelEs : link.label}</a>)}<a href="#large-order-inquiry" onClick={event => followLink(event, "#large-order-inquiry")}>{es ? "Armar pedido" : "Build an order"}</a></nav></details>
      </div>
    </div>
  </header>;
}
