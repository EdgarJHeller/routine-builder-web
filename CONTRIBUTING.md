# Contributing to Workout Editor

Thanks for your interest in contributing! This document covers everything you need to get started.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

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
- **Browser localStorage** — all data stays local, no backend

## Project Structure

```
src/
├── assets/         # Static visual assets (SVG/icons)
├── components/     # Modular React components (UI, modals, screens)
├── constants/      # Static data and legal content strings
├── data/           # Exercise name suggestions and default datasets
├── hooks/          # Custom business logic (timer, focus trap, keydowns)
├── locales/        # i18n strings for DE and EN
├── utils/          # Helper functions and formatting
├── App.jsx         # Main application entry and state orchestration
└── main.jsx        # React DOM rendering and global config

index.css           # Tailwind @theme design tokens — edit here to restyle the app
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
| `--color-success` | `bg-success`, `hover:bg-success-hover` | Start button, positive actions |
| `--color-danger` | `hover:bg-danger-subtle`, `hover:text-danger-text` | Delete actions |
| `--color-warning` | `bg-warning-subtle`, `text-warning-text` | Side-switch badge |
| `--color-content-primary` | `text-content-primary` | Main body text |
| `--color-content-muted` | `text-content-muted` | Secondary / placeholder text |
| `--color-stroke-default` | `border-stroke-default` | Card borders |
| `--radius-card` | `rounded-card` | Cards and primary buttons |
| `--radius-icon` | `rounded-icon` | Icon containers, toggles |
| `--radius-badge` | `rounded-badge` | Badges |

To change the accent color globally, update `--color-brand` (and its variants `--color-brand-hover`, `--color-brand-subtle`, `--color-brand-text`) in `index.css`.

## Workflow

1. **Fork** the repo and create a feature branch: `git checkout -b feat/my-feature`
2. **Make your changes** — keep commits small and focused
3. **Test** in dev mode and do a production build before opening a PR
4. **Open a Pull Request** with a clear description of what changed and why

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(editor): add rest-timer between exercises
fix(workout): prevent timer skipping on rapid tap
refactor(styles): update surface tokens in index.css
docs: update CONTRIBUTING with token table
```

Common prefixes: `feat`, `fix`, `refactor`, `chore`, `docs`.

## Guidelines

**i18n** — The app supports English and German. Any user-facing string must be added to both locale files under `src/locales/`. Don't hardcode strings directly in JSX.

**Hooks** — Business logic (timer, keyboard handling, focus traps) lives in `src/hooks/`. Keep components free of complex logic.

**Accessibility** — The app supports full keyboard navigation. New interactive elements must have proper `aria-label` attributes and `focus:ring` styles using the `brand` token.

**Local-first** — The app has no backend. Don't introduce network requests or external accounts.

**Components** — Functional components with hooks only. If a component is getting large, split it into smaller pieces.

## Reporting Issues

Please open a GitHub Issue and include:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser and OS