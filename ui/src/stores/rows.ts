
import { defineStore } from "pinia";
import { ref } from "vue";
import { API } from "@/constants";
import type { Row } from "@/types/table"
export const useRowsStore = defineStore("rows", () => {
  const rows = ref([])

  const getRows = async (tableId: string) => {
    try {
      const response = await fetch(`${API}/rows/${tableId}`, { method: "GET", headers: { "Content-Type": "application/json" } })
      const data: Row[] = await response.json()
      console.table(data)
    } catch (e) { console.log(e) }

  }
  return { rows, getRows }
})
