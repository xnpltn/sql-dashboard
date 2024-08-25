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
import { ref, type Ref } from 'vue';
import { toast } from '../toast';
import { useTableStore } from '@/stores/tables';
import type { EditTitleParams, EditTableParams, EditTableInput } from '@/types/params';


const newTitlesParams: Ref<EditTitleParams[]> = ref([])
const editTableParams: Ref<EditTableParams> = ref({ id: '', name: '' })
const tableStore = useTableStore()




defineProps<{ table: She }>()

function saveChanges(input: EditTableInput) {
  if (input.table.name.length < 5) {
    toast({ title: "Error", description: "Name  Should be more than 5 characters" })
    return
  } else {
    tableStore.updateTable(input).then(() => {
      tableStore.tablesDB().then(() => { })
      newTitlesParams.value = []
    })
  }
}

</script>

<template>
  <Sheet v-if="table">
    <SheetTrigger as-child>
      <button>
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
        <h3>Edit Table</h3>
        <div class=" mb-10">
          <div class="grid grid-cols-2  items-center gap-4">
            <Label for="name" class="text-sm">
              Table Name
            </Label>
            <Input id="name" @change="editTableParams = { id: table.id, name: $event.target.value }" class="col-span-3"
              :placeholder="table.name" />
          </div>
        </div>
        <hr class="">
        <h3>Edit Fields</h3>
        <div v-for="(title, index) in table.titles" :key="index" class="mb-4">
          <Label :for="`cell-${index}`" class="block text-gray-700 text-sm font-medium mb-2">
            <span class="text-gray-500 capitalize">
              Field: {{ title.name }}
            </span>
          </Label>
          <Input :id="`cell-${title.id}`" :placeholder="title.name" type="text"
            @change="newTitlesParams.push({ id: title.id, name: $event.target.value })"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button @click="saveChanges({ table: editTableParams, titles: newTitlesParams })">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
