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

defineProps<{ table: She }>()

function editTable(table: She) {
  console.log(table)
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
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Edit table
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right text-sm">
            Name
          </Label>
          <Input id="name" value="" class="col-span-3" :placeholder="table.name" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit">
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
