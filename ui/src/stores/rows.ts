
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
        console.table(data)
        rows.value = data
      }
    } catch (e) { console.log(e) }

  }
  async function newRow(data: NewRowparams) {
    try {
      const response = await fetch(`${API}/entry`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (response.ok) {
        toast({ title: "Success ", description: ` new entry created` })
      }
      console.log(response)
    } catch (e) { }
  }
  return { rows, getRows, newRow }
})
