
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { API } from "@/constants";
import type { Row } from "@/types/table"
import type { NewRowparams } from "@/types/params";
import { toast } from "@/components/ui/toast";


export const useRowsStore = defineStore("rows", () => {
  const rows: Ref<Row[]> = ref([])
  const getRows = async (tableId: string) => {
    try {
      const response = await fetch(`${API}/row/${tableId}`, { method: "GET", headers: { "Content-Type": "application/json" } })
      if (response.ok) {
        const data: Row[] = await response.json()
        rows.value = data
        return data as Row[]
      }
    } catch (e) {
      toast({ title: "Error", description: "Something went wrong" })
    }

  }
  async function newRow(data: NewRowparams) {
    try {
      const response = await fetch(`${API}/entry`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (response.ok) {
        await getRows(data.sheet_id)
        toast({ title: "Success ", description: ` new entry created` })
      }
    } catch (e) {
      toast({ title: "Error", description: "Something went wrong" })
    }
  }
  async function deleteRow(row: Row) {

    try {
      const response = await fetch(`${API}/delete-row/${row.id}`, { method: "DELETE", headers: { "Content-Type": "application/json" } })
      if (response.ok) {
        toast({ title: "Success ", description: ` Delete Successfully` })
        await getRows(row.sheet_id)
      }
      console.log(await response.json())
    } catch (e) {
      toast({ title: "Error", description: "Something went wrong" })
    }
  }
  async function editRow(editRowParams: any) {
    console.log(editRowParams)
  }
  return { rows, getRows, newRow, editRow, deleteRow }
})
