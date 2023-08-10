<script setup lang="ts">
import { ref } from 'vue'
import AddNote from './components/AddNote.vue'
import { useRouter } from 'vue-router'
import 'md-editor-v3/lib/style.css'

const router = useRouter()
const showAddNote = ref(false)
window.electron.ipcRenderer.on('jump', (__, href) => {
  router.push(href)
})
window.electron.ipcRenderer.on('addNote', () => {
  showAddNote.value = !showAddNote.value
})
</script>

<template>
  <AddNote v-if="showAddNote" v-model="showAddNote" />
  <router-view />
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
