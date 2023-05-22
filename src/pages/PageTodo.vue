<template>
  <q-page padding>
    <no-tasks v-if="!Object.keys(tasksTodo()).length" />
    <TasksTodo v-else />
    <tasks-completed />

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
  import AddTask from 'components/Tasks/Modals/AddTask.vue';
  import TasksTodo from 'components/Tasks/TasksTodo.vue';
  import TasksCompleted from 'components/Tasks/TasksCompleted.vue';
  import NoTasks from 'src/components/Tasks/NoTasks.vue';
  import { useTasksStore } from 'src/stores/store-tasks';
  const store = useTasksStore();
  const { tasksTodo, setShowAddTask } = store;

  const { showModalAddTask } = storeToRefs(store);
</script>
