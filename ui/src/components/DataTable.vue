<script setup lang="ts">
import type { Sheet } from '@/types/table';

defineProps<{ table: Sheet }>()

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
      <tr v-if="table.rows" v-for="(row, rowIndex) in table.rows" :key="rowIndex"
        :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'" class="hover:bg-gray-100">
        <td class="p-3 text-sm text-gray-700">{{ new Date(row.cells[0].createdAt).toLocaleDateString() }}</td>
        <td class="p-3 text-sm text-gray-700">{{ new Date(row.cells[0].updatedAt).toLocaleDateString() }}</td>
        <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex" class="p-3 text-sm text-gray-700">
          {{ cell.value }}
        </td>
      </tr>
      <tr v-else>
        <td class="p-3 text-center text-gray-500" colspan="100%">No Data</td>
      </tr>
    </tbody>
  </table>
</template>
