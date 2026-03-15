<script setup>
import { ref, computed, inject } from 'vue'

const props = defineProps({
  title:         { type: String,  default: 'Window' },
  initialX:      { type: Number,  default: 80 },
  initialY:      { type: Number,  default: 48 },
  windowId:      { type: String,  default: '' },
  zIndex:        { type: Number,  default: 100 },
  initialWidth:  { type: Number,  default: null },
  initialHeight: { type: Number,  default: null },
  minWidth:      { type: Number,  default: 100 },
  minHeight:     { type: Number,  default: 80 },
  resizable:     { type: Boolean, default: false },
})

defineEmits(['close', 'minimize'])

const wm = inject('windowManager', null)

const snap = (v) => Math.round(v / 16) * 16

const x      = ref(snap(props.initialX))
const y      = ref(snap(props.initialY))
const width  = ref(props.initialWidth  != null ? snap(props.initialWidth)  : null)
const height = ref(props.initialHeight != null ? snap(props.initialHeight) : null)

// Ref to the root element so we can read its rendered size on resize start
const containerRef = ref(null)

// ── Drag ──────────────────────────────────────────────────────────────────
let dragging = false
let startMX = 0, startMY = 0, startWX = 0, startWY = 0

const onTitleMouseDown = (e) => {
  if (e.button !== 0) return
  dragging = true
  startMX = e.clientX; startMY = e.clientY
  startWX = x.value;   startWY = y.value
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup',   onMouseUp)
}

const onMouseMove = (e) => {
  if (!dragging) return
  x.value = snap(startWX + (e.clientX - startMX))
  y.value = snap(startWY + (e.clientY - startMY))
}

const onMouseUp = () => {
  dragging = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup',   onMouseUp)
}

// ── Resize ────────────────────────────────────────────────────────────────
let resizing = false
let resizeDir = ''
let rStartMX = 0, rStartMY = 0, rStartW = 0, rStartH = 0

const onResizeMouseDown = (e, dir) => {
  if (e.button !== 0) return
  resizing  = true
  resizeDir = dir
  rStartMX  = e.clientX
  rStartMY  = e.clientY
  // Capture current rendered size (handles the auto-sized case where width/height are null)
  rStartW   = containerRef.value?.offsetWidth  ?? (width.value  ?? 0)
  rStartH   = containerRef.value?.offsetHeight ?? (height.value ?? 0)
  window.addEventListener('mousemove', onResizeMouseMove)
  window.addEventListener('mouseup',   onResizeMouseUp)
}

const onResizeMouseMove = (e) => {
  if (!resizing) return
  const dx = e.clientX - rStartMX
  const dy = e.clientY - rStartMY
  if (resizeDir === 'right'  || resizeDir === 'corner')
    width.value  = Math.max(props.minWidth,  snap(rStartW + dx))
  if (resizeDir === 'bottom' || resizeDir === 'corner')
    height.value = Math.max(props.minHeight, snap(rStartH + dy))
}

const onResizeMouseUp = () => {
  resizing = false
  window.removeEventListener('mousemove', onResizeMouseMove)
  window.removeEventListener('mouseup',   onResizeMouseUp)
}

const focus = () => {
  if (wm && props.windowId) wm.focusWindow(props.windowId)
}

// ── Computed styles ───────────────────────────────────────────────────────
const hasHeight = computed(() => height.value != null)

const outerStyle = computed(() => {
  const s = { left: x.value + 'px', top: y.value + 'px', zIndex: props.zIndex }
  if (width.value  != null) s.width  = width.value  + 'px'
  if (height.value != null) { s.height = height.value + 'px'; s.display = 'flex'; s.flexDirection = 'column' }
  return s
})
</script>

<template>
  <div
    ref="containerRef"
    class="absolute select-none"
    :style="outerStyle"
    @mousedown="focus"
  >
    <!-- Outer border -->
    <div class="border-2 border-header-dark" :class="{ 'flex flex-col flex-1 min-h-0': hasHeight }">
      <!-- Dither inner border -->
      <div class="border border-header-dark bg-dither p-px" :class="{ 'flex flex-col flex-1 min-h-0': hasHeight }">
        <!-- Title bar -->
        <div
          class="flex items-center justify-between bg-header-dark text-white px-3 py-1 cursor-grab active:cursor-grabbing select-none"
          @mousedown.stop="onTitleMouseDown"
        >
          <!-- left decorative lines -->
          <div class="flex flex-col justify-center gap-px w-7 shrink-0 mr-2">
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
          </div>
          <span class="font-['PixelifySans-Regular'] text-base uppercase tracking-wide leading-6 shrink-0">{{ title }}</span>
          <!-- right decorative lines (fills remaining space) -->
          <div class="flex flex-col justify-center gap-px flex-1 mx-2">
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
            <div class="h-px bg-white/70"></div>
          </div>
          <div class="flex gap-1">
            <button
              class="w-5 h-5 border border-white/60 text-sm flex items-center justify-center hover:bg-white hover:text-header-dark leading-none"
              @click.stop="$emit('minimize')"
            >−</button>
            <button
              class="w-5 h-5 border border-white/60 text-sm flex items-center justify-center hover:bg-white hover:text-header-dark leading-none"
            >□</button>
            <button
              class="w-5 h-5 border border-white/60 text-sm flex items-center justify-center hover:bg-white hover:text-header-dark leading-none"
              @click.stop="$emit('close')"
            >×</button>
          </div>
        </div>
        <!-- Content area -->
        <div
          class="bg-window-bg window-content"
          :class="{ 'flex-1 min-h-0 overflow-auto': hasHeight, 'overflow-auto': resizable && !hasHeight }"
        >
          <slot />
        </div>
      </div>
    </div>

    <!-- Resize handles (opt-in via resizable prop) -->
    <template v-if="resizable">
      <!-- Right edge -->
      <div
        class="absolute top-0 right-0 w-2 h-full cursor-ew-resize"
        @mousedown.stop="e => onResizeMouseDown(e, 'right')"
      />
      <!-- Bottom edge -->
      <div
        class="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
        @mousedown.stop="e => onResizeMouseDown(e, 'bottom')"
      />
      <!-- Bottom-right corner (takes priority over the two edges above) -->
      <div
        class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
        @mousedown.stop="e => onResizeMouseDown(e, 'corner')"
      />
    </template>
    <!-- Overlay slot: absolute relative to the window container -->
    <slot name="overlay" />
  </div>
</template>
