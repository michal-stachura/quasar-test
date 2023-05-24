<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <list-header
        :count="Object.keys(tasksTodo()).length"
        :bg-class="'bg-orange-10'"
        >Undone tasks</list-header
      >
      <q-list bordered separator>
        <task-item
          v-for="(task, key) in tasksTodo()"
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
  import TaskItem from './TaskItem.vue';
  import ListHeader from './Modals/Shared/ListHeader.vue';

  const store = useTasksStore();
  const { tasksTodo } = store;
</script>
