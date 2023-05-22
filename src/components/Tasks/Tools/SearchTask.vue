<template>
  <q-input
    v-model="search"
    @update:model-value="tasksFiltered()"
    filled
    label="Search"
    class="col"
  >
    <template v-slot:append>
      <q-icon
        v-if="search !== ''"
        name="close"
        @click="search = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
  import { useTasksStore } from 'src/stores/store-tasks';
  import { storeToRefs } from 'pinia';

  const store = useTasksStore();
  const { search } = storeToRefs(store);
  const { tasksFiltered } = store;
</script>
