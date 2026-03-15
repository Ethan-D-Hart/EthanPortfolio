<script setup>
import { ref, onMounted } from 'vue'

const countdown = ref(10)

onMounted(() => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(interval)
      window.location.reload()
    }
  }, 1000)
})
</script>

<template>
  <div class="fixed inset-0 bg-header-dark z-[9999] flex flex-col items-start justify-center p-16 font-['PixelifySans-Regular'] cursor-default select-none">
    <div class="text-white space-y-4 max-w-2xl">
      <div class="bg-white text-header-dark px-4 py-1 inline-block text-lg mb-4">
        FATAL EXCEPTION
      </div>
      <p class="text-lg leading-relaxed">
        A fatal exception 0E has occurred at 0028:C003B32.<br>
        The current application will be terminated.
      </p>
      <br />
      <p>* Press any key to terminate the current application.</p>
      <p>* Press CTRL+ALT+DEL to restart your computer. You will</p>
      <p>&nbsp;&nbsp;lose any unsaved information in all applications.</p>
      <br />
      <p class="text-yellow-300">WARNING: Attempt to delete SYSTEM32 detected.</p>
      <p class="text-yellow-300">Critical system files may have been compromised.</p>
      <br />
      <p>Press any key to continue <span class="animate-pulse">_</span></p>
      <p class="text-gray-400 text-sm mt-4">System reloading in {{ countdown }}s...</p>
    </div>
  </div>
</template>
