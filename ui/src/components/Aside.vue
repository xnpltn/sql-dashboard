<script setup>

import { ref } from 'vue';
import Button from './ui/button/Button.vue';


defineProps({
    tables: Array
})

</script>


<template>
    <aside class="w-64 bg-white border-r border-gray-200 p-4">
      <div class="mb-4">
        <input
          type="text"
          placeholder="Search collections..."
          class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      <nav>
        <ul>
          <li v-for="table in tables" class="mb-2 p-2 bg-gray-400 rounded text-center cursor-pointer">
              {{ table }}
          </li>
        </ul>
      </nav>
      <Button @click="$emit('openModal')">+ New Table</Button>
    </aside>

</template>