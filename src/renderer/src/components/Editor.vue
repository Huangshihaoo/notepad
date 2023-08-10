<template>
  <div
    id="editor"
    ref="contentRef"
    class="editor"
    contenteditable
    :spellcheck="false"
    @compositionend="input"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.enter.prevent="handleEnter"
  ></div>
  <ToolBar v-show="editorFocus" v-model="currentIcon"></ToolBar>
</template>

<script setup lang="ts">
import ToolBar from '@renderer/components/ToolBar.vue'
import { insertHtmlAtCursor } from '@renderer/utils'
import { computed, ref, watch } from 'vue'

const contentRef = ref<HTMLDivElement>()

const props = defineProps<{
  modelValue: string | undefined
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

const editorFocus = ref<boolean>(false)

const currentIcon = ref<string>('')

const content = computed({
  get: () => props.modelValue,
  set: (value) => {
    emits('update:modelValue', value)
  }
})

watch(content, (newVal) => {
  if (contentRef.value) {
    contentRef.value.innerHTML = newVal!
  }
})

const handleEnter = (event): void => {
  console.log(event)

  console.log(currentIcon.value)
  insertHtmlAtCursor()
}

const input = (event): void => {
  console.log(event.target.innerHTML)
}

function onBlur(event): void {
  content.value = event.target.innerHTML
}

function onFocus(): void {
  editorFocus.value = true
}
// 控制工具栏的隐藏
window.electron.ipcRenderer.on('appBlur', () => {
  editorFocus.value = false
})
</script>

<style lang="less" scoped>
.editor {
  font-family: Fira Code;
  outline: none;
  line-height: 1.3;
  padding: 10px 10px 0;
  margin-bottom: 50px;
  &:empty::before {
    content: '请输入...';
    color: #c3c3c3;
  }
}
</style>
