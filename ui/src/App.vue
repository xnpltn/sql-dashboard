<script setup>
import Toaster from "./components/ui/toast/Toaster.vue";
import Aside from "./components/Aside.vue";
import NewTableModal from "./components/collection/NewTableModal.vue";
import { ref } from "vue";
import { provide } from 'vue'
import { RouterView } from "vue-router";
let showNewTableModal = ref(false)
provide("showNewTableModal", showNewTableModal)


</script>

<template>
  <Aside @openModal="showNewTableModal = true"></Aside>

  <NewTableModal :showNewTableModal="showNewTableModal" @closeModal="showNewTableModal = false"
    @addTable="(n) => addToTable(n)"></NewTableModal>
  <RouterView />

  <Toaster />
</template>

<style scoped></style>
