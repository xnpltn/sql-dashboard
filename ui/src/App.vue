<script setup lang="ts">
import Toaster from "./components/ui/toast/Toaster.vue";
import AsidePanel from "@/components/AsidePanel.vue"
import NewTableModal from "./components/modals/NewTableModal.vue";
import { ref } from "vue";
import { provide } from 'vue'
import { RouterView } from "vue-router";
const showNewTableModal = ref(false)
provide("showNewTableModal", showNewTableModal)


</script>

<template>
  <AsidePanel @openModal="showNewTableModal = true" />

  <NewTableModal :showNewTableModal="showNewTableModal" @closeModal="showNewTableModal = false" />

  <RouterView />

  <Toaster />
</template>

<style scoped></style>
