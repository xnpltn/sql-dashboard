import { toast } from "@/components/ui/toast";
import { API } from "@/constants";
import type { EditCellParams } from "@/types/params";
import { defineStore } from "pinia";



export const useEntryStore = defineStore("entry", () => {

  async function update(cells: EditCellParams[]) {
    try {
      const response = await fetch(`${API}/entry`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cells) })
      if (response.ok) {
        toast({ title: "updated", description: "Yay" })
      }

    } catch (e) {
      console.log(e)
    }
  }


  return { update }

})
