<script setup>
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'

const route = useRoute()
const router = useRouter()

const navItems = [
  { label: 'HOME',    path: '/' },
  { label: 'ABOUT',   path: '/about' },
  { label: 'CONTACT', path: '/contact' },
  { label: 'FAQ',     path: '/faq' },
]
</script>

<template>
  <div class="px-10 py-12 flex flex-col items-center gap-8">
    <div class="flex flex-col items-center">
      <h1 class="font-['Alagard'] text-[7rem] text-retro-text leading-none">Ethan</h1>
      <div class="flex items-center gap-1 mt-4">
        <span class="text-retro-text font-['PixelifySans-Regular'] text-xl tracking-[0.32em]">— PORTFOLIO —</span>
      </div>
    </div>
    <div class="flex flex-col items-center gap-3 mt-2">
      <BaseButton
        v-for="item in navItems"
        :key="item.path"
        :label="item.label"
        :active="route.path === item.path"
        @click="router.push(item.path)"
      />
    </div>
  </div>
</template>
