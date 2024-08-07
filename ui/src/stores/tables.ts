import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from '@/components/ui/toast'
export const useTableStore = defineStore('tables', () => {
  const tables = ref([{ id: 0, name: "table 1", fields: ["name", "age", "height"] }, { id: 1, name: "table 2", fields: ["grade", "class", "sport"] }])
  function addTable(table: table) {
    tables.value.push(table)
    toast({ title: "Success", description: `table ${table.name} added successfully` })
  }

  return { tables, addTable }
})
