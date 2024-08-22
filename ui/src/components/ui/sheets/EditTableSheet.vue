<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Sheet as She } from '@/types/table';
import Settings from '@/components/icons/Settings.vue';
import { ref } from 'vue';
import { toast } from '../toast';
import { useTableStore } from '@/stores/tables';


const name = ref("")
const tableStore = useTableStore()
defineProps<{ table: She }>()



function editTable(table: She) {
  console.log(table)
}

async function saveChanges(id: string) {
  if (name.value.length < 5) {
    toast({ title: "Error", description: "Name  Should be more than 5 characters" })
    return
  } else {
    await tableStore.updateTable(name.value, id)
    name.value = ""
  }
}

</script>

<template>
  <Sheet v-if="table">
    <SheetTrigger as-child>
      <button @click="editTable(table)">
        <Settings :height="24" :width="24" />
      </button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Table</SheetTitle>
        <SheetDescription>
          Edit tableeeeeeel
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right text-sm">
            Name
          </Label>
          <Input id="name" v-model="name" class="col-span-3" :placeholder="table.name" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child v-if="name.length > 5">
          <Button @click="saveChanges(table.id)">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
