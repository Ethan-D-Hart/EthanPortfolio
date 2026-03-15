import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: '/', component: HomeView },
//     { path: '/about', component: () => import('../views/AboutView.vue') },
//     { path: '/contact', component: () => import('../views/ContactView.vue') },
//     { path: '/faq', component: () => import('../views/FaqView.vue') },
//   ],
// })



// export default router

export default {
  async fetch(request, env) {
    // This tells the worker to look for the file in your 'dist' folder
    return env.ASSETS.fetch(request);
  },
};
