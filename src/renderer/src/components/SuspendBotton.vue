<template>
  <div @click="emits('modelExpand')"> {{ props.modelExpand ? '111': '222' }} </div>
  <div @click="emits('modelPreview')"> {{ props.modelPreview ? '333': '444' }} </div>
  <div></div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelPreview: boolean
    modelExpand: boolean
  }>(),
  {
    modelPreview: false,
    modelExpand: false
  }
)

const emits = defineEmits<{
  (e: 'modelPreview') :void
  (e: 'modelExpand') :void
}>()
</script>
