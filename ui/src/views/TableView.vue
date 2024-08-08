<script setup>
import { useRoute } from 'vue-router';
import { useTableStore } from '@/stores/tables';
const tableStore = useTableStore()
import Button from '@/components/ui/button/Button.vue';
import { ref, watch } from 'vue';
const route = useRoute()
import NewEntryModal from '@/components/collection/NewEntryModal.vue';
const showNewEntryModal = ref(false)

let table = tableStore.tables[route.params.id]


watch(
  () => route.params.id,
  (id, _,) => {
    table = tableStore.tables[parseInt(id)]
  }
)

</script>

<template>

  <div class="flex h-screen bg-gray-100 ml-80 max-w-[calc(100%-20rem)]">
    <main class="flex-1 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-semibold text-gray-700">Table</h1>
          <span class="mx-2 text-gray-500">/</span>
          <h2 class="text-2xl font-semibold text-gray-700">{{ table.name }}</h2>
        </div>
        <div class="flex space-x-2">

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
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-left">
              <th v-for="field in table.fields" :key="field.name" class="p-3 text-gray-600 font-medium">
                {{ field.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(index) in table.fields[0].data.length" :key="index">
              <td v-for="field in table.fields" :key="field.name" class="p-3 text-gray-500">
                {{ field.data[index] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="p-4">
          <Button @click="showNewEntryModal = true"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            + New Entry
          </Button>
        </div>
      </div>
    </main>
  </div>

  <NewEntryModal @closeEntryModal="showNewEntryModal = false" :table="table" :showNewEntryModal="showNewEntryModal" />
</template>
