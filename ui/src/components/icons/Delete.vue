<script setup lang="ts">
defineProps<{ height: number, width: number }>()
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18"></path>
    <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6"></path>
    <path d="M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"></path>
  </svg>
</template>
