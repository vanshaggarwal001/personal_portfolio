# Vansh Aggarwal — Personal Portfolio

A premium, fully responsive personal portfolio website built with plain
HTML5, CSS3 and JavaScript (ES6+) — no frameworks required.

## ✨ Features

- Glassmorphism UI with soft gradients (`#2563EB → #06B6D4 → #38BDF8`)
- Light & dark mode (auto-detects system preference, remembers your choice)
- Animated loading screen, sticky navbar with scroll-spy
- Hero section with rotating typing animation (Typed.js) and floating shapes
- Lightweight custom canvas particle background + cursor glow (desktop)
- Scroll-reveal animations via AOS
- Animated skill bars & circular progress rings
- Project grid with live filtering and search
- Internship timeline + certificate cards
- Live GitHub stats, contribution calendar and latest repos (GitHub REST API)
- Animated statistics counters
- Testimonials slider, blog preview section
- Contact form (EmailJS-ready, with a `mailto:` fallback) + embedded map
- Back-to-top button, local visitor counter, custom scrollbar
- Fully responsive: mobile, tablet, laptop, desktop, ultra-wide
- Semantic HTML, keyboard-navigable, respects `prefers-reduced-motion`

## 📁 Folder structure

```
portfolio/
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/particles.js
│   ├── images/        (SVG placeholders — swap for real photos/screenshots)
│   ├── icons/
│   ├── fonts/
│   └── resume/         ← put Vansh_Aggarwal_Resume.pdf here
├── index.html
└── README.md
```

## 🚀 Running it

No build step needed — just open `index.html` in a browser, or serve the
folder with any static server, e.g.:

```bash
npx serve portfolio
```

## 🔧 Things to plug in before going live

1. **Resume** — drop `Vansh_Aggarwal_Resume.pdf` into `assets/resume/`.
2. **Real photo** — replace `assets/images/profile-placeholder.svg` with a
   real headshot (update the `<img>` `src` in the Hero and GitHub sections).
3. **Project screenshots** — replace `project-restaurant.svg` and
   `project-weather.svg` with real screenshots of your live demos.
4. **EmailJS** — create a free account at emailjs.com, then in
   `assets/js/main.js` replace:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```
   Until these are filled in, the contact form falls back to opening the
   visitor's email client with a pre-filled message — so it always works.
5. **Open Graph image** — add `assets/images/og-cover.jpg` (1200×630) for
   nicer link previews on social/messaging apps.
6. **Google Maps** — the embed currently geocodes "Dehradun, Uttarakhand,
   India" by name; swap in a precise address/place ID if you want an exact pin.

## 🧩 Tech used

HTML5 · CSS3 (custom properties, glassmorphism, Grid/Flexbox) ·
Vanilla JavaScript (ES6+) · AOS · Typed.js · EmailJS · Font Awesome ·
GitHub REST API · a self-contained canvas particle system (no external
particles.js dependency, for reliability and performance).

## ♿ Accessibility & performance notes

- All interactive elements are reachable via keyboard with visible focus rings.
- Images use `loading="lazy"` and descriptive `alt` text.
- Animations respect `prefers-reduced-motion`.
- No layout-shifting fonts: `font-display: swap` via Google Fonts link.
- Single external CSS/JS files, deferred GitHub API calls, no large media —
  built to score well on Lighthouse out of the box.
