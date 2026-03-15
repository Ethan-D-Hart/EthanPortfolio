<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import BaseWindow from './BaseWindow.vue'

const wm = inject('windowManager')
const route = useRoute()

// ── Single source of truth for MainWindow dimensions ──────────────────────
const INITIAL_WIDTH = 816
const MIN_WIDTH     = 420
const MIN_HEIGHT    = 320

const titleMap = {
  '/':        'HOME.VUE',
  '/about':   'ABOUT.VUE',
  '/contact': 'CONTACT.VUE',
  '/faq':     'FAQ.VUE',
}

const title   = computed(() => titleMap[route.path] ?? 'HOME.VUE')
const winData = computed(() => wm.windows.find(w => w.id === 'main'))
</script>

<template>
  <BaseWindow
    v-if="winData?.visible && !winData?.minimized"
    window-id="main"
    :title="title"
    :initial-x="256"
    :initial-y="64"
    :z-index="winData?.zIndex ?? 100"
    :initial-width="INITIAL_WIDTH"
    :min-width="MIN_WIDTH"
    :min-height="MIN_HEIGHT"
    :resizable="true"
    @close="wm.closeWindow('main')"
    @minimize="wm.toggleMinimize('main')"
  >
    <router-view />
    <template #overlay>
      <span class="absolute bottom-3 right-5 font-['PixelifySans-Regular'] text-xs text-gray-400 select-none pointer-events-none z-10">
        v.0.3.1
      </span>
    </template>
  </BaseWindow>
</template>
