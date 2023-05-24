<template>
  <q-page>
    <div class="q-pa-sm absolute full-width full-height column">
      <div class="q-mb-lg row">
        <search-task />
        <sort-tasks />
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
      <q-scroll-area class="q-scroll-area-tasks">
        <no-tasks
          v-if="
            !Object.keys(tasksTodo()).length &&
            !search &&
            !settings.showTasksInOneList
          "
        />
        <TasksTodo v-if="Object.keys(tasksTodo()).length" />
        <TasksCompleted class="q-mb-xl" />
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          class="all-pointer-events"
          color="positive"
          size="lg"
          icon="add"
          @click="setShowAddTask(true)"
        />
      </div>
    </div>
    <q-dialog v-model="showModalAddTask">
      <add-task @close-popup="setShowAddTask(false)" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useTasksStore } from 'src/stores/store-tasks';
  import { useSettingsStore } from 'src/stores/store-settings';
  import AddTask from 'components/Tasks/Modals/AddTask.vue';
  import TasksTodo from 'components/Tasks/TasksTodo.vue';
  import TasksCompleted from 'components/Tasks/TasksCompleted.vue';
  import NoTasks from 'components/Tasks/NoTasks.vue';
  import SearchTask from 'components/Tasks/Tools/SearchTask.vue';
  import SortTasks from 'components/Tasks/Tools/SortTasks.vue';

  const store = useTasksStore();
  const settingsStore = useSettingsStore();
  const { tasksTodo, tasksCompleted, setShowAddTask } = store;

  const { showModalAddTask, search } = storeToRefs(store);
  const { settings } = settingsStore;
</script>

<style lang="scss">
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
