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

const faqs = [
  { q: 'What do you do?',             a: 'I build web apps and creative projects.' },
  { q: 'Are you available to hire?',  a: 'Yes! Reach out via the Contact page.' },
  { q: 'What stack do you use?',      a: 'Vue, TypeScript, Tailwind, and more.' },
]
</script>

<template>
  <div class="px-8 py-10 flex flex-col gap-6">
    <div>
      <h2 class="font-['PixelifySans-Regular'] text-3xl uppercase text-accent tracking-widest">FAQ.txt</h2>
      <div class="mt-6 space-y-6">
        <div v-for="faq in faqs" :key="faq.q" class="font-['PixelifySans-Regular'] text-xl">
          <p class="text-retro-text">Q: {{ faq.q }}</p>
          <p class="text-gray-500 mt-2 text-lg">A: {{ faq.a }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
