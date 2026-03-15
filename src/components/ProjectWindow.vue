<script setup>
import { computed, inject } from 'vue'
import BaseWindow from './BaseWindow.vue'

const props = defineProps({
  windowId:    { type: String, required: true },
  title:       { type: String, required: true },
  initialX:    { type: Number, default: 250 },
  initialY:    { type: Number, default: 80 },
  description: { type: String, default: 'Project description coming soon.' },
  link:        { type: String, default: '' },
})

const wm = inject('windowManager')
const winData = computed(() => wm.windows.find(w => w.id === props.windowId))
</script>

<template>
  <BaseWindow
    v-if="winData?.visible && !winData?.minimized"
    :window-id="windowId"
    :title="title"
    :initial-x="initialX"
    :initial-y="initialY"
    :z-index="winData?.zIndex ?? 98"
    @close="wm.closeWindow(windowId)"
    @minimize="wm.toggleMinimize(windowId)"
  >
    <div class="p-4 w-64 font-['PixelifySans-Regular'] space-y-3">
      <h2 class="text-accent text-sm uppercase tracking-widest border-b border-gray-200 pb-2">
        {{ title }}
      </h2>
      <p class="text-xs text-retro-text leading-relaxed">{{ description }}</p>
      <a
        v-if="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block text-xs text-accent underline hover:text-retro-text"
      >→ View Project</a>
      <p v-else class="text-xs text-gray-400">[ Link coming soon ]</p>
    </div>
  </BaseWindow>
</template>
