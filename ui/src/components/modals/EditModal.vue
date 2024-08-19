<script setup lang="ts">
import type { Row } from '@/types/table';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Delete from '../icons/Delete.vue';
import { useRowsStore } from '@/stores/rows';


defineProps<{ showEditModal: Boolean, row: Row }>();
const emit = defineEmits(["closeEditModal"])
const rowStore = useRowsStore()

async function deleteRow(row: Row) {
  await rowStore.deleteRow(row)
  await rowStore.getRows(row.id)
  emit("closeEditModal")
} 
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-full max-w-lg p-8 shadow-lg">

      <div class="flex items-center justify-between">

        <h2 class="text-2xl font-semibold mb-6 text-center">Edit Row</h2>
        <Button @click="deleteRow(row)">
          <Delete :height="24" :width="24" />
        </Button>
      </div>
      <div v-for="(cell, index) in row.cells" :key="index" class="mb-4">
        <Label :for="`cell-${index}`" class="block text-gray-700 text-sm font-medium mb-2">
          Cell {{ index + 1 }}
        </Label>
        <Input :id="`cell-${index}`" :placeholder="cell.value"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="flex justify-end space-x-4 mt-6">
        <Button @click="$emit('closeEditModal')"
          class="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded-md">
          Cancel
        </Button>
        <Button @click="console.log('save')" class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md">
          Save
        </Button>
      </div>
    </div>
  </div>
</template>
