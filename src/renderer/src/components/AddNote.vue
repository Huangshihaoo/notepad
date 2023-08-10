<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import useMainStore from '../store/index'

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const mainStore = useMainStore()
const inputRef = ref<HTMLInputElement>()

const noteTitle = ref('')
const submit = (): void => {
  mainStore.addNote(noteTitle.value)
  noteTitle.value = ''
  emits('update:modelValue', false)
  console.log(mainStore.notes)
}

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <div class="mask">
    <div class="input">
      <input
        ref="inputRef"
        v-model="noteTitle"
        type="text"
        placeholder="请输入便签主题"
        @keydown.enter="submit"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  .input {
    height: 38px;
    background-color: #fff;
    width: 300px;
    margin: 20px auto 0;
    border-radius: 4px;
    border: 2px solid #cdd1d3;
    padding: 0 10px;
    input {
      width: 100%;
      height: 100%;
      font-size: 18px;
      display: inline-block;
      border: none;
    }
  }
}
</style>
