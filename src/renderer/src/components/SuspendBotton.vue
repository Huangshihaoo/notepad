<template>
  <div class="suspend-botton">
    <div class="btn" title="预览" @click="f1">
      <template v-if="!props.onlyPreview">
        <img v-show="props.preview" src="../assets/icon/preview-close.svg" alt="" />
        <img v-show="!props.preview" src="../assets/icon/preview-open.svg" alt="" />
      </template>
    </div>
    <div class="btn" title="全屏展示" @click="f3">
      <template v-if="!props.onlyPreview">
        <img v-show="props.pageFullscreen" src="../assets/icon/off-screen.svg" alt="" />
        <img v-show="!props.pageFullscreen" src="../assets/icon/full-screen.svg" alt="" />
      </template>
    </div>
    <div class="btn" title="仅预览" @click="f4">
      <img src="../assets/icon/only-preview.svg" alt="" />
    </div>
    <div class="btn" title="看大纲" @click="f2">
      <template v-if="!props.pageFullscreen">
        <img
          v-show="props.preview || props.onlyPreview"
          src="../assets/icon/mindmap-list.svg"
          alt=""
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    previewCatalog: boolean
    preview: boolean
    pageFullscreen: boolean
    onlyPreview: boolean
  }>(),
  {
    previewCatalog: false,
    preview: false,
    pageFullscreen: false,
    onlyPreview: false
  }
)

const emits = defineEmits<{
  (e: 'update:previewCatalog', value: boolean): void
  (e: 'update:preview', value: boolean): void
  (e: 'update:pageFullscreen', value: boolean): void
  (e: 'update:onlyPreview', value: boolean): void
}>()

const f1 = (): void => {
  emits('update:preview', !props.preview)
}
const f2 = (): void => {
  emits('update:previewCatalog', !props.previewCatalog)
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
    display: flex;

    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    // border: 1px solid #333;
    margin-bottom: 10px;
    font-size: 14px;
    border-radius: 15px;
    cursor: pointer;
  }
}
</style>
