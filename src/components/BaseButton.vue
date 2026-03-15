<script setup>
defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <button
    class="w-56 py-3 font-['PixelifySans-Regular'] uppercase text-xl tracking-wide border-2 border-accent transition-colors"
    :class="active
      ? 'bg-accent text-white'
      : 'bg-transparent text-accent hover:bg-accent hover:text-white'"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
