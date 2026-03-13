# ⚡ Routine Editor

[![Live Demo](https://img.shields.io/badge/Live-Demo-green.svg)](https://routine.hejh.me)
[![CI](https://github.com/EdgarJHeller/routine-builder-web/actions/workflows/ci.yml/badge.svg)](https://github.com/EdgarJHeller/routine-builder-web/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/EdgarJHeller/routine-builder-web/branch/main/graph/badge.svg)](https://codecov.io/gh/EdgarJHeller/routine-builder-web)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100%20%7C%20100%20%7C%20100%20%7C%20100-brightgreen?logo=lighthouse)](https://routine.hejh.me)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A minimalist workout routine builder and timer. Designed for focus, this app avoids the clutter of exercise videos and ads, providing a clean experience for athletes who know their form and just want to get the work done.

## ✨ Features

* **Routine Builder:** Quickly add, edit, and reorder exercises.
* **Prep Countdown:** A 5-second preparation phase before each exercise with text-to-speech announcement.
* **High-Contrast Timer:** Large, glanceable typography designed for visibility from across the gym.
* **Progress Visualization:** An SVG-based circular progress ring tracking set completion.
* **Side-Switch Alerts:** Timer pauses mid-set with an audio cue for exercises requiring a side switch.
* **Routine Sharing:** Share routines via a link — recipients get a preview before importing.
* **Keyboard Navigation:** Full support for building routines using only your keyboard.
* **Local-First Privacy:** All workout data is stored in your browser's `localStorage` — no accounts or servers required.
* **Dark Mode:** Follows system preference with a manual toggle override, persisted via `localStorage`.
* **Bilingual:** Full English and German support.

## 🛠️ Tech Stack

* **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with semantic design tokens in `index.css`
* **Icons:** [Lucide React](https://lucide.dev/)
* **Font:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) via `@fontsource/dm-sans` (self-hosted)
* **PWA:** [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
* **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
* **CI:** GitHub Actions + [Codecov](https://codecov.io)
* **Storage:** Browser `localStorage`

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm

### Installation

1.  **Clone the repository:**
```bash
    git clone https://github.com/EdgarJHeller/routine-builder-web.git
    cd routine-builder-web
```

2.  **Install dependencies:**
```bash
    npm install
```

3.  **Run the development server:**
```bash
    npm run dev
```

4.  **Build for production:**
```bash
    npm run build
```

5.  **Run tests:**
```bash
    npm run test:run
```

6.  **Run tests with coverage:**
```bash
    npm run test:coverage
```

## 📂 Project Structure
```text
src/
├── assets/         # Static visual assets
├── components/     # React components
│   ├── common/     # Shared components (Toast, Modals, Footer, Toggles)
│   ├── exercises/  # Exercise-related components
│   └── routines/   # Routine-related components and screens
├── constants/      # Static data and legal content
├── data/           # Exercise name suggestions
├── hooks/          # Custom hooks (timer, theme, toast, magic link, ...)
├── locales/        # i18n strings for DE and EN
├── utils/          # Helper functions (formatDuration, audio, speech)
├── App.jsx         # Main application entry and state orchestration
└── main.jsx        # React DOM rendering and global imports

index.css           # Tailwind @theme design tokens — single source of truth
                    # for all colors, border radii, and shadows.
```

## 🎨 Design Tokens

Colors, radii, and shadows are defined as semantic tokens in `index.css`. To change the accent color across the entire app, update `--color-brand`. Dark mode and manual theme overrides are also defined here via `@media (prefers-color-scheme: dark)` and `[data-theme]` selectors.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full token reference.

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for the full legal text.