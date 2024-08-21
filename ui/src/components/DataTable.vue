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
} from '@/components/ui/sheet';

const rowStore = useRowsStore();
const props = defineProps<{ table: Shit }>();
const rows: Ref<Row[]> = ref([]);
const selectAll = ref(false);
const selected: Ref<Row[]> = ref([]);

onBeforeMount(async () => {
  await rowStore.getRows(props.table.id);
  rows.value = rowStore.rows;
});

watch(
  () => props.table.id,
  async () => {
    await rowStore.getRows(props.table.id);
    rows.value = rowStore.rows;
  }
);

watch(
  () => rowStore.rows,
  (newRows) => {
    rows.value = newRows;
  }
);

watch(selectAll, (newValue) => {
  selected.value = newValue ? [...rows.value] : [];
});

function toggleRowSelection(row: Row) {
  const index = selected.value.findIndex((r) => r.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}


function isRowSelected(row: Row): boolean {
  return selected.value.some((r) => r.id === row.id);
}

function deleteRow(row: Row) {
  rowStore.deleteRow(row).then(() => {
    rowStore.getRows(props.table.id);
  });
}


function deleteSelected() {
  rowStore.deleteRows(selected.value).then(() => {
    rowStore.getRows(props.table.id);
    selected.value = []
  })
}

let editRow: Row;
function edit(rowIndex: number) {
  console.log(editRow);
}

</script>

<template>
  <table class="w-full border-collapse">
    <thead class="px-2">
      <tr class="bg-gray-200 text-left">
        <th class="p-3">
          <input type="checkbox" v-model="selectAll" :id="`select-all`" class="form-checkbox" />
        </th>
        <th class="text-sm"> ID</th>
        <th v-for="(title, index) in table.titles" :key="index" class="p-3">
          {{ title.name }}
        </th>
        <th class="p-3">Created At</th>
        <th class="p-3">Updated At</th>
      </tr>
    </thead>
    <tbody class="px-2">
      <tr v-if="table.rows" v-for="(row, rowIndex) in rows" :key="rowIndex"
        :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="hover:bg-gray-100">
        <td class="p-3 text-sm text-gray-700">
          <input type="checkbox" :id="`select-row-${rowIndex}`" class="form-checkbox" :checked="isRowSelected(row)"
            @change="toggleRowSelection(row)" />
        </td>
        <td>{{ row.id }}</td>
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex" class="p-3 text-sm text-gray-700">
          {{ cell.value }}
        </td>
        <td class="p-3 text-sm text-gray-700">
          {{ new Date(`${row.cells[0].createdAt}`).toLocaleString() }}
        </td>
        <td class="p-3 text-sm text-gray-700">
          {{ new Date(`${row.cells[0].updatedAt}`).toLocaleString() }}
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
  <div class="px-3 py-2">

    <Button @click="deleteSelected()" v-if="selected.length"
      class=" bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded mx-3">
      Delete
    </Button>
  </div>
</template>
