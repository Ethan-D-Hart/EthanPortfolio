<script setup>
import { ref } from 'vue'

const props = defineProps({
  label:    { type: String, required: true },
  icon:     { type: String, required: true },
  windowId: { type: String, default: '' },
  initialX: { type: Number, default: 0 },
  initialY: { type: Number, default: 0 },
})

const emit = defineEmits(['open', 'dropped'])

const snap = (v) => Math.round(v / 16) * 16

const x = ref(snap(props.initialX))
const y = ref(snap(props.initialY))
const selected = ref(false)

let dragStarted = false
let startMX = 0, startMY = 0, startWX = 0, startWY = 0

const onMouseDown = (e) => {
  if (e.button !== 0) return
  e.preventDefault()
  selected.value = true
  dragStarted = false
  startMX = e.clientX
  startMY = e.clientY
  startWX = x.value
  startWY = y.value
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e) => {
  const dx = e.clientX - startMX
  const dy = e.clientY - startMY
  if (!dragStarted && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
    dragStarted = true
  }
  if (dragStarted) {
    x.value = snap(startWX + dx)
    y.value = snap(startWY + dy)
  }
}

const onMouseUp = (e) => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  if (dragStarted) {
    emit('dropped', { x: x.value, y: y.value, clientX: e.clientX, clientY: e.clientY })
  }
  dragStarted = false
  selected.value = false
}

const onDblClick = () => {
  emit('open')
}
</script>

<template>
  <div
    class="absolute flex flex-col items-center cursor-pointer select-none"
    :style="{ left: x + 'px', top: y + 'px' }"
    @mousedown.prevent="onMouseDown"
    @dblclick="onDblClick"
    @click.self="selected = true"
  >
    <div
      class="p-1 w-14 h-14 flex items-center justify-center"
      :class="selected ? 'brightness-75' : ''"
    >
      <img :src="icon" class="w-11 h-11" style="image-rendering: pixelated" :alt="label" draggable="false" />
    </div>
    <span
      class="font-['PixelifySans-Regular'] text-base text-center mt-1 max-w-[132px] break-words leading-tight px-1 select-none text-retro-text"
    >{{ label }}</span>
  </div>
</template>
