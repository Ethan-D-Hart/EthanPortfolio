<script setup>
import { provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowManager } from './composables/useWindowManager.js'
import DesktopIcon   from './components/DesktopIcon.vue'
import MainWindow    from './components/MainWindow.vue'
import MusicPlayer   from './components/MusicPlayer.vue'
import ProjectWindow from './components/ProjectWindow.vue'
import BSODScreen    from './components/BSODScreen.vue'

const wm = useWindowManager()
provide('windowManager', wm)

const route  = useRoute()
const router = useRouter()

const navLinks = [
  { label: 'HOME',    path: '/' },
  { label: 'ABOUT',   path: '/about' },
  { label: 'CONTACT', path: '/contact' },
  { label: 'FAQ',     path: '/faq' },
]

const projects = [
  { id: 'project_1', title: 'PROJECT_1', x: 250, y: 80,  description: 'Project 1 — coming soon.' },
  { id: 'project_2', title: 'PROJECT_2', x: 270, y: 100, description: 'Project 2 — coming soon.' },
  { id: 'project_3', title: 'PROJECT_3', x: 290, y: 120, description: 'Project 3 — coming soon.' },
]

const showAccessDenied = ref(false)
const showBSOD         = ref(false)
const trashEl          = ref(null)

const handleSystem32Drop = ({ clientX, clientY }) => {
  if (!trashEl.value) return
  const rect = trashEl.value.getBoundingClientRect()
  if (clientX >= rect.left && clientX <= rect.right &&
      clientY >= rect.top  && clientY <= rect.bottom) {
    showBSOD.value = true
  }
}
</script>

<template>
  <!-- BSOD overlay -->
  <BSODScreen v-if="showBSOD" />

  <!-- Access Denied modal -->
  <Transition name="fade">
    <div
      v-if="showAccessDenied"
      class="fixed inset-0 z-[9000] bg-black/50 flex items-center justify-center"
      @click.self="showAccessDenied = false"
    >
      <div class="border-2 border-header-dark select-none">
        <div class="border border-header-dark bg-dither p-px">
          <!-- modal title bar -->
          <div class="flex items-center justify-between bg-header-dark text-white px-2 py-0.5">
            <span class="font-['PixelifySans-Regular'] text-sm uppercase">System32</span>
            <button
              class="w-4 h-4 border border-white/60 text-xs flex items-center justify-center hover:bg-white hover:text-header-dark"
              @click="showAccessDenied = false"
            >×</button>
          </div>
          <!-- modal body -->
          <div class="bg-window-bg p-8 flex flex-col items-center gap-4 min-w-[240px]">
            <p class="font-['PixelifySans-Regular'] text-xl text-retro-text">⛔ ACCESS DENIED</p>
            <p class="font-['PixelifySans-Regular'] text-sm text-retro-text text-center leading-relaxed">
              You do not have permission<br>to access System32.
            </p>
            <button
              class="w-24 py-1 bg-accent text-white border-2 border-accent font-['PixelifySans-Regular'] uppercase text-sm hover:bg-retro-text"
              @click="showAccessDenied = false"
            >OK</button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Desktop shell -->
  <div class="flex flex-col h-screen w-screen overflow-hidden">

    <!-- ── Top nav bar ── -->
    <nav class="flex-none h-11 bg-window-bg border-b-4 border-header-dark flex items-center px-6 gap-10 z-50">
      <button
        v-for="link in navLinks"
        :key="link.path"
        class="font-['PixelifySans-Regular'] text-base uppercase tracking-wide text-retro-text/60 hover:text-retro-text"
        :class="{ 'text-retro-text underline underline-offset-2': route.path === link.path }"
        @click="router.push(link.path); wm.openWindow('main')"
      >{{ link.label }}</button>
    </nav>

    <!-- ── Desktop area ── -->
    <div class="flex-1 relative bg-desktop overflow-hidden">

      <!-- Desktop icons (left column) -->
      <DesktopIcon label="project_1" icon="/icons/folder.svg" window-id="project_1" :initial-x="24" :initial-y="24"  @open="wm.openWindow('project_1')" />
      <DesktopIcon label="project_2" icon="/icons/folder.svg" window-id="project_2" :initial-x="24" :initial-y="168" @open="wm.openWindow('project_2')" />
      <DesktopIcon label="project_3" icon="/icons/folder.svg" window-id="project_3" :initial-x="24" :initial-y="312" @open="wm.openWindow('project_3')" />
      <DesktopIcon label="song.mp3"  icon="/icons/mp3.svg"    window-id="song"      :initial-x="24" :initial-y="456" @open="wm.openWindow('song')" />
      <DesktopIcon
        label="System32 (don't delete!)"
        icon="/icons/folder.svg"
        :initial-x="24"
        :initial-y="600"
        @open="showAccessDenied = true"
        @dropped="handleSystem32Drop"
      />

      <!-- Windows -->
      <MainWindow />
      <MusicPlayer />
      <ProjectWindow
        v-for="proj in projects"
        :key="proj.id"
        :window-id="proj.id"
        :title="proj.title"
        :initial-x="proj.x"
        :initial-y="proj.y"
        :description="proj.description"
      />

      <!-- Trash (fixed, bottom-right, not draggable) -->
      <div ref="trashEl" class="absolute bottom-6 right-6 flex flex-col items-center cursor-default select-none">
        <img src="/icons/trash.svg" class="w-12 h-12" style="image-rendering: pixelated" alt="Trash" />
        <span class="font-['PixelOperator'] text-base text-retro-text mt-1">Trash</span>
      </div>

    </div>
  </div>

  <!-- CRT scanlines overlay -->
  <div class="scanlines" />
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.1s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.scanlines {
  position: fixed;
  inset: 0;
  z-index: 8998;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent        1px,
    transparent        2px,
    rgba(0, 0, 0, .2) 1px,
    rgba(0, 0, 0, .001) 3.0009px
  );
}
</style>
