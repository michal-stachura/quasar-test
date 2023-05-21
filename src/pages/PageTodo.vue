<template>
  <q-page padding>
    <div v-if="Object.keys(tasks).length">
      <q-list bordered separator>
        <TaskItem
          v-for="(task, key) in tasks"
          :key="key"
          :task="task"
          :task-id="key"
        />
      </q-list>
    </div>
    <div v-else>
      <h5 class="text-center">Please add first task.</h5>
    </div>
    <div class="absolute-bottom-right q-mb-sm q-mr-sm">
      <q-btn
        round
        color="positive"
        size="lg"
        icon="add"
        @click="showAddTask = true"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close-popup="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useTasksStore } from '../stores/store-tasks';
  import TaskItem from 'components/Tasks/TaskItem.vue';
  import AddTask from '../components/Tasks/Modals/AddTask.vue';

  const store = useTasksStore();
  const showAddTask = ref(false);
  const { tasks } = store;
</script>
