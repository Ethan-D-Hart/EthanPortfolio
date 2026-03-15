# 🕹️ Ethan's Retro Portfolio: Execution Plan

## 1. Project Overview
A pixel-perfect, interactive retro-OS portfolio built with **Vue 3** and **Tailwind CSS**. The design mimics a vintage desktop environment with draggable windows, grid-snapping icons, and interactive mechanics.

## 2. Technical Stack & Environment
* **Framework:** Vue 3 (Vite)
* **Styling:** Tailwind CSS + PostCSS
* **Routing:** `vue-router` (Nested navigation inside the main window)
* **State:** Reactive Composition API (managing window Z-index and visibility)
* **Fonts:**
    * `Alagard.ttf` (Headers/Logos)
    * `PixelOperator.ttf` (UI/Standard Text)

---

## 3. Design System Specs
### Color Palette
| Element | Hex Code | Role |
| :--- | :--- | :--- |
| **Desktop Background** | `#82B1FF` | Primary Workspace |
| **Window Surface** | `#FFFFFF` | Content Area |
| **Header Bar (Active)** | `#1A2B3C` | Active UI focus |
| **Accent/Buttons** | `#4A698D` | Interaction elements |
| **Text** | `#1A1A1A` | High-contrast typography |

### Styling Rules
* **Pixel Fidelity:** `image-rendering: pixelated;` must be applied globally.
* **Antialiasing:** Disabled (`font-smooth: never`) to maintain sharp edges.
* **Dither Pattern:** Use this Base64 2x2 checkerboard for inner window borders:
    `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAOSURBVChTY2BgYPgfAAADEQDCmN676wAAAABJRU5ErkJggg==`

---

## 4. Component Architecture
### Base Components (Reusable)
* **`BaseWindow.vue`**: Draggable container with 16px grid-snap. Handles "Maximize," "Close," and Z-index elevation on click.
* **`DesktopIcon.vue`**: Icon + Label. Handles double-click events to launch specific windows.
* **`BaseButton.vue`**: High-fidelity retro button with sharp borders and `PixelOperator` typography.

### Specialized Logic
* **`MainWindow.vue`**: The primary portfolio window. Uses `<router-view>` to toggle between Home, About, Contact, and FAQ.
* **`MusicPlayer.vue`**: A secondary small window that controls audio playback for `song.mp3`.

---

## 5. Interactive Mechanics (Easter Eggs)
1.  **System32 Logic**:
    * **Access Denied:** Double-clicking the folder triggers an "Access Denied" retro-alert modal.
    * **Collision Detection:** If the folder is dropped onto the **Trash** icon, trigger a "System Crash" (BSOD) or close the tab.
2.  **Top-Nav Mirroring**: The links in the top global header bar must stay in sync with the navigation state of the central window.

---

## 6. Implementation Checklist
- [ ] Initialize Vue 3 / Tailwind / Router.
- [ ] Setup `@font-face` for Alagard and PixelOperator.
- [ ] Create global Z-index manager for multiple windows.
- [ ] Build the draggable 16px grid-snap logic.
- [ ] Implement the `MainWindow` internal routing.
- [ ] Add the System32/Trash collision detection.
- [ ] Final polish: Ensure all borders follow the **4px grid rule**.