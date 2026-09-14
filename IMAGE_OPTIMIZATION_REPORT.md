# Honeyvault Bakery Image Optimization Report

Performance-focused second cleanup. Visual design, layout, colors, copy, composition, and branding were intentionally preserved.

## Summary

- Original `public/images` weight: **54.04 MB**
- Optimized `public/images` weight: **3.68 MB**
- Reduction: **50.36 MB** (**93.2% smaller**)
- Image count before: **32**
- Image count after: **30**

## What changed

- Converted large PNG/JPG-style editorial assets to WebP.
- Resized oversized assets to their real display needs.
- Kept visual identity intact: same pink/brown palette, same sections, same crop logic, same copy.
- Updated image routes from `.png` to `.webp` where conversions were made.
- Switched major rendered images to `next/image` where it was safe and compatible with the existing layout.
- Preserved the typographic banner art direction with `<picture>` because it uses separate desktop/mobile assets.
- Removed unused heavy brand-logo variants that were not referenced by the app.
- Added `npm run audit:images` for future asset weight checks.

## Largest assets before

- 3.38 MB — `order_section_images/06_strawberry_danish_rounds.png`
- 3.28 MB — `order_section_images/09_chocolate_covered_strawberries.png`
- 3.16 MB — `Ubication/Flagship.png`
- 3.15 MB — `order_section_images/02_strawberry_cream_tartlets.png`
- 3.00 MB — `order_section_images/03_raspberry_cream_cupcakes.png`
- 3.00 MB — `order_section_images/08_pastel_cake_pops.png`
- 2.94 MB — `order_section_images/04_black_forest_mini_cakes.png`
- 2.91 MB — `Ubication/Beach-stop.png`
- 2.82 MB — `order_section_images/01_glazed_croissant_cubes.png`
- 2.71 MB — `croissant-car/croissant-car.png`
- 2.70 MB — `order_section_images/07_cherry_blossom_mini_cakes.png`
- 2.68 MB — `Ubication/Neighborhood-stop.png`

## Largest assets after

- 0.27 MB — `croissant-car/croissant-car.webp`
- 0.21 MB — `close-up/pan-baguette.webp`
- 0.20 MB — `Ubication/Beach-stop.webp`
- 0.20 MB — `Ubication/Flagship.webp`
- 0.19 MB — `close-up/roll-espiral-superior.webp`
- 0.18 MB — `close-up/croissant-almendras.webp`
- 0.17 MB — `Ubication/Neighborhood-stop.webp`
- 0.16 MB — `close-up/croissant-pistacho.webp`
- 0.15 MB — `logo/Logo-Mark.png`
- 0.15 MB — `close-up/roll-chocolate.webp`
- 0.14 MB — `close-up/roll-glaseado-blanco.webp`
- 0.13 MB — `hero/honeyvault-bakery.webp`

## Converted / resized assets

- `hero/honeyvault-bakery.png` → `hero/honeyvault-bakery.webp` · 1672×941 → 1600×900 · 2.19 MB → 0.13 MB
- `croissant-car/croissant-car.png` → `croissant-car/croissant-car.webp` · 1672×941 → 1600×900 · 2.71 MB → 0.27 MB
- `location/Honeyvault-Coral-Gables.png` → `location/Honeyvault-Coral-Gables.webp` · 1448×1086 → 1000×750 · 1.58 MB → 0.06 MB
- `location/Honeyvault-South-Beach.png` → `location/Honeyvault-South-Beach.webp` · 1448×1086 → 1000×750 · 1.73 MB → 0.04 MB
- `location/Honeyvault-Wynwood.png` → `location/Honeyvault-Wynwood.webp` · 1448×1086 → 1000×750 · 1.47 MB → 0.05 MB
- `Ubication/Beach-stop.png` → `Ubication/Beach-stop.webp` · 1122×1402 → 760×950 · 2.91 MB → 0.20 MB
- `Ubication/Flagship.png` → `Ubication/Flagship.webp` · 1254×1254 → 760×760 · 3.16 MB → 0.20 MB
- `Ubication/Neighborhood-stop.png` → `Ubication/Neighborhood-stop.webp` · 1086×1448 → 760×1013 · 2.68 MB → 0.17 MB
- `order_section_images/01_glazed_croissant_cubes.png` → `order_section_images/01_glazed_croissant_cubes.webp` · 1024×1536 → 760×1140 · 2.82 MB → 0.07 MB
- `order_section_images/02_strawberry_cream_tartlets.png` → `order_section_images/02_strawberry_cream_tartlets.webp` · 1024×1536 → 760×1140 · 3.15 MB → 0.11 MB
- `order_section_images/03_raspberry_cream_cupcakes.png` → `order_section_images/03_raspberry_cream_cupcakes.webp` · 1024×1536 → 760×1140 · 3.00 MB → 0.10 MB
- `order_section_images/04_black_forest_mini_cakes.png` → `order_section_images/04_black_forest_mini_cakes.webp` · 1024×1536 → 760×1140 · 2.94 MB → 0.09 MB
- `order_section_images/05_citrus_cream_cups.png` → `order_section_images/05_citrus_cream_cups.webp` · 1024×1024 → 760×760 · 2.23 MB → 0.09 MB
- `order_section_images/06_strawberry_danish_rounds.png` → `order_section_images/06_strawberry_danish_rounds.webp` · 1024×1536 → 760×1140 · 3.38 MB → 0.13 MB
- `order_section_images/07_cherry_blossom_mini_cakes.png` → `order_section_images/07_cherry_blossom_mini_cakes.webp` · 1024×1536 → 760×1140 · 2.70 MB → 0.06 MB
- `order_section_images/08_pastel_cake_pops.png` → `order_section_images/08_pastel_cake_pops.webp` · 1024×1536 → 760×1140 · 3.00 MB → 0.07 MB
- `order_section_images/09_chocolate_covered_strawberries.png` → `order_section_images/09_chocolate_covered_strawberries.webp` · 1024×1536 → 760×1140 · 3.28 MB → 0.12 MB
- `typographic-banner/typographic-banner-2.png` → `typographic-banner/typographic-banner-2.webp` · 1672×802 → 1600×767 · 1.58 MB → 0.12 MB
- `typographic-banner/typographic-banner-movil.png` → `typographic-banner/typographic-banner-movil.webp` · 1122×1402 → 900×1125 · 1.83 MB → 0.10 MB
- `typographic-banner/typographic-banner.png` → `typographic-banner/typographic-banner.webp` · 1672×941 → 1600×900 · 1.17 MB → 0.08 MB

