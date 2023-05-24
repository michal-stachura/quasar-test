<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No tasks todo today!
      <template v-slot:action>
        <q-btn
          @click="setShowAddTask(true)"
          flat
          color="primary"
          label="Add Task"
        />
      </template>
    </q-banner>
  </transition>
</template>

<script setup lang="ts">
  import { useTasksStore } from 'src/stores/store-tasks';
  const store = useTasksStore();
  const { setShowAddTask } = store;
</script>
