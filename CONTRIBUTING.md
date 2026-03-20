# Contributing to Routine Editor

Thanks for your interest in contributing! This document covers everything you need to get started.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Setup
```bash
git clone https://github.com/EdgarJHeller/routine-builder-web.git
cd routine-builder-web
npm install
npm run dev
```

The app runs at `http://localhost:5173`. To verify a production build:
```bash
npm run build
```

## Tech Stack

- **React + Vite** — UI and build tooling
- **Tailwind CSS v4** — styling via `@theme` tokens in `index.css`
- **Lucide React** — icons
- **DM Sans** — self-hosted via `@fontsource/dm-sans`
- **vite-plugin-pwa** — PWA support
- **Vitest + React Testing Library** — unit and component tests
- **Browser localStorage** — all data stays local, no backend
- **Vercel Analytics** — anonymous import tracking, no accounts

## Project Structure
```
public/
└── catalog.json        # Curated routine catalog

src/
├── assets/             # Static visual assets
├── components/
│   ├── common/         # Shared components (Toast, Modals, Footer, Toggles)
│   ├── exercises/      # Exercise-related components
│   └── routines/       # Routine-related components and screens
├── constants/          # Static data and legal content
├── data/               # Demo routines and exercise name suggestions
├── hooks/              # Custom hooks (timer, theme, toast, magic link, catalog, ...)
├── locales/            # i18n strings for EN, DE, ES, FR
├── utils/              # Helper functions (formatDuration, audio, speech)
├── App.jsx             # Main application entry and state orchestration
└── main.jsx            # React DOM rendering and global imports

index.css               # Tailwind @theme design tokens — edit here to restyle the app
```

## Adding Routines to the Catalog

The catalog lives in `public/catalog.json`. Each entry requires translations for all four supported languages (`en`, `de`, `es`, `fr`):
```json
{
  "id": "catalog-3",
  "tags": ["your", "tags"],
  "translations": {
    "en": {
      "name": "Routine Name",
      "exercises": [
        { "id": "c3-e1", "name": "Exercise Name", "durationSeconds": 30, "isSideSwitchRequired": false }
      ]
    },
    "de": { "name": "Routine Name DE", "exercises": [{ "id": "c3-e1", "name": "Exercise Name DE", "durationSeconds": 30, "isSideSwitchRequired": false }] },
    "es": { "name": "Routine Name ES", "exercises": [{ "id": "c3-e1", "name": "Exercise Name ES", "durationSeconds": 30, "isSideSwitchRequired": false }] },
    "fr": { "name": "Routine Name FR", "exercises": [{ "id": "c3-e1", "name": "Exercise Name FR", "durationSeconds": 30, "isSideSwitchRequired": false }] }
  }
}
```

Guidelines for catalog routines:
- IDs must be unique — use `catalog-N` for the routine and `cN-eM` for exercises
- Provide translations for all four languages
- Keep routines focused and thematic — not just generic gym exercises
- Aim for 4–8 exercises per routine

## Design Tokens

All colors, border radii, and shadows are defined centrally in `index.css` under `@theme`. **Don't use hardcoded Tailwind color classes** like `bg-slate-100` or `text-blue-600` in components — use the semantic tokens instead:

| Token | Tailwind class | Purpose |
|---|---|---|
| `--color-surface-app` | `bg-surface-app` | Page background |
| `--color-surface-card` | `bg-surface-card` | Card / list item backgrounds |
| `--color-surface-subtle` | `bg-surface-subtle` | Icon container backgrounds |
| `--color-surface-routine` | `bg-surface-routine` | Routine screen dark background |
| `--color-brand` | `bg-brand`, `text-brand`, `border-brand` | Primary accent (buttons, focus rings) |
| `--color-secondary` | `bg-secondary`, `text-secondary` | Secondary accent (share actions) |
| `--color-success` | `bg-success`, `hover:bg-success-hover` | Start button, positive actions |
| `--color-danger` | `hover:bg-danger-subtle`, `hover:text-danger-text` | Delete actions |
| `--color-warning` | `bg-warning-subtle`, `text-warning-text` | Side-switch badge |
| `--color-content-primary` | `text-content-primary` | Main body text |
| `--color-content-secondary` | `text-content-secondary` | Secondary body text |
| `--color-content-muted` | `text-content-muted` | Placeholder / muted text |
| `--color-stroke-default` | `border-stroke-default` | Card borders |
| `--radius-card` | `rounded-card` | Cards and primary buttons |
| `--radius-icon` | `rounded-icon` | Icon containers, toggles |
| `--radius-badge` | `rounded-badge` | Badges |

Derived variants (`-hover`, `-subtle`, `-text`) are computed automatically via `color-mix()` — only update the base token.

Dark mode overrides are defined via `@media (prefers-color-scheme: dark)` and `[data-theme]` selectors in `index.css`.

## App Logo

The logo is implemented as a React component in `src/components/common/AppLogo.jsx`.
It uses `--color-brand` via a CSS variable with hardcoded fallback, so it responds
automatically to design token changes.

To regenerate the static PWA icons after changing the logo:
1. Update `AppLogo.jsx`
2. Render it in the app and export the SVG from DevTools
3. Upload to [realfavicongenerator.net](https://realfavicongenerator.net) to regenerate all icon sizes
4. Replace files in `public/` — see `vite.config.js` for the expected filenames

A helper script is available at `scripts/export-logo.html` for previewing the logo
at different sizes in the browser.

## Testing

Tests live in `src/test/` mirroring the `src/` structure:
```
src/test/
├── components/     # Component tests
├── hooks/          # Hook tests
├── utils/          # Utility tests
└── setup.js        # Global test setup
```
```bash
npm run test:run        # run once
npm test                # watch mode
npm run test:coverage   # with coverage report
```

Coverage is automatically uploaded to Codecov on every CI run.

## Workflow

1. **Fork** the repo and create a feature branch: `git checkout -b feat/my-feature`
2. **Make your changes** — keep commits small and focused
3. **Run tests** — `npm run test:run` must pass before opening a PR
4. **Test** in dev mode and do a production build before opening a PR
5. **Open a Pull Request** with a clear description of what changed and why

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(catalog): add yoga cool-down routine
fix(modal): prevent scroll jump on accordion expand
refactor(styles): update surface tokens in index.css
docs: update CONTRIBUTING with catalog guidelines
test: add coverage for useCatalog hook
```

Common prefixes: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.

## Guidelines

**i18n** — The app supports English, German, Spanish, and French. Any user-facing string must be added to all four locale files under `src/locales/`. Don't hardcode strings directly in JSX.

**Catalog** — New catalog routines must include translations for all four languages and follow the format described above.

**Hooks** — Business logic (timer, keyboard handling, focus traps, catalog fetching) lives in `src/hooks/`. Keep components free of complex logic.

**Accessibility** — The app supports full keyboard navigation. New interactive elements must have proper `aria-label` attributes and `focus:ring` styles using the `brand` token.

**Local-first** — The app has no backend. Don't introduce network requests beyond fetching `catalog.json`. Anonymous usage analytics via Vercel Analytics are the only exception.

**Components** — Functional components with hooks only. If a component is getting large, split it into smaller pieces.

**Audio** — Sound effects use the Web Audio API via `utils/audioUtils.js`. No external audio files.

## Reporting Issues

Please open a GitHub Issue and include:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS