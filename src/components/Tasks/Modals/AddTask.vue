<template>
  <q-card>
    <q-form @submit="onSubmit(taskToSubmit, submitTask, $q)">
      <modal-header>Add task</modal-header>

      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <modal-task-name
            :name="taskToSubmit.name"
            v-model="taskToSubmit.name"
          />
        </div>

        <div class="row q-mb-sm">
          <modal-task-due-date
            :dueDate="taskToSubmit.dueDate"
            v-model="taskToSubmit.dueDate"
            @update-date="updateDate(taskToSubmit, $event)"
            @clear-date="clearDate(taskToSubmit)"
          />
        </div>

        <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
          <modal-task-due-time
            :dueTime="taskToSubmit.dueTime"
            v-model="taskToSubmit.dueTime"
            @update-time="updateTime(taskToSubmit, $event)"
            @clear-time="taskToSubmit.dueTime = ''"
          />
        </div>
      </q-card-section>

      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useQuasar } from 'quasar';
  import { useTasksStore } from '../../../stores/store-tasks';
  import ModalHeader from './Shared/ModalHeader.vue';
  import ModalTaskName from './Shared/ModalTaskName.vue';
  import ModalTaskDueDate from './Shared/ModalTaskDueDate.vue';
  import ModalTaskDueTime from './Shared/ModalTaskDueTime.vue';
  import ModalButtons from './Shared/ModalButtons.vue';

  import {
    clearDate,
    onSubmit,
    updateTime,
    updateDate
  } from 'src/composables/add-edit-task';

  const store = useTasksStore();
  const { fbAddTask } = store;
  const $q = useQuasar();
  const emit = defineEmits(['close-popup']);

  const taskToSubmit = reactive({
    name: '',
    dueDate: '',
    dueTime: '',
    completed: false
  });

  const submitTask = () => {
    fbAddTask(taskToSubmit);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Task added'
    });
    emit('close-popup');
  };
</script>
