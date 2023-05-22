<template>
  <div class="q-mt-lg" v-if="Object.keys(tasksCompleted()).length">
    <list-header
      :count="Object.keys(tasksCompleted()).length"
      :bg-class="'bg-green-10'"
      >Tasks completed</list-header
    >
    <q-list bordered separator>
      <task-item
        v-for="(task, key) in tasksCompleted()"
        :key="key"
        :task="task"
        :task-id="key"
      />
    </q-list>
  </div>
</template>

<script setup lang="ts">
  import { useTasksStore } from 'src/stores/store-tasks';
  import TaskItem from './TaskItem.vue';
  import ListHeader from './Modals/Shared/ListHeader.vue';

  const store = useTasksStore();
  const { tasksCompleted } = store;
</script>
