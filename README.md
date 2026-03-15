# Ethan's Retro Portfolio

A pixel-perfect, interactive retro-OS portfolio built with **Vue 3**, **Vite**, and **Tailwind CSS**. The design mimics a vintage desktop environment with draggable windows, grid-snapping icons, a built-in music player, and easter-egg interactions.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883) ![Vite](https://img.shields.io/badge/Vite-8-646cff) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)

---

## Features

- **Draggable windows** with 16px grid-snap and Z-index management
- **Retro desktop icons** — double-click to open windows
- **In-app routing** — Home, About, Contact, and FAQ views rendered inside a main window
- **Music player** — small floating window for audio playback
- **Project windows** — dedicated windows for showcasing projects
- **Easter eggs** — System32 "Access Denied" alerts and a BSOD crash screen
- **Pixel-art aesthetic** — custom retro fonts (Alagard, PixelOperator, Pixelify Sans)

---

## Tech Stack

| Category   | Tool                          |
| :--------- | :---------------------------- |
| Framework  | Vue 3 (`<script setup>` SFCs) |
| Build Tool | Vite 8                        |
| Styling    | Tailwind CSS 4 + PostCSS      |
| Routing    | Vue Router 4                  |
| State      | Vue Composition API (reactive) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) **v18+** (LTS recommended)
- npm (comes with Node.js) or any compatible package manager

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/EthanPortfolio.git
cd EthanPortfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (default Vite port).

### 4. Build for production

```bash
npm run build
```

Output is written to the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

---

## Project Structure

```
EthanPortfolio/
├── public/
│   ├── audio/          # Background music (song.mp3)
│   ├── fonts/          # Alagard, PixelOperator, Pixelify Sans
│   └── icons/          # SVG icons (close, folder, mp3, trash)
├── src/
│   ├── App.vue         # Root component — desktop layout & nav bar
│   ├── main.js         # App entry point
│   ├── style.css       # Global styles & @font-face declarations
│   ├── assets/         # Static assets imported by components
│   ├── components/
│   │   ├── BaseButton.vue     # Retro-styled button
│   │   ├── BaseWindow.vue     # Draggable window container
│   │   ├── BSODScreen.vue     # Blue Screen of Death easter egg
│   │   ├── DesktopIcon.vue    # Clickable desktop icon
│   │   ├── MainWindow.vue     # Primary window with router-view
│   │   ├── MusicPlayer.vue    # Audio player window
│   │   └── ProjectWindow.vue  # Project showcase window
│   ├── composables/
│   │   └── useWindowManager.js  # Window Z-index & visibility state
│   ├── router/
│   │   └── index.js    # Vue Router config (Home, About, Contact, FAQ)
│   └── views/
│       ├── HomeView.vue
│       ├── AboutView.vue
│       ├── ContactView.vue
│       └── FaqView.vue
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Available Scripts

| Command             | Description                        |
| :------------------ | :--------------------------------- |
| `npm run dev`       | Start Vite dev server with HMR     |
| `npm run build`     | Build optimized production bundle  |
| `npm run preview`   | Locally preview the production build |

---

## License

This project is private and not licensed for redistribution.
