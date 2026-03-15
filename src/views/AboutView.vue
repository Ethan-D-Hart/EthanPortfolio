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
  <div class="px-8 py-10 flex flex-col gap-6">
    <div>
      <h2 class="font-['PixelifySans-Regular'] text-3xl uppercase text-accent tracking-widest">About.txt</h2>
      <div class="mt-6 space-y-4 font-['PixelifySans-Regular'] text-xl text-retro-text leading-relaxed">
        <p>Hi! I'm Ethan — a developer and creator.</p>
        <p>I build things for the web and beyond.</p>
        <p class="text-gray-400 text-lg">[ More content coming soon ]</p>
      </div>
    </div>
  </div>
</template>
