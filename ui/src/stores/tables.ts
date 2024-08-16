import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { toast } from '@/components/ui/toast'
import { API } from '@/constants'
import type { Sheet } from '@/types/table'
import type { NewSheetParams } from '@/types/params'
import type { Ref } from "vue"
import { exampleSheet1, exampleSheet2 } from '@/types/table'

export const useTableStore = defineStore('tables', () => {
  const tables: Ref<Sheet[]> = ref([])

  const tablesDB = computed(async () => {
    try {
      const response = await fetch(`${API}/sheet`, { method: "GET", headers: { "Content-Type": "application/json" } })
      const data: Sheet[] = await response.json()
      return data as Sheet[]

    } catch (e) {
      throw Error("something went wrong")
    }
  })

  async function addTable(table: Sheet, params: NewSheetParams) {
    try {
      const response = await fetch(`${API}/sheet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      })
      const data: Sheet = await response.json()
      console.log(data)

    } catch (e) {
      throw Error("Error sending data")
    }

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

  return { tables, addTable, searchFilter, addData, tablesDB }
})



