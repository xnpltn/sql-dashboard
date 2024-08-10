<script setup>
import Input from '../ui/input/Input.vue';
import { Label } from '../ui/label';
import Button from '../ui/button/Button.vue';
import { reactive } from 'vue';
import { toast } from '../ui/toast';
import { useTableStore } from '@/stores/tables';

defineProps({
  showNewEntryModal: Boolean,
  table: Object
})
const emits = defineEmits(['closeEntryModal'])
const tableStore = useTableStore()

let newEntry = reactive({})

async function addData(newData, orginalData) {
  await tableStore.addData(newData, orginalData)
  newEntry = reactive({})
  emits("closeEntryModal")
  toast({ title: "Success", description: `record added successfully` })
}


</script>


<template>
  <div v-if="showNewEntryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-1/3 p-6">
      <div v-for="(field, index) in table.fields" :key="index" class="mb-4">
        <Label :for="field.name" class="block text-gray-700 text-sm font-medium mb-2">
          {{ field.name }} / <span class="text-gray-300 ">{{ field.type }}</span>
        </Label>
        <Input :name="field.name" :type="field.type" v-model="newEntry[field.name]"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <Button @click="$emit('closeEntryModal')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Cancel
        </Button>
        <Button @click="addData(newEntry, table)" class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create
        </Button>
      </div>
    </div>

  </div>
</template>
