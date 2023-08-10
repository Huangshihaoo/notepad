<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const currentIcon = computed({
  get: () => props.modelValue,
  set: (newVal) => {
    emits('update:modelValue', newVal)
  }
})

const getImg = (url: string): string => {
  return new URL(url, import.meta.url).href
}

const icons = ['bold', 'italic', 'underline', 'strikethrough', 'list', 'checkbox', 'picture']
</script>

<template>
  <div class="tool-bar">
    <div
      v-for="icon in icons"
      :key="icon"
      :class="['icon', currentIcon === icon ? 'actived' : null]"
      @click="currentIcon = icon"
    >
      <img :src="getImg(`../assets/icon/${icon}.svg`)" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.tool-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  .icon {
    &.actived {
      background-color: #c3c3;
    }
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
