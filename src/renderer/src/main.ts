import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Router from './router/index'

createApp(App).use(createPinia()).use(Router).mount('#app')
