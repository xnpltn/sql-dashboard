<script setup>
import Button from '../ui/button/Button.vue';
import { ref } from "vue"
import { useTableStore } from '@/stores/tables';
const tableStore = useTableStore()
const props = defineProps({
  showNewTableModal: Boolean
})

let newTableName = ref("")


</script>

<template>

  <div v-if="showNewTableModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-1/3 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">New collection</h2>
        <Button @click="$emit('closeModal')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input v-model="newTableName" type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="flex justify-between items-center mb-4">
        <span class="text-sm font-medium text-gray-700">Type:</span>
        <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Base</option>
        </select>
      </div>
      <div class="mb-4">
        <div class="text-sm text-gray-500 mb-2">System fields: id, created, updated</div>
        <Button
          class="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100">
          + New field
        </Button>
      </div>
      <div class="mb-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Unique constraints and indexes (0)</h3>
        <button
          class="bg-white text-gray-700 text-sm py-1 px-3 border border-gray-300 rounded shadow hover:bg-gray-100">
          + New index
        </button>
      </div>
      <div class="flex justify-end space-x-2">
        <Button @click="$emit('closeModal')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Cancel
        </Button>
        <Button @click='tableStore.addTable({ name: newTableName, id: tableStore.tables.length })'
          class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create
        </Button>
      </div>
    </div>
  </div>
</template>
