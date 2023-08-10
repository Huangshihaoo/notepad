import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/home/index.vue'
import History from '../pages/history/index.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/history', component: History }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
})

export default router
