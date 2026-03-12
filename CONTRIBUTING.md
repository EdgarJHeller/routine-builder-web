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

## Project Structure
```
src/
├── assets/             # Static visual assets
├── components/
│   ├── common/         # Shared components (Toast, Modals, Footer, Toggles)
│   ├── exercises/      # Exercise-related components
│   └── routines/       # Routine-related components and screens
├── constants/          # Static data and legal content
├── data/               # Exercise name suggestions
├── hooks/              # Custom hooks (timer, theme, toast, magic link, ...)
├── locales/            # i18n strings for DE and EN
├── utils/              # Helper functions (formatDuration, audio, speech)
├── App.jsx             # Main application entry and state orchestration
└── main.jsx            # React DOM rendering and global imports

index.css               # Tailwind @theme design tokens — edit here to restyle the app
```

## Design Tokens

All colors, border radii, and shadows are defined centrally in `index.css` under `@theme`. **Don't use hardcoded Tailwind color classes** like `bg-slate-100` or `text-blue-600` in components — use the semantic tokens instead:

| Token | Tailwind class | Purpose |
|---|---|---|
| `--color-surface-app` | `bg-surface-app` | Page background |
| `--color-surface-card` | `bg-surface-card` | Card / list item backgrounds |
| `--color-surface-subtle` | `bg-surface-subtle` | Icon container backgrounds |
| `--color-surface-workout` | `bg-surface-workout` | Workout screen dark background |
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

Dark mode overrides are defined via `@media (prefers-color-scheme: dark)` and `[data-theme]` selectors in `index.css`. Surface, stroke and content tokens change per theme — brand/success/warning/danger variants adjust automatically.

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
feat(editor): add rest-timer between exercises
fix(workout): prevent timer skipping on rapid tap
refactor(styles): update surface tokens in index.css
docs: update CONTRIBUTING with token table
test: add coverage for useToast hook
```

Common prefixes: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.

## Guidelines

**i18n** — The app supports English and German. Any user-facing string must be added to both locale files under `src/locales/`. Don't hardcode strings directly in JSX.

**Hooks** — Business logic (timer, keyboard handling, focus traps) lives in `src/hooks/`. Keep components free of complex logic.

**Accessibility** — The app supports full keyboard navigation. New interactive elements must have proper `aria-label` attributes and `focus:ring` styles using the `brand` token.

**Local-first** — The app has no backend. Don't introduce network requests or external accounts. Anonymous usage analytics via Vercel Analytics are the only exception.

**Components** — Functional components with hooks only. If a component is getting large, split it into smaller pieces.

**Audio** — Sound effects use the Web Audio API via `utils/audioUtils.js`. No external audio files.

## Reporting Issues

Please open a GitHub Issue and include:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS