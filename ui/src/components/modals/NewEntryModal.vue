<script setup lang="ts">
import { reactive, ref, } from 'vue';
import { useTableStore } from '@/stores/tables';
import { useRowsStore } from '@/stores/rows';
import Input from '../ui/input/Input.vue';
import Button from '../ui/button/Button.vue';
import { Label } from '../ui/label';
import { toast } from '../ui/toast';
import type { Sheet } from '@/types/table';
import type { NewCellParams, NewRowparams, NewEntryParams } from '@/types/params';

const props = defineProps<{ showNewEntryModal: Boolean, table: Sheet }>();
const emits = defineEmits(['closeEntryModal']);

const tableStore = useTableStore();
const rowStore = useRowsStore();


const newEntry = reactive<NewEntryParams>({});
const newRow = ref<NewRowparams>({ cells: [], sheet_id: props.table.id });
const cellsParams = ref<NewCellParams[]>([]);

async function saveEntry(entry: NewEntryParams) {
  cellsParams.value = [];

  props.table.titles.forEach((title, i) => {
    const value = entry[title.name];
    if (value !== undefined && value !== null) {
      cellsParams.value.push({
        dataTypeString: title.dataTypeString,
        value: value.toString(),
        title: title.name
      });
    } else {
      cellsParams.value.push({
        dataTypeString: title.dataTypeString,
        value: 'N/A',
        title: title.name
      });
    }
  });

  newRow.value.cells = cellsParams.value.filter(cell => !!cell.value);


  await rowStore.newRow(newRow.value);
  await rowStore.getRows(newRow.value.sheet_id)

  cellsParams.value = []
}

async function addData(newData: NewEntryParams) {
  await saveEntry(newEntry);
  await tableStore.addData(newData, props.table);
  await tableStore.tablesDB()
  await rowStore.getRows(props.table.id)

  // Resetting the form
  Object.keys(newEntry).forEach(key => delete newEntry[key]);

  emits("closeEntryModal");
  toast({ title: "Success", description: "Record added successfully" });
}

</script>

<template>
  <div v-if="showNewEntryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg w-1/3 p-6">
      <div class="p-3 flex items-center justify-center">
        <h3>Add entry</h3>
      </div>
      <div v-for="(title, index) in table.titles" :key="index" class="mb-4">
        <Label :for="title.name" class="block text-gray-700 text-sm font-medium mb-2">
          {{ title.name }} / <span class="text-gray-300">{{ title.dataTypeString }}</span>
        </Label>
        <Input required :name="title.name"
          :type="['Number'].includes(title.dataTypeString) ? 'number' : (['Date'].includes(title.dataTypeString) ? 'date' : 'text')"
          @input="newEntry.dataType ??= title.dataTypeString" v-model="newEntry[title.name]"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <Button @click="$emit('closeEntryModal')"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
          Cancel
        </Button>
        <Button v-if="Object.keys(newEntry).length" @click="addData(newEntry)"
          class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create
        </Button>
      </div>
    </div>
  </div>
</template>
