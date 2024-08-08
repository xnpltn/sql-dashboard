import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from '@/components/ui/toast'

let data = [

  {
    "name": "User",
    "fields": [
      {
        "name": "username",
        "data": ["alice", "bob", "charlie"]
      },
      {
        "name": "email",
        "data": ["alice@example.com", "bob@example.com", "charlie@example.com"]
      },
      {
        "name": "age",
        "data": ["25", "30", "22"]
      }
    ]
  },
  {
    "name": "Product",
    "fields": [
      {
        "name": "product_name",
        "data": ["Laptop", "Smartphone", "Tablet"]
      },
      {
        "name": "price",
        "data": ["1000", "600", "400"]
      },
      {
        "name": "stock",
        "data": ["50", "100", "200"]
      }
    ]
  },
  {
    "name": "Order",
    "fields": [
      {
        "name": "order_id",
        "data": ["001", "002", "003"]
      },
      {
        "name": "customer",
        "data": ["alice", "bob", "charlie"]
      },
      {
        "name": "product",
        "data": ["Laptop", "Smartphone", "Tablet"]
      }
    ]
  }
]


export const useTableStore = defineStore('tables', () => {
  const tables = ref(data)
  function addTable(table: table) {
    tables.value.push(table)
    toast({ title: "Success", description: `table ${table.name} added successfully` })
  }

  function searchFilter(tableName: string): any {
    console.log(tableName)
    if (tableName != "") {
      let newTables = ref()
      newTables.value = tables.value.filter((table) => table.name.toLowerCase().includes(tableName.toLowerCase()))
      return newTables
    }
    return tables
  }

  return { tables, addTable, searchFilter }
})



