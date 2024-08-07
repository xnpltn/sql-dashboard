<script setup>
import Aside from '@/components/Aside.vue';
import Button from '@/components/ui/button/Button.vue';
import NewTableModal from '@/components/collection/NewTableModal.vue';
import { ref } from 'vue';
let showNewTableModal = ref(false)
let tables = ref(['table-1', 'table-2'])

function addToTable(table){
  tables.value.push(table)
}

</script>

<template>
  
  <div class="flex h-screen bg-gray-100">
    <!-- Aside -->
    <Aside @openModal="showNewTableModal= true" :tables="tables"></Aside>
    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <h1 class="text-2xl font-semibold text-gray-700">Collections</h1>
          <span class="mx-2 text-gray-500">/</span>
          <h2 class="text-2xl font-semibold text-gray-700">users</h2>
        </div>
        <div class="flex space-x-2">
          
          <Button >
            + New Entry
          </Button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow">
        <div class="p-4">
          <input
            type="text"
            placeholder="Search term or filter like created > '2022-01-01'..."
            class="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-left">
              <th class="p-3 text-gray-600 font-medium">id</th>
              <th class="p-3 text-gray-600 font-medium">username</th>
              <th class="p-3 text-gray-600 font-medium">email</th>
              <th class="p-3 text-gray-600 font-medium">name</th>
              <th class="p-3 text-gray-600 font-medium">avatar</th>
              <th class="p-3 text-gray-600 font-medium">created</th>
              <th class="p-3 text-gray-600 font-medium">updated</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 text-gray-500" colspan="7">No records found.</td>
            </tr>
          </tbody>
        </table>
        <div class="p-4">
          <Button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            + New record
          </Button>
        </div>
      </div>
    </main>
    <NewTableModal :showNewTableModal="showNewTableModal" @closeModal="showNewTableModal = false" @addTable="(n)=> addToTable(n)"></NewTableModal>
    
  </div>
</template>
