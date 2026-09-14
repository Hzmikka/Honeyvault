# Vercel deployment checklist

- [ ] Repository root contains `package.json` (no extra nested project folder required).
- [ ] Node.js 22.x selected.
- [ ] Framework preset detected as Next.js.
- [ ] `npm run build` used as build command.
- [ ] `LEAD_WEBHOOK_URL` added only if real lead delivery is desired.
- [ ] Domain / project URL checked after first deployment.
- [ ] Test EN and ES toggle after deployment.
- [ ] Test search in both languages: `croissant`, `ubicación`, `pedido grande`, `reviews`.
- [ ] Test header `Order` → shops and `Plan order` → inquiry form.
- [ ] Test each Quick Path card and every internal anchor.
- [ ] Test form in demo mode before attaching a real webhook.
