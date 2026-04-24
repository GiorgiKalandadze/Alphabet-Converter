# ანბანი · Anbani

Georgian alphabet converter between **Mkhedruli** (modern) and **Nuskhuri** (ecclesiastical).
Bidirectional, live as you type, with the full 33-letter modern alphabet plus the five
archaic letters (ჱ ჲ ჳ ჴ ჵ) that commonly appear in old Georgian texts.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
npm run deploy     # publish dist/ to gh-pages
```

## Stack

- **Vite** + **React 18**
- CSS Modules, no UI library
- Automatic light/dark mode via `prefers-color-scheme`

## Structure

```
src/
├── alphabet.js        character maps + convert()
├── App.jsx            UI
├── App.module.css     component styles
├── index.css          design tokens + reset
└── main.jsx           entry
```

`alphabet.js` defines a single list of `[mkhedruli, nuskhuri]` pairs; both direction
maps are derived from it, so adding a letter means editing one line.
