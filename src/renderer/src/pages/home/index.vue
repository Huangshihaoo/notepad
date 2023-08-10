<script lang="ts" setup>
import { watch, onMounted, ref, provide } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@renderer/store'
import Tabs from '@renderer/components/Tabs.vue'
// import Editor from '@renderer/components/Editor.vue'
import { Note } from '@renderer/types/mainTypes'
import { MdEditor } from 'md-editor-v3'

// TODO: 主题切换
// TODO: 页内全屏 pageFullscreen
// TODO: 是否预览 preview

const mainStore = useMainStore()
// const editorRef = ref<InstanceType<typeof Editor>>()
const currentNoteId = ref<number>() // 当前便签索引
const { mainNotes } = storeToRefs(mainStore) // 可显示在首页的便签

const currentNote = ref<Note | undefined>()
watch(currentNoteId, () => {
  if (currentNoteId.value) {
    currentNote.value = mainStore.currentNote(currentNoteId.value)
  }
})

watch(mainNotes, () => {
  if (!currentNoteId.value) {
    currentNoteId.value = mainNotes.value[0]?.id
  }
})

onMounted(() => {
  currentNoteId.value = mainNotes.value[0]?.id
})

// 透传方法
provide('mainStore', {
  changeNoteStateById: mainStore.changeNoteStateById
})
</script>

<template>
  <main class="main">
    <template v-if="mainNotes.length">
      <Tabs v-model="currentNoteId" :tabs="mainNotes" />
    </template>
    <template v-if="currentNote">
      <!-- <Editor ref="editorRef" v-model="currentNote.content" /> -->
      <MdEditor
        v-model="currentNote.content"
        :show-code-row-number="true"
        :preview="true"
        preview-theme="cyanosis"
        placeholder="记点什么"
        :toolbars="[]"
      />
      <!-- html-preview -->
      <!-- :model-value="currentNote.content" -->
      <!-- preview-theme="cyanosis" -->
    </template>
  </main>
</template>

<style scoped lang="less">
// .main {
//   margin-bottom: 40px;
// }
</style>
