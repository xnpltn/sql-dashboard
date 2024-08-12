import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from '@/components/ui/toast'
import { API } from '@/constants'
import type { Sheet } from '@/types/table'
import { exampleSheet1, exampleSheet2 } from '@/types/table'

export const useTableStore = defineStore('tables', () => {
  const tables = ref([exampleSheet1, exampleSheet2])
  async function addTable(table: Sheet) {
    tables.value.push(table)
    toast({ title: "Success", description: `table ${table.name} added successfully` })
  }

  function searchFilter(tableName: string): Sheet[] {
    if (tableName != "") {
      let newTables: typeof tables = ref([])
      newTables.value = tables.value.filter((table) => table.name.toLowerCase().includes(tableName.toLowerCase().trim()))
      return newTables.value
    } else {
      return tables.value
    }
  }
  async function addData(newData: any, _: Sheet) {
    toast({ title: "Success", description: `record added successfully` })
  }

  return { tables, addTable, searchFilter, addData }
})



