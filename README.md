# MUZE — event space website

Marketing site for **MUZE**, a versatile 165 m² event space at Funkkis (Sepänkyläntie 2) in the heart of Vaasa, Finland. Bright and airy by day, a glowing club by night — for weddings, parties, seminars, exhibitions and every special moment.

**Trilingual:** English · Suomi · Svenska. The Finnish and Swedish copy is written fresh as native copy (not machine-translated) and reviewed by native speakers.

## Live site

- English — `index.html`
- Suomi — `fi.html`
- Svenska — `sv.html`

## Highlights

- One distinctive design with a **day / night** toggle that re-themes the whole site, mirroring how the room itself transforms.
- The audio **waveform** from the MUZE logo recurs as the signature motif.
- Interactive **floor-plan switcher** (36 / 48 / 62 seats), masonry gallery, full pricing & external-rental tables.
- Fully responsive, no framework, no build step required to view.

## Project structure

```
index.html · fi.html · sv.html   generated pages (EN / FI / SV)
site.css                         shared styles
site.js                          shared interactions
assets/                          venue photos, logo, floor plans
build.mjs                        generator — single source of all copy → 3 pages
```

## Editing the copy

All text for all three languages lives in `build.mjs`. Prices and technical specs are shared constants, so numbers stay identical across languages. After editing:

```bash
node build.mjs        # regenerates index.html, fi.html, sv.html
```

## Run locally

```bash
python3 -m http.server 8910
# then open http://localhost:8910/
```

---

Bookings & inquiries: **info@muze.fi** · Sepänkyläntie 2, Vaasa · Managed by Salsa Vaasa rf (2842111-4)
