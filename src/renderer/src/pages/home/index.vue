<script lang="ts" setup>
import { watch, onMounted, ref, provide } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@renderer/store'
import Tabs from '@renderer/components/Tabs.vue'
import { Note } from '@renderer/types/mainTypes'
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-v3'
import type { ExposeParam } from 'md-editor-v3'
import SuspendBotton from '../../components/SuspendBotton.vue'

// TODO: 页内全屏 pageFullscreen
// TODO: 是否预览 preview
const pageFullscreen = ref(false) // 是否页内全屏
const preview = ref(false) // 是否边写边看
const previewCatalog = ref(false) // 是否查看大纲
const onlyPreview = ref(false) // 是否只预览
const editorRef = ref<ExposeParam>()

const mainStore = useMainStore()
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

watch(preview, (value) => {
  editorRef.value?.togglePreview(value)
})
watch(pageFullscreen, () => {
  editorRef.value?.togglePageFullscreen()
})
const scrollElement = document.documentElement

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
      <div style="display: flex">
        <div style="flex: 70%">
          <MdEditor
            v-show="!onlyPreview"
            ref="editorRef"
            v-model="currentNote.content"
            style="height: 90vh"
            :show-code-row-number="true"
            preview-theme="cyanosis"
            placeholder="记点什么"
            :toolbars="[]"
            :preview="false"
            editor-id="mdeditor"
          />
          <MdPreview v-show="onlyPreview" v-model="currentNote.content" />
        </div>
        <div
          v-show="(preview && previewCatalog) || (onlyPreview && previewCatalog)"
          style="flex: 30%"
        >
          <MdCatalog style="height: 90vh" editor-id="mdeditor" :scroll-element="scrollElement" />
        </div>
      </div>
      <!-- <button @click="preview = !preview">111</button>
      <button @click="previewCatalog = !previewCatalog">222</button> -->
      <!--  -->
      <!-- html-preview -->
      <!-- :preview="preview" -->
      <!-- :page-fullscreen="pageFullscreen" -->
      <!-- :model-value="currentNote.content" -->
      <!-- preview-theme="cyanosis" -->
      <SuspendBotton
        v-model:preview="preview"
        v-model:preview-catalog="previewCatalog"
        v-model:pageFullscreen="pageFullscreen"
        v-model:only-preview="onlyPreview"
      />
    </template>
    <template v-else>
      <div class="empyt">
        <img src="../../assets/icon/empty.svg" alt="" />
        <div>暂无内容~</div>
      </div>
    </template>
  </main>
</template>

<style scoped lang="less">
// .main {
//   margin-bottom: 40px;
// }
.empyt {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  transform: translateY(150px);
  text-align: center;
  color: #666;
  font-size: 14px;
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
