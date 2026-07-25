# 🌿 Green Sparks — Environmental Campaign Website

A modern, premium, fully responsive 9-page website for **Green Sparks**, a
Kenyan environmental campaign fighting plastic pollution, promoting
recycling, tree planting, and climate action — built with **HTML5,
Tailwind CSS, and vanilla JavaScript only** (no frameworks, no build step).

---

## Design system

| Token | Value |
|---|---|
| Forest Green | `#166534` — primary, headers, dark sections |
| Emerald Green | `#22C55E` — accent, CTAs, links, active states |
| White | `#FFFFFF` — base surface |
| Sky Blue | `#0EA5E9` — secondary accent (water/coastal themes) |
| Earth Brown | `#7C5E3C` — tertiary accent (soil/reforestation themes) |
| Font | Poppins (Google Fonts), weights 300–900 |

**Signature visual motif:** an *Impact Ribbon* — a glassmorphism stat strip
that overlaps the hero's bottom edge with animated count-up numbers (kg of
plastic collected, trees planted, volunteers, communities reached). This
embodies the brief's core idea — measurable environmental impact — rather
than being decorative, and it recurs as the site's most memorable element.

Glassmorphism (`backdrop-filter: blur`), rounded-2xl/3xl corners, soft
shadows, and gradient accents (emerald → sky) are used consistently across
cards, without overusing any single effect.

---

## Folder structure

```
green-sparks/
├── index.html          # Home — hero, stats, about summary, mission/vision/values,
│                          featured campaigns, projects, events, testimonials, partners, newsletter
├── about.html           # Full story, mission/vision/values, team
├── campaigns.html       # All campaigns in detail
├── projects.html        # Long-term ground projects with progress bars
├── events.html          # Chronological event timeline
├── volunteer.html        # Volunteer registration form + Donate section
├── gallery.html          # Filterable photo gallery
├── blog.html              # News & blog grid + newsletter
├── contact.html           # Contact form + Google Maps embed
│
└── assets/
    ├── css/style.css     # Shared design system: glassmorphism, wave/blob motifs,
    │                       scroll-reveal animations, dark mode overrides
    ├── js/components.js  # Injects the shared navbar + footer into every page
    ├── js/main.js         # Dark mode, mobile menu, scroll reveal, counters,
    │                       back-to-top, gallery filter, form validation
    └── images/            # (site uses hosted Unsplash imagery — see note below)
```

## How the shared navbar/footer works

Since this is a static multi-page site with **no build tooling**, every
page includes two empty mount points:

```html
<div id="navbar-mount"></div>
...
<div id="footer-mount"></div>
```

`assets/js/components.js` runs on `DOMContentLoaded`, builds the navbar and
footer markup from one JS template (so the active nav link, dark-mode
button, and social links stay identical everywhere), and replaces the mount
points via `outerHTML`. This avoids `fetch()`-based includes, which break
under `file://` without a local server — the whole site works by just
opening `index.html` directly in a browser.

## Features implemented

- **Mobile-first responsive design** — every section is built mobile-up with Tailwind's `sm:`/`md:`/`lg:` breakpoints.
- **Professional navigation** — fixed navbar, glass background on scroll, active-page underline, responsive hamburger menu with animated open/close.
- **Full-screen hero** with background image + gradient overlay per page.
- **Animated statistics** — `IntersectionObserver` + `requestAnimationFrame` count-up, triggered once when scrolled into view.
- **Dark mode toggle** — persisted via `localStorage`, respects `prefers-color-scheme` on first visit, toggle in both desktop and mobile nav.
- **Scroll animations** — `.reveal`/`.reveal-left`/`.reveal-right`/`.reveal-scale` utility classes driven by one shared `IntersectionObserver`.
- **Image hover effects** — `.img-zoom` scales images on hover; cards lift with `.hover-lift`.
- **Loading animation** — full-screen spinner that fades out on `window.load`.
- **Back-to-top button** — appears after 500px of scroll, smooth-scrolls to top.
- **Gallery filtering** — vanilla JS category filter (`data-filter-btn` / `data-category`), no library.
- **Form validation (vanilla JS)** — volunteer registration, contact form, and newsletter signups all validate client-side (required fields, email regex, phone regex, checkbox requirements) with inline error messages and a success state — no HTML5-only validation, so styling stays consistent.
- **Smooth scrolling** — CSS `scroll-behavior: smooth` plus `scroll-padding-top` so anchor links (e.g. `volunteer.html#donate`) land below the fixed navbar.
- **Google Maps** — embedded via a standard `<iframe>` on the Contact page (no API key required for the embed).
- **Reduced motion respected** — a `prefers-reduced-motion` media query disables animation/transition durations for users who request it.

## Tech stack (exactly as requested)

- **HTML5** — semantic sectioning (`<header>`, `<section>`, `<article>`, `<footer>`) across all 9 pages.
- **Tailwind CSS** — loaded via CDN (`cdn.tailwindcss.com`) with an inline config extending the brand color palette and Poppins font — no build step, no npm required.
- **Vanilla JavaScript only** — no jQuery, no framework. `components.js` and `main.js` are the only two scripts.
- **Font Awesome** — icons via CDN.
- **Google Fonts** — Poppins, weights 300–900.

## Running the site

No build step needed. Either:
1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server for cleaner relative paths, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```

## Notes on images

All photography is pulled from Unsplash's hosted CDN via direct image
URLs (no API key needed, loads client-side same as any `<img src>`). For a
production deployment, replace these with your own licensed photography in
`assets/images/` and update the `src`/`style="background-image:..."`
references — the CSS and layout require no changes.
