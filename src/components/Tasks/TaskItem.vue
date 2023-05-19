<template>
  <q-item
    v-ripple
    clickable
    @click="toggleCompleted"
    :class="{
      'bg-orange-1': !task.completed,
      'bg-green-1': task.completed
    }"
  >
    <q-item-section side top>
      <q-checkbox v-model="completed" @input="toggleCompleted" />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': task.completed }">{{
        task.name
      }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{
            task.dueDate
          }}</q-item-label>
          <q-item-label class="row justify-end" caption>{{
            task.dueTime
          }}</q-item-label>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
  import { ref, PropType } from 'vue';
  import { Task } from '../../types/Task';
  import { useTasksStore } from '../../stores/store-tasks';

  const store = useTasksStore();

  const { toggleTask } = store;

  const props = defineProps({
    task: {
      type: Object as PropType<Task>,
      required: true
    },
    taskId: {
      type: String,
      required: true
    }
  });

  const toggleCompleted = () => {
    completed.value = !completed.value;
    toggleTask(props.taskId);
  };

  const completed = ref(props.task.completed);
</script>
