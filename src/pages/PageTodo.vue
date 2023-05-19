<template>
  <q-page padding>
    <q-list bordered separator>
      <TaskItem
        v-for="(task, key) in tasks"
        :key="key"
        :task="task"
        :task-id="key"
      />
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
  import { useTasksStore } from '../stores/store-tasks';
  import TaskItem from 'components/Tasks/TaskItem.vue';

  const store = useTasksStore();

  const { tasks } = store;

  // const toggleCompleted = (task: Task) => {
  //   console.log(task);
  // };
</script>
