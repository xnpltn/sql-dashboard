import { ref, h } from 'vue'
import { defineStore } from 'pinia'
import { toast, ToastAction } from '@/components/ui/toast'
import { API } from '@/constants'
import type { Sheet } from '@/types/table'
import type { NewSheetParams, EditTableInput } from '@/types/params'
import type { Ref } from "vue"

export const useTableStore = defineStore('tables', () => {
  const tables: Ref<Sheet[]> = ref([])

  const tablesDB = async () => {
    try {
      const response = await fetch(`${API}/sheet`, { method: "GET", headers: { "Content-Type": "application/json" } })
      if (response.ok) {
        const data: Sheet[] = await response.json()
        tables.value = data
      } else {
        toast({ title: "Error", description: `something went wrong ` })
      }
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Refresh",
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }), variant: 'destructive',
          description: `Error - ${e.message || "Something Went Wrong"}`
        })
      }
      throw Error("something went wrong")
    }
  }


  async function addTable(params: NewSheetParams) {
    try {
      const response = await fetch(`${API}/sheet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      })
      if (response.ok) {
        const data: Sheet = await response.json()
        console.log(data)
        await tablesDB()
      }

      toast({ title: "Success", description: `table ${params.name} added successfully` })
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Refresh",
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }), variant: 'destructive',
          description: `Error - ${e.message || "Something Went Wrong"}`
        })
      }
      throw Error("Error sending data")
    }
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

  async function deleteTable(table_id: string) {
    try {
      const response = await fetch(`${API}/sheet/${table_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the table");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Refresh",
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }), variant: 'destructive',
          description: `Error - ${e.message || "Something Went Wrong"}`
        })
      }
      console.error(e);
    }
  }


  async function updateTable(input: EditTableInput) {
    try {
      const response = await fetch(`${API}/sheet/${input.table.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: input.table.id, name: input.table.name, titles: input.titles })
      })
      if (response.ok) {
        toast({ title: "Success", description: "Updated" })
        await tablesDB()
      }
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Refresh",
          action: h(ToastAction, {
            altText: 'Try again',
          }, {
            default: () => 'Try again',
          }), variant: 'destructive',
          description: `Error - ${e.message || "Something Went Wrong"}`
        })
      }
      console.error(e);
    }
  }
  return { tables, addTable, searchFilter, addData, tablesDB, deleteTable, updateTable }
})



