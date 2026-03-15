<script setup>
import { ref, computed, inject } from 'vue'
import BaseWindow from './BaseWindow.vue'
import BaseButton from './BaseButton.vue'

const wm = inject('windowManager')
const winData = computed(() => wm.windows.find(w => w.id === 'song'))

const audio = ref(null)
const playing = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const toggle = () => {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
  playing.value = !playing.value
}

const onTimeUpdate = () => {
  currentTime.value = audio.value?.currentTime ?? 0
}

const onLoadedMetadata = () => {
  duration.value = audio.value?.duration ?? 0
}

const onEnded = () => {
  playing.value = false
}

const fmt = (s) => {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}
</script>

<template>
  <BaseWindow
    v-if="winData?.visible && !winData?.minimized"
    window-id="song"
    title="SONG.MP3"
    :initial-x="400"
    :initial-y="80"
    :z-index="winData?.zIndex ?? 99"
    @close="wm.closeWindow('song')"
    @minimize="wm.toggleMinimize('song')"
  >
    <audio
      ref="audio"
      src="/audio/song.mp3"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    />
    <div class="p-4 flex flex-col items-center gap-3 w-56">
      <span class="font-['PixelifySans-Regular'] text-sm text-retro-text">♪ song.mp3</span>
      <!-- Progress bar -->
      <div class="w-full h-2 bg-gray-200 border border-gray-300 cursor-pointer">
        <div
          class="h-full bg-accent transition-all"
          :style="{ width: duration ? (currentTime / duration * 100) + '%' : '0%' }"
        />
      </div>
      <span class="font-['PixelifySans-Regular'] text-xs text-gray-400">
        {{ fmt(currentTime) }} / {{ fmt(duration) }}
      </span>
      <BaseButton
        :label="playing ? 'PAUSE' : 'PLAY'"
        :active="playing"
        @click="toggle"
      />
    </div>
  </BaseWindow>
</template>
