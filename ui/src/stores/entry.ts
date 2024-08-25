import { toast, ToastAction } from "@/components/ui/toast";
import { API } from "@/constants";
import type { EditCellParams } from "@/types/params";
import { defineStore } from "pinia";
import { h } from "vue";



export const useEntryStore = defineStore("entry", () => {

  async function update(cells: EditCellParams[]) {
    try {
      const response = await fetch(`${API}/entry`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cells) })
      if (response.ok) {
        toast({ title: "updated", description: "Yay" })
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
      console.log(e)
    }
  }


  return { update }

})