## Removed from final public bundle

- `hero/honeyvault-bakery.png`
- `croissant-car/croissant-car.png`
- `location/Honeyvault-Coral-Gables.png`
- `location/Honeyvault-South-Beach.png`
- `location/Honeyvault-Wynwood.png`
- `Ubication/Beach-stop.png`
- `Ubication/Flagship.png`
- `Ubication/Neighborhood-stop.png`
- `order_section_images/01_glazed_croissant_cubes.png`
- `order_section_images/02_strawberry_cream_tartlets.png`
- `order_section_images/03_raspberry_cream_cupcakes.png`
- `order_section_images/04_black_forest_mini_cakes.png`
- `order_section_images/05_citrus_cream_cups.png`
- `order_section_images/06_strawberry_danish_rounds.png`
- `order_section_images/07_cherry_blossom_mini_cakes.png`
- `order_section_images/08_pastel_cake_pops.png`
- `order_section_images/09_chocolate_covered_strawberries.png`
- `typographic-banner/typographic-banner-2.png`
- `typographic-banner/typographic-banner-movil.png`
- `typographic-banner/typographic-banner.png`
- `logo/Secondary-Logo.png`
- `logo/Submark.png`

Original sources were backed up outside the project during optimization and are not included in the final portfolio zip.

## Current public image inventory

- `Ubication/Beach-stop.webp` · 760×950 · 0.20 MB
- `Ubication/Flagship.webp` · 760×760 · 0.20 MB
- `Ubication/Neighborhood-stop.webp` · 760×1013 · 0.17 MB
- `close-up/croissant-almendras.webp` · 750×1000 · 0.18 MB
- `close-up/croissant-fresa-crema.webp` · 563×1000 · 0.08 MB
- `close-up/croissant-pistacho.webp` · 750×1000 · 0.16 MB
- `close-up/eclair-chocolate.webp` · 750×1000 · 0.08 MB
- `close-up/pan-baguette.webp` · 750×1000 · 0.21 MB
- `close-up/roll-chocolate.webp` · 750×1000 · 0.15 MB
- `close-up/roll-espiral-superior.webp` · 667×1000 · 0.19 MB
- `close-up/roll-glaseado-blanco.webp` · 750×1000 · 0.14 MB
- `croissant-car/croissant-car.webp` · 1600×900 · 0.27 MB
- `hero/honeyvault-bakery.webp` · 1600×900 · 0.13 MB
- `location/Honeyvault-Coral-Gables.webp` · 1000×750 · 0.06 MB
- `location/Honeyvault-South-Beach.webp` · 1000×750 · 0.04 MB
- `location/Honeyvault-Wynwood.webp` · 1000×750 · 0.05 MB
- `logo/Logo-Mark.png` · 512×512 · 0.15 MB
- `logo/Primary-Logo.png` · 600×362 · 0.07 MB
- `order_section_images/01_glazed_croissant_cubes.webp` · 760×1140 · 0.07 MB
- `order_section_images/02_strawberry_cream_tartlets.webp` · 760×1140 · 0.11 MB
- `order_section_images/03_raspberry_cream_cupcakes.webp` · 760×1140 · 0.10 MB
- `order_section_images/04_black_forest_mini_cakes.webp` · 760×1140 · 0.09 MB
- `order_section_images/05_citrus_cream_cups.webp` · 760×760 · 0.09 MB
- `order_section_images/06_strawberry_danish_rounds.webp` · 760×1140 · 0.13 MB
- `order_section_images/07_cherry_blossom_mini_cakes.webp` · 760×1140 · 0.06 MB
- `order_section_images/08_pastel_cake_pops.webp` · 760×1140 · 0.07 MB
- `order_section_images/09_chocolate_covered_strawberries.webp` · 760×1140 · 0.12 MB
- `typographic-banner/typographic-banner-2.webp` · 1600×767 · 0.12 MB
- `typographic-banner/typographic-banner-movil.webp` · 900×1125 · 0.10 MB
- `typographic-banner/typographic-banner.webp` · 1600×900 · 0.08 MB

## Validation

- Static image route check: passed; no missing `/images/...` references found.
- Residue scan for old travel-template terms: passed; no old tourism-template labels found in app/components/data/README/package files.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: attempted, but the sandbox cannot fetch Google Fonts (`next/font/google` Oswald) because external font access is blocked here. This is an environment/network limitation, not an image/code error. The project should build in the user machine/Vercel where Google Fonts can be fetched, as it did before optimization.

## Final note

This optimization is focused on portfolio delivery speed. It does not change the visual direction or product concept.
