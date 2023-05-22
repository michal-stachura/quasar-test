<template>
  <q-page padding>
    <div class="q-mb-lg">
      <search-task />
    </div>
    <p
      v-if="
        !Object.keys(tasksTodo()).length &&
        !Object.keys(tasksCompleted()).length &&
        search
      "
    >
      No search results
    </p>
    <no-tasks v-if="!Object.keys(tasksTodo()).length && !search" />
    <TasksTodo v-if="Object.keys(tasksTodo()).length" />
    <TasksCompleted />

    <div class="absolute-bottom-right q-mb-sm q-mr-sm">
      <q-btn
        round
        color="positive"
        size="lg"
        icon="add"
        @click="setShowAddTask(true)"
      />
    </div>

    <q-dialog v-model="showModalAddTask">
      <add-task @close-popup="setShowAddTask(false)" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useTasksStore } from 'src/stores/store-tasks';
  import AddTask from 'components/Tasks/Modals/AddTask.vue';
  import TasksTodo from 'components/Tasks/TasksTodo.vue';
  import TasksCompleted from 'components/Tasks/TasksCompleted.vue';
  import NoTasks from 'components/Tasks/NoTasks.vue';
  import SearchTask from 'components/Tasks/Tools/SearchTask.vue';

  const store = useTasksStore();
  const { tasksTodo, tasksCompleted, setShowAddTask } = store;

  const { showModalAddTask, search } = storeToRefs(store);
</script>
