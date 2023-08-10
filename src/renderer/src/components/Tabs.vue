<script setup lang="ts">
import { inject } from 'vue'
import { Note } from '@renderer/types/mainTypes'
import closeIcon from '../assets/icon/close-square.svg'
const props = defineProps<{
  tabs: Note[]
  modelValue: number | undefined
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', id: number)
}>()

const mainStore = inject<{ changeNoteStateById(id: number, show: boolean): void }>('mainStore')
</script>

<template>
  <div class="tabs">
    <div
      v-for="tab in props.tabs"
      :key="tab.title"
      :class="['tab', { active: tab.id === modelValue }]"
      @click="emits('update:modelValue', tab.id)"
    >
      <div class="title">{{ tab.title }}</div>
      <div class="close" @click="mainStore?.changeNoteStateById(tab.id, false)">
        <img :src="closeIcon" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tabs {
  display: flex;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  background-color: #dee1e6;
  border-bottom: 4px solid #fff;
}

.tab {
  position: relative;
  width: 120px;
  display: flex;
  padding: 0 10px;
  border-radius: 4px 4px 0 0;
  .title {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .close {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
  }
}

.tab.active {
  background-color: #fff;
}
</style>
