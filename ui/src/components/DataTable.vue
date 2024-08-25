<script setup lang="ts">
import type { Sheet as S, Row } from '@/types/table';
import { onBeforeMount, ref, watch, type Ref } from 'vue';
import { useRowsStore } from '@/stores/rows';
import { Button } from '@/components/ui/button';
import Label from './ui/label/Label.vue';
import Delete from './icons/Delete.vue';
import Input from './ui/input/Input.vue';
import type { EditCellParams } from '@/types/params';
import Settings from './icons/Settings.vue';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { toast } from './ui/toast';
import { useEntryStore } from '@/stores/entry';

const rowStore = useRowsStore();
const entryStore = useEntryStore()
const props = defineProps<{ table: S }>();
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


function copyToCB(data: string) {
  navigator.clipboard.writeText(data).then(() => {
    toast({ title: "clipboard", description: "Copied ID to clipboard" })
  })
}

const newData: Ref<EditCellParams[]> = ref([])


function addNewData(cell: EditCellParams) {
  newData.value.push(cell)
}
function edit() {
  entryStore.update(newData.value).then(() => {
    rowStore.getRows(props.table.id).then(() => {
      rows.value = rowStore.rows;
    })
  })

  newData.value = []
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
        <th v-for="(title, index) in table.titles" :key="index" class="p-3 text-sm uppercase">
          {{ title.name }}
        </th>
        <th class="p-3 text-xs uppercase">Created At</th>
        <th class="p-3 text-xs uppercase">Updated At</th>
      </tr>
    </thead>
    <tbody class="px-2">
      <tr v-if="table.rows.length" v-for="(row, rowIndex) in rows" :key="rowIndex"
        :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="hover:bg-gray-100">
        <td class="p-3 text-xs text-gray-700">
          <input type="checkbox" :id="`select-row-${rowIndex}`" class="form-checkbox" :checked="isRowSelected(row)"
            @change="toggleRowSelection(row)" />
        </td>
        <td class="p-3 text-sm text-gray-700" @click="copyToCB(row.id)">
          <span class="cursor-pointer hover:bg-gray-500 rounded bg-gray-100 text-xs p-1 hover:text-white">
            {{ row.id.length > 5 ? row.id.substring(0, 7) + '...' : row.id }}
          </span>
        </td>
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex"
          :class="{ 'p-3 text-sm': true, 'text-xs text-gray-300': cell.value === 'N/A', 'text-gray-700': cell.value !== 'N/A' }">
          {{ cell.value == '' ? 'N/A' : cell.value }}
        </td>
        <td class=" p-3 text-xs text-gray-700">
          {{ new Date(`${row.cells[0].createdAt}`).toLocaleString() }}
        </td>
        <td class="p-3 text-xs text-gray-700">
          {{ new Date(`${row.cells[0].updatedAt}`).toLocaleString() }}
        </td>
        <td class="max-w-5">
          <Sheet>
            <SheetTrigger class="">
              <Settings :height="24" :width="24" />
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
                  <SheetClose>
                    <Button @click="deleteRow(row)" class="bg-red-300 hover:bg-red-600 rounded-full text-black">
                      <span>Delete</span>
                      <Delete :height="16" :width="16" />
                    </Button>
                  </SheetClose>
                </div>
                <div v-for="(cell, index) in row.cells" :key="index" class="mb-4">
                  <Label :for="`cell-${index}`" class="block text-gray-700 text-sm font-medium mb-2">
                    <span class="text-gray-500 capitalize">
                      {{ cell.title }}
                    </span>
                  </Label>
                  <Input :id="`cell-${cell.id}`" :placeholder="cell.value"
                    :type="['Number'].includes(cell.dataTypeString) ? 'number' : (['Date'].includes(cell.dataTypeString) ? 'date' : 'text')"
                    @change="addNewData({ id: cell.id, value: $event.target.value })"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div class="flex justify-end space-x-4 mt-6">
                  <Button @click="edit()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300">
                    Save
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </td>
      </tr>
      <tr v-else>
        <td class="px-3 py-10 text-center text-gray-500" colspan="100%">No Data</td>
      </tr>
    </tbody>
  </table>
  <div v-if="selected.length"
    class="absolute bottom-20 left-[50%] rounded-full p-2 bg-white text-center transition-all duration-300 flex items-center justify-center gap-3 shadow">
    <span class="text-sm text-center ml-2"> {{ 'selected items :' }} <span
        class=" p-1 text-xs bg-green-600 rounded-full">{{
          selected.length }}</span>
    </span>
    <Button @click="deleteSelected()" class="bg-red-300 hover:bg-red-600 rounded-full">
      <Delete :height="16" :width="16" />
    </Button>
  </div>
</template>
