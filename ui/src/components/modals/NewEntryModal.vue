<script setup lang="ts">
import Input from '../ui/input/Input.vue';
import { Label } from '../ui/label';
import Button from '../ui/button/Button.vue';
import { reactive, ref } from 'vue';
import { toast } from '../ui/toast';
import { useTableStore } from '@/stores/tables';
import type { Cell, Row, Sheet } from '@/types/table';
import type { Ref } from 'vue';
import { DataType, generateRandomString } from '@/types/table';

const props = defineProps<{ showNewEntryModal: Boolean, table: Sheet }>()
const emits = defineEmits(['closeEntryModal'])
const tableStore = useTableStore()

let newEntry = reactive({})

const newRow: Ref<Row> = ref({ id: generateRandomString(), cells: [], sheet_id: props.table.id, createdAt: new Date(), updatedAt: new Date() })
const cells: Ref<Cell[]> = ref([])
function test() {
  Object.keys(newEntry).forEach((key) => {
    const cell: Cell = {
      id: generateRandomString(),
      name: "Name",
      dataType: DataType.Text,
      dataTypeString: "Text",
      value: newEntry[key],
      row_id: "id",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    cells.value.push(cell)
  })
  newRow.value.cells = cells.value
  props.table.rows.push(newRow.value)
  // resetting 
  cells.value = []
}



async function addData(newData: any) {
  test()
  await tableStore.addData(newData, props.table)
  newEntry = reactive({})
  emits("closeEntryModal")
  toast({ title: "Success", description: `record added successfully` })
}

</script>

<template>
  <div v-if="showNewEntryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-1/3 p-6">
      <div v-for="(title, index) in table.titles" :key="index" class="mb-4">
        <Label :for="title.name" class="block text-gray-700 text-sm font-medium mb-2">
          {{ title.name }} / <span class="text-gray-300 ">{{ title.dataTypeString }}</span>
        </Label>
        <Input :name="title.name" type="text" v-model="newEntry[title.name]"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <Button @click="$emit('closeEntryModal')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Cancel
        </Button>
        <Button @click="addData(newEntry)" class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create
        </Button>
      </div>
    </div>

  </div>
</template>
