<template>
  <div class="suspend-botton">
    <div class="btn" @click="f1">{{ props.expand ? '不预览' : '预览' }}</div>
    <div class="btn" @click="f3">{{ props.expand ? '非全屏' : '全屏' }}</div>
    <div class="btn" @click="f4">{{ props.expand ? '书写' : '仅预览' }}</div>
    <div v-show="props.expand" class="btn" @click="f2">
      {{ props.preview ? '不看大纲' : '看大纲' }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    preview: boolean
    expand: boolean
    pageFullscreen: boolean
    onlyPreview: boolean
  }>(),
  {
    preview: false,
    expand: false,
    pageFullscreen: false,
    onlyPreview: false
  }
)

const emits = defineEmits<{
  (e: 'update:preview', value: boolean): void
  (e: 'update:expand', value: boolean): void
  (e: 'update:pageFullscreen', value: boolean): void
  (e: 'update:onlyPreview', value: boolean): void
}>()

const f1 = (): void => {
  emits('update:expand', !props.expand)
}
const f2 = (): void => {
  emits('update:preview', !props.preview)
}
const f3 = (): void => {
  emits('update:pageFullscreen', !props.pageFullscreen)
}
const f4 = (): void => {
  emits('update:onlyPreview', !props.onlyPreview)
}
</script>

<style lang="less" scoped>
.suspend-botton {
  position: fixed;
  // background-color: aqua;
  bottom: 100px;
  right: 50px;
  z-index: 10000;
  .btn {
    width: 60px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #333;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
