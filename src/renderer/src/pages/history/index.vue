<script lang="ts" setup>
const str = 'history'
</script>

<template>
  <div class="str">{{ str }}</div>
  <RouterLink to="/home">home</RouterLink>
</template>

<style>
.str {
  font-size: 30px;
}
</style>
