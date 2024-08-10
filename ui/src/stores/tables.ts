import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { toast } from '@/components/ui/toast'

let data = [

  {
    "name": "User",
    "fields": [
      {
        "name": "username",
        "type": "text",
        "data": ["alice", "bob", "charlie"]
      },
      {
        "name": "email",
        "type": "text",
        "data": ["alice@example.com", "bob@example.com", "charlie@example.com"]
      },
      {
        "name": "age",
        "type": "number",
        "data": ["25", "30", "22"]
      }
    ]
  },
  {
    "name": "Product",
    "fields": [
      {
        "name": "product_name",
        "type": "text",
        "data": ["Laptop", "Smartphone", "Tablet"]
      },
      {
        "name": "price",
        "type": "number",
        "data": ["1000", "600", "400"]
      },
      {
        "name": "stock",
        "type": "number",
        "data": ["50", "100", "200"]
      }
    ]
  },
  {
    "name": "Order",
    "fields": [
      {
        "name": "order_id",
        "type": "number",
        "data": ["001", "002", "003"]
      },
      {
        "name": "customer",
        "type": "text",
        "data": ["alice", "bob", "charlie"]
      },
      {
        "name": "product",
        "type": "text",
        "data": ["Laptop", "Smartphone", "Tablet"]
      }
    ]
  }
]


export const useTableStore = defineStore('tables', () => {
  const tables = ref(data)
  async function addTable(table: table) {
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
  async function addData(newData: any, table: table) {
    Object.keys(newData).forEach(key => {
      let field = table.fields.find(f => f.name === key);
      if (field) {
        field.data.push(newData[key]);
      }
    });
    toast({ title: "Success", description: `record added successfully` })
  }

  return { tables, addTable, searchFilter, addData }
})



