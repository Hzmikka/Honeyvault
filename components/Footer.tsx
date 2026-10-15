"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { commerceLinks } from "@/data/content";
import { contactLinks } from "@/data/contact";
import { footerExploreLinks } from "@/data/footer";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionLink } from "@/components/SectionLink";

export function Footer() {
  const { language } = useLanguage();
  const es = language === "es";
  const year = new Date().getFullYear();

  const socialLinks = [
    { label: "Instagram", href: contactLinks.instagram },
    { label: "TikTok", href: contactLinks.tiktok },
    { label: "Pinterest", href: contactLinks.pinterest },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <footer className="footer" aria-label={es ? "Pie de página de Honeyvault Bakery" : "Honeyvault Bakery footer"}>
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="footer-title" href="#top" aria-label="Honeyvault Bakery home">Honeyvault Bakery</a>
          <p>{es ? "Pasteles frescos y dulces por encargo en Miami." : "Fresh pastries and made-to-order sweets across Miami."}</p>

          <div className="footer-actions">
            <a className="footer-primary-action" href={commerceLinks.orderNow}>{es ? "Pedir pasteles" : "Order pastries"}<ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href="#locations">{es ? "Encontrar tienda" : "Find a shop"}</a>
          </div>

          {socialLinks.length > 0 ? (
            <div className="footer-socials" aria-label={es ? "Redes sociales" : "Social links"}>
              {socialLinks.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label}<ArrowUpRight size={12} aria-hidden="true" /></a>)}
            </div>
          ) : null}
        </div>

        <div className="footer-links-grid">
          <nav className="footer-column" aria-label={es ? "Explorar" : "Explore"}>
            <h3>{es ? "Explorar" : "Explore"}</h3>
            {footerExploreLinks.map((link) => <a href={link.href} key={link.label}>{es ? link.labelEs : link.label}</a>)}
          </nav>

          <nav className="footer-column" aria-label={es ? "Contacto" : "Contact"}>
            <h3>{es ? "Contacto" : "Contact"}</h3>
            <SectionLink href="#large-order-inquiry">{es ? "Armar pedido" : "Build an order"}</SectionLink>
            {contactLinks.email ? <a href={contactLinks.email}>{es ? "Enviar email" : "Email us"}</a> : null}
            {contactLinks.whatsapp ? <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a> : null}
          </nav>
        </div>
      </div>

      <div className="container studio-credit" id="studio"><div><p>Celeste Web Studio</p><h2>{es ? "¿Tu negocio podría verse así?" : "Could this be your business?"}</h2><span>{es ? "Honeyvault es una marca ficticia creada para mostrar una experiencia web completa." : "Honeyvault is a fictional brand built to showcase a complete web experience."}</span></div><a className="demo-button" href="mailto:celestewebstudio@gmail.com?subject=Quiero%20una%20web%20como%20Honeyvault">{es ? "Quiero una web así" : "I want a website like this"}<ArrowUpRight size={16} aria-hidden="true" /></a></div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>
            <span>© {year} Honeyvault Bakery</span><span aria-hidden="true">·</span>
            <span>{es ? "Concepto de portafolio" : "Portfolio concept"}</span>

          </div>
          <a href="#top">{es ? "Volver arriba" : "Back to top"}<ArrowUp size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
