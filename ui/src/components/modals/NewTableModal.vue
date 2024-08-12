<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { type Title, DataType, type Sheet } from '@/types/table';
import type { Ref } from 'vue';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ref } from "vue"
import { useTableStore } from '@/stores/tables';

defineProps<{ showNewTableModal: Boolean }>()

// random string generator. for testing 
function generateRandomString(length = 16) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const types = ["number", "text", "checkbox"]
const tableStore = useTableStore()
const emit = defineEmits(["closeModal"])
const newTableName = ref("")
const titles: Ref<Title[]> = ref([])
const addTitle = () => {
  titles.value.push({ id: generateRandomString(), name: "test", dataType: DataType.Tag, dataTypeString: "Text", sheet_id: "", createdAt: new Date, updatedAt: new Date })
}
const removeTitle = (index: number) => {
  titles.value.splice(index, 1)
}
const createSheet = () => {
  const sheetData: Sheet = {
    name: newTableName.value,
    titles: titles.value,
    id: generateRandomString(),
    rows: [],
    createdAt: new Date(),
    updatedAt: new Date(),

  }
  tableStore.addTable(sheetData)
  emit("closeModal")
}

</script>

<template>
  <div v-if="showNewTableModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-1/3 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">New Table</h2>
        <Button @click="$emit('closeModal')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </Button>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input v-model="newTableName" type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <div class="mb-4">
        <div class="text-sm text-gray-500 mb-2">System fields: id, created, updated</div>
        <div v-for="(field, index) in titles" :key="index" class="mb-2 flex items-center">
          <input v-model="field.name" type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :placeholder='field.dataTypeString'>
          <Button @click="removeTitle(index)" class="ml-2 text-red-500 hover:text-red-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>

        <Popover>
          <PopoverTrigger>
            <Button
              class="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100">
              + New Field
            </Button>
          </PopoverTrigger>
          <PopoverContent class="flex items-center justify-center max-w-80 flex-wrap">
            <Button @click="addTitle()"
              class="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow hover:bg-gray-100"
              v-for="type in types">
              {{ type }}
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div class="flex justify-end space-x-2">
        <Button @click="$emit('closeModal')" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Cancel
        </Button>
        <Button @click="createSheet" class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create
        </Button>
      </div>
    </div>
  </div>
</template>
