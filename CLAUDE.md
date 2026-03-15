# CLAUDE.md — Claude Instruction File

This file provides guidance for Claude (and other AI coding assistants) when working with this repository.

## Project Overview

**Ethan's Retro Portfolio** is a pixel-perfect, interactive retro-OS desktop portfolio built with Vue 3, Vite, and Tailwind CSS v4. The UI mimics a vintage desktop environment: draggable windows, grid-snapping icons, a built-in music player, and easter-egg interactions (System32 access-denied alert, BSOD crash screen).

## Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

There is currently no test runner configured. Do not add a test framework unless explicitly requested.

## Architecture

```
EthanPortfolio/
├── public/
│   ├── audio/          # Background music (song.mp3)
│   ├── fonts/          # Alagard.ttf, PixelOperator.ttf, PixelifySans-Regular.ttf
│   └── icons/          # SVG icons: close.svg, folder.svg, mp3.svg, trash.svg
├── src/
│   ├── App.vue                         # Root — desktop shell, top nav, icon/window layout
│   ├── main.js                         # Entry point
│   ├── style.css                       # Global styles, @font-face declarations
│   ├── components/
│   │   ├── BaseButton.vue              # Retro-styled reusable button
│   │   ├── BaseWindow.vue              # Draggable window with 16 px grid-snap & Z-index
│   │   ├── BSODScreen.vue              # Blue Screen of Death easter egg overlay
│   │   ├── DesktopIcon.vue             # Double-click icon that emits @open / @dropped
│   │   ├── MainWindow.vue              # Primary window containing <router-view>
│   │   ├── MusicPlayer.vue             # Audio player window for song.mp3
│   │   └── ProjectWindow.vue           # Project showcase window (reused per project)
│   ├── composables/
│   │   └── useWindowManager.js         # Reactive Z-index, visibility, and minimize state
│   ├── router/
│   │   └── index.js                    # Vue Router 4 config (/, /about, /contact, /faq)
│   └── views/
│       ├── HomeView.vue
│       ├── AboutView.vue
│       ├── ContactView.vue
│       └── FaqView.vue
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

### Key patterns

| Concern | Approach |
|---|---|
| Window state | `useWindowManager` composable — `provide`d at `App.vue`, `inject`ed in child components |
| Window focus | `focusWindow(id)` increments a global `topZ` counter and assigns it as `zIndex` |
| Dragging | `BaseWindow.vue` handles `mousedown`/`mousemove`/`mouseup` with 16 px snap (`Math.round(v / 16) * 16`) |
| Routing | Vue Router 4; navigation happens inside `MainWindow`; top-nav buttons also open the main window |
| Easter eggs | System32 double-click → `showAccessDenied` ref; drag-to-trash → `handleSystem32Drop` collision check → `showBSOD` ref |

## Design System

| Token | Value | Role |
|---|---|---|
| `desktop` | `#82B1FF` | Desktop background |
| `window-bg` | `#FFFFFF` | Window / modal surface |
| `header-dark` | `#1A2B3C` | Title bars, borders |
| `accent` | `#4A698D` | Buttons, interactive elements |
| `retro-text` | `#1A1A1A` | Body text |

**Typography:**  
- `Alagard` — decorative headers / logo  
- `PixelOperator` — standard UI text  
- `PixelifySans-Regular` — window chrome and modals

**Global rules:**  
- `image-rendering: pixelated` must be applied to all icons/sprites  
- Font smoothing is disabled to preserve sharp pixel edges  
- All spacing/borders should align to a **4 px grid**; dragging snaps to a **16 px grid**

## Coding Conventions

- All Vue components use `<script setup>` (Composition API).  
- Single-file components (`.vue`) are the only component format used; no `.jsx`/`.tsx`.  
- Tailwind utility classes are preferred over custom CSS; scoped `<style>` blocks are used only when Tailwind cannot express a rule (e.g., `repeating-linear-gradient` scanlines).  
- Custom Tailwind color tokens (defined in `tailwind.config.js`) must be used instead of raw hex values in templates.  
- Composables live in `src/composables/` and are named `useXxx.js`.  
- No TypeScript — the project is plain JavaScript.
