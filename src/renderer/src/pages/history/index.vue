<script lang="ts" setup>
import useMainStore from '@renderer/store'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { notes } = storeToRefs(mainStore)
</script>

<template>
  <RouterLink to="/home">home</RouterLink>
  <ul class="list">
    <li v-for="(note, index) in notes" :key="note.id" class="item">
      <span>序号：{{ index + 1 }}</span>
      <span>标题：{{ note.title }}</span>
      <span>{{ note.show ? '展示' : '不展示' }}</span>
      <span>{{ new Date(note.createTime) }}</span>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.list {
  padding: 0 20px;
  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
