<script setup lang="ts">

import Button from './ui/button/Button.vue';
import { RouterLink } from 'vue-router';
import { useTableStore } from '@/stores/tables';
import { ref, watch } from 'vue';


const tableStore = useTableStore()
const searchValue = ref("")
watch(searchValue, async (newValue) => {
  console.log(newValue)
  tableStore.tables = tableStore.searchFilter(newValue.trim())
})

</script>

<template>

  <aside class="w-80 fixed h-screen bg-white border-r border-gray-200 p-4">
    <div class="mb-4">
      <input type="text" v-model="searchValue" placeholder="Search tables..."
        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <nav>
      <div class="flex items-center flex-col">
        <RouterLink :to="`/table/` + table.id" v-for="(table, index) in tableStore.tables" :key="index"
          class="mb-2  bg-gray-200 rounded w-full text-center cursor-pointer px-3 py-2 hover:bg-gray-300 capitalize">
          {{ table.name }}
        </RouterLink>
      </div>
    </nav>
    <Button @click="$emit('openModal')" class="w-full bg-gray-50 hover:bg-gray-200 text-black border-black border-2">+
      New
      Table</Button>
  </aside>

</template>
