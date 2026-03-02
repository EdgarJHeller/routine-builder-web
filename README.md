# ⚡ Workout Editor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green.svg?style=flat-square)](https://your-vercel-url.vercel.app)

A minimalist, high-contrast workout routine builder and timer. Designed for focus, this app avoids the clutter of exercise videos and ads, providing a "Zen" experience for athletes who know their form and just want to get the work done.

## ✨ Features

* **Routine Builder:** Quickly add, edit, and reorder exercises.
* **High-Contrast Timer:** Large, "glanceable" typography designed for visibility from across the gym.
* **Progress Visualization:** An intuitive SVG-based circular progress ring tracking your set completion.
* **Intelligent Keyboard Navigation:** Full support for building routines using only your keyboard.
* **Local-First Privacy:** All workout data is stored in your browser's `localStorage`—no accounts or servers required.
* **Side-Switch Alerts:** Visual cues for exercises requiring a mid-set side switch.

## 🛠️ Tech Stack

* **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with semantic design tokens defined in `index.css`
* **Icons:** [Lucide React](https://lucide.dev/)
* **Storage:** Browser LocalStorage API

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

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

## 📂 Project Structure

```text
src/
├── assets/         # Static visual assets (SVG/Icons)
├── components/     # Modular React components (UI, Modals, Screens)
├── constants/      # Static data and legal content strings
├── data/           # Exercise name suggestions and default datasets
├── hooks/          # Custom business logic (Timer, Focus Trap, Keydowns)
├── locales/        # Multi-language support (i18n) for DE and EN
├── utils/          # Global helper functions and formatting
├── App.jsx         # Main application entry and state orchestration
└── main.jsx        # React DOM rendering and global configuration

index.css           # Tailwind @theme design tokens — single source of truth for
                    # all colors, border radii, and shadows. Edit here to restyle the app.
```

## 🎨 Design Tokens

Colors, radii, and shadows are defined as semantic tokens in `index.css` rather than using Tailwind's built-in palette directly. This makes global restyling straightforward — to change the accent color across the entire app, update `--color-brand` in `index.css`.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full token reference.

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for the full legal text.