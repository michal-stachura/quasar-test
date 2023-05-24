<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div
      :class="{ 'q-mt-lg': !settings.showTasksInOneList }"
      v-if="Object.keys(tasksCompleted()).length"
    >
      <list-header
        v-if="!settings.showTasksInOneList"
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
  </transition>
</template>

<script setup lang="ts">
  import { useTasksStore } from 'src/stores/store-tasks';
  import { useSettingsStore } from 'src/stores/store-settings';
  import TaskItem from './TaskItem.vue';
  import ListHeader from './Modals/Shared/ListHeader.vue';

  const store = useTasksStore();
  const settingsStore = useSettingsStore();
  const { tasksCompleted } = store;
  const { settings } = settingsStore;
</script>
