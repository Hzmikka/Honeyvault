"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { commerceLinks } from "@/data/content";
import { contactLinks } from "@/data/contact";
import { footerExploreLinks } from "@/data/footer";
import { useLanguage } from "@/components/LanguageProvider";

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
            <a href="#large-order-inquiry">{es ? "Solicitud de pedido grande" : "Large-order request"}</a>
            <a href={contactLinks.email}>{es ? "Enviar email" : "Email us"}</a>
            {contactLinks.whatsapp ? <a href={contactLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a> : null}
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>
            <span>© {year} Honeyvault Bakery</span><span aria-hidden="true">·</span>
            <span>{es ? "Concepto de portafolio" : "Portfolio concept"}</span><span aria-hidden="true">·</span>
            <span>{es ? "Solo demo — no se procesan pedidos reales." : "Demo only — no real orders are processed."}</span>
          </div>
          <a href="#top">{es ? "Volver arriba" : "Back to top"}<ArrowUp size={13} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
