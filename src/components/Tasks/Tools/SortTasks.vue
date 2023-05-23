<template>
  <q-select
    filled
    v-model="sort"
    emit-value
    map-options
    :options="options"
    label="Sort by"
    class="col q-ml-sm"
  />
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useTasksStore } from 'src/stores/store-tasks';
  import { Option } from '../../../types/Option';
  const store = useTasksStore();

  const { sort } = storeToRefs(store);
  const options: Option[] = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Date',
      value: 'dueDate'
    }
  ];
</script>

<style scoped lang="scss">
  .q-select {
    flex: 0 0 112px;
  }
</style>
