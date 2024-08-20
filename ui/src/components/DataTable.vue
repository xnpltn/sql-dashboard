<script setup lang="ts">
import type { Sheet as Shit, Row } from '@/types/table';
import { onBeforeMount, ref, watch, type Ref } from 'vue';
import { useRowsStore } from '@/stores/rows';
import { Button } from '@/components/ui/button';
import Label from './ui/label/Label.vue';
import Delete from './icons/Delete.vue';
import Input from './ui/input/Input.vue';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
const rowStore = useRowsStore()
const props = defineProps<{ table: Shit }>()
const rows: Ref<Row[]> = ref([])

onBeforeMount(async () => {
  await rowStore.getRows(props.table.id)
  rows.value = rowStore.rows
})

watch(
  () => props.table.id, async () => {
    await rowStore.getRows(props.table.id)
    rows.value = rowStore.rows
  })

function deleteRow(row: Row) {
  rowStore.deleteRow(row).then(() => {
    rowStore.getRows(props.table.id)
  })
}

watch(
  () => rowStore.rows,
  (newRows) => {
    rows.value = newRows
  }
)
let editRow: Row;
function edit(rowIndex: number) {
  console.log(editRow)

}

</script>

<template>
  <table class="w-full border-collapse">
    <thead>
      <tr class="bg-gray-200 text-left">
        <th class="p-3">Created At</th>
        <th class="p-3">Updated At</th>
        <th v-for="(title, index) in table.titles" :key="index" class="p-3">
          {{ title.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="table.rows" v-for="(row, rowIndex) in rows" :key="rowIndex"
        :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="hover:bg-gray-100">
        <td class="p-3 text-sm text-gray-700">
          {{ new Date(`${row.cells[0].createdAt}`).toLocaleString() }}
        </td>
        <td class="p-3 text-sm text-gray-700">
          {{ new Date(`${row.cells[0].updatedAt}`).toLocaleString() }}
        </td>
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex" class="p-3 text-sm text-gray-700">
          {{ cell.value }}
        </td>
        <td>
          <Sheet>
            <SheetTrigger class="">
              <span class="bg-gray-300 p-2 rounded">Edit</span>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Data</SheetTitle>
                <SheetDescription>
                  Edit. This Action Is reversible once saved
                </SheetDescription>
              </SheetHeader>
              <div class="bg-white rounded-lg w-full max-w-lg p-8 shadow-lg">
                <div class="flex items-center justify-between">
                  <span></span>
                  <Button @click="deleteRow(row)" class="bg-gray-300 p-2 rounded">
                    <Delete :height="24" :width="24" class="text-black" />
                  </Button>
                </div>
                <div v-for="(cell, index) in row.cells" :key="index" class="mb-4">
                  <Label :for="`cell-${index}`" class="block text-gray-700 text-sm font-medium mb-2">
                    Cell {{ index + 1 }}
                  </Label>
                  <Input :id="`cell-${index}`" :placeholder="cell.value" @change="console.log('hi')"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div class="flex justify-end space-x-4 mt-6">
                  <Button @click="editRow = row; edit(rowIndex)"
                    class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md">
                    Save
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </td>
      </tr>
      <tr v-else>
        <td class="p-3 text-center text-gray-500" colspan="100%">No Data</td>
      </tr>
    </tbody>
  </table>
</template>
