<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Button from '@/components/ui/button/Button.vue';
import { ref, watch, onBeforeMount, h } from 'vue';
import NewEntryModal from '@/components/modals/NewEntryModal.vue';
import NotFound from './NotFound.vue';
import DataTable from '@/components/DataTable.vue';
import type { Sheet } from '@/types/table';
import { useTableStore } from '@/stores/tables';
import { useRowsStore } from '@/stores/rows';
import Delete from '@/components/icons/Delete.vue';
import Refresh from '@/components/icons/Refresh.vue';
import EditTableSheet from '@/components/ui/sheets/EditTableSheet.vue';
import { toast } from '@/components/ui/toast';
import { ToastAction } from '@/components/ui/toast'

const route = useRoute()
const router = useRouter()
const showNewEntryModal = ref(false)
const tableStore = useTableStore()
const rowStore = useRowsStore()
const loading = ref(true)
let table: Sheet

onBeforeMount(async () => {
  await tableStore.tablesDB()
  table = (tableStore.tables).find((table) => table.id == route.params.id) as Sheet
  loading.value = false
  tableToShow = table
  await rowStore.getRows(table.id)
})

let tableToShow: Sheet

watch(
  () => route.params.id,
  (newId) => {
    table = tableStore.tables.find((table) => table.id == newId) as Sheet
    tableToShow = table
  }
)

async function deleteTable(t: Sheet) {
  await tableStore.deleteTable(t.id)
  await tableStore.tablesDB()
  await router.push("/");
}

function refresh(t: Sheet) {
  tableStore.tablesDB().then(() => {
    rowStore.getRows(t.id).then(() => {
      toast({ title: "Refresh", description: "Refresh done" })
    }).catch((e) => {
      if (e instanceof Error) {
        toast({
          title: "Refresh",
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }), variant: 'destructive',
          description: "Something Went Wrong"
        })
      }
    })
  })
}

</script>

<template>

  <div v-if="!loading" class="flex h-screen bg-gray-100 ml-80 max-w-[calc(100%-20rem)]">
    <main class="flex-1 p-6" v-if="!loading && table">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <h1 class="text-sm font-semibold text-gray-500 lowercase">Table</h1>
          <span class="mx-2 text-gray-500">/</span>
          <h2 class="text-sm font-semibold text-gray-700 lowercase ">{{ table.name }}</h2>
          <EditTableSheet :table="table" />

          <button @click="refresh(table)">
            <Refresh :height="20" :width="20" class="bg-none text-black" />
          </button>
        </div>
        <div class="flex space-x-2">
          <Button @click="deleteTable(table)" class="bg-red-300 hover:bg-red-600 flex items-center justify-center">
            <span class="text-black">Delete</span>
            <Delete :height="18" :width="18" />
          </Button>
          <Button @click="showNewEntryModal = true">
            + New Entry
          </Button>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <DataTable :table="tableToShow" />
        <div class="p-4">
          <Button @click="showNewEntryModal = true"
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            + New Entry
          </Button>
        </div>
      </div>
      <NewEntryModal v-if="tableToShow && showNewEntryModal" @closeEntryModal="showNewEntryModal = false"
        :table="tableToShow" :showNewEntryModal="showNewEntryModal" />
    </main>
    <main v-else class="flex-1 p-6">
      <NotFound />
    </main>
  </div>
  <div v-else class="flex h-screen bg-gray-100 ml-80 max-w-[calc(100%-20rem)]">
    <div class="flex text-center justify-center items-center"></div>
  </div>

</template>
