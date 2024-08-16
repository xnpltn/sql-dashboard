<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useTableStore } from '@/stores/tables';
import Button from '@/components/ui/button/Button.vue';
import { onMounted, ref, watch } from 'vue';
import NewEntryModal from '@/components/modals/NewEntryModal.vue';
import NotFound from './NotFound.vue';
import DataTable from '@/components/DataTable.vue';
import type { Sheet } from '@/types/table';

const route = useRoute()
const showNewEntryModal = ref(false)
const tableStore = useTableStore()
const loading = ref(true)
let table: Sheet;
onMounted(async () => {
  table = (await tableStore.tablesDB).find((table) => table.id == route.params.id) as Sheet
  loading.value = false
  console.log(table)
})


watch(
  () => route.params.id,
  async (newId) => {
    table = (await tableStore.tablesDB).find((table) => table.id == newId) as Sheet
  }
)

</script>

<template>

  <div v-if="!loading" class="flex h-screen bg-gray-100 ml-80 max-w-[calc(100%-20rem)]">
    <main class="flex-1 p-6" v-if="!loading && table">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-semibold text-gray-700">Table</h1>
          <span class="mx-2 text-gray-500">/</span>
          <h2 class="text-2xl font-semibold text-gray-700">{{ table.name }}</h2>
        </div>
        <div class="flex space-x-2">
          <Button>
            Delete Table
          </Button>
          <Button @click="showNewEntryModal = true">
            + New Entry
          </Button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <div class="p-4">
          <input type="text" placeholder="Search term or filter like created > '2022-01-01'..."
            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <DataTable :table="table" />
        <div class="p-4">
          <Button @click="showNewEntryModal = true"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            + New Entry
          </Button>
        </div>
      </div>
      <NewEntryModal @closeEntryModal="showNewEntryModal = false" :table="table as Sheet"
        :showNewEntryModal="showNewEntryModal" />
    </main>
    <main v-else class="flex-1 p-6">
      <NotFound />
    </main>
  </div>
  <div v-else class="flex h-screen bg-gray-100 ml-80 max-w-[calc(100%-20rem)]">
    <div class="flex text-center justify-center items-center"></div>
  </div>

</template>
