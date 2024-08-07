<script setup>

import Button from './ui/button/Button.vue';
import { RouterLink } from 'vue-router';
import { useTableStore } from '@/stores/tables';

const tableStore = useTableStore()
function getPath(table) {
  return `/table/${table.id}`
}

</script>


<template>
  <aside class="w-64 fixed h-screen bg-white border-r border-gray-200 p-4">
    <div class="mb-4">
      <input type="text" placeholder="Search collections..."
        class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>
    <nav>
      <ul>
        <li v-for="table in tableStore.tables" class="mb-2  bg-gray-400 rounded text-center cursor-pointer">
          <router-link :to="getPath(table)" class="p-2">{{
            table.name }}</router-link>
        </li>
      </ul>
    </nav>
    <Button @click="$emit('openModal')">+ New Table</Button>
  </aside>

</template>
