<script setup lang="ts">

import Button from './ui/button/Button.vue';
import { RouterLink } from 'vue-router';
import { useTableStore } from '@/stores/tables';
import { onMounted, ref, watchEffect } from 'vue';
import type { Sheet } from '@/types/table';
import type { Ref } from "vue"
import { toast } from './ui/toast';


const tableStore = useTableStore()
const searchValue = ref("")

const loading = ref(true)
const tables: Ref<Sheet[]> = ref([])
let intervalId: number | null = null;

function fetchTables() {
  tableStore.tablesDB().then(() => {
    tables.value = tableStore.tables;
    loading.value = false;

    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }).catch(() => {
    loading.value = true;
    toast({ title: "Error", description: "Error Connecting to the Server", variant: "destructive" })
  });
}

onMounted(() => {
  fetchTables(); // Initial fetch
  intervalId = setInterval(fetchTables, 10000);
});



watchEffect(() => {
  tableStore.tables = tableStore.searchFilter(searchValue.value.trim())
})
watchEffect(() =>
  tables.value = tableStore.tables
);

</script>

<template>
  <aside class="w-80 fixed h-screen bg-white border-r border-gray-200 p-4">
    <div class="mb-4">
      <input type="text" v-model="searchValue" placeholder="Search tables..."
        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <nav v-if="!loading">
      <div class="flex items-center flex-col" v-if="tables.length">
        <RouterLink :to="`/table/` + table.id" v-for="(table) in tables" :key="table.id"
          class="mb-2  bg-gray-200 rounded w-full text-center cursor-pointer px-3 py-2 hover:bg-gray-300 capitalize">
          {{ table.name }}
        </RouterLink>
      </div>
      <div v-else class=" mb-3 flex rounded bg-gray-300 w-full flex-col items-center gap-3 justify-center">
        <h3 class="text-2xl text-center"> No Tables</h3>
      </div>
    </nav>
    <nav v-else>
      <div class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
    </nav>
    <Button @click="$emit('openModal')"
      class=" mt-3 w-full bg-gray-50 hover:bg-gray-200 text-black border-black border-2">+
      NewTable
    </Button>
  </aside>

</template>
