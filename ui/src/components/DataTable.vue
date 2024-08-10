<script setup>

defineProps({
  table: Object
})

</script>

<template>
  <table class="w-full">
    <thead>
      <tr class="bg-gray-50 text-left">
        <th v-for="(field, fieldIndex) in table.fields" :key="fieldIndex" class="p-3 text-gray-600 font-medium">
          {{ field.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="table.fields[0].data" v-for="(_, index) in table.fields[0].data.length" :key="index">
        <td v-for="(field, fieldIndex) in table.fields" class="p-3 text-gray-500" :key="fieldIndex">
          {{ field.data[index] }}
        </td>
      </tr>
      <tr v-else>
        <td> No Data</td>
      </tr>
    </tbody>
  </table>
</template>
