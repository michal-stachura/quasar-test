<template>
  <q-card>
    <q-form @submit="onSubmit">
      <modal-header>Edit task</modal-header>

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
            @update-date="updateDate"
            @clear-date="clearDate"
          />
        </div>

        <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
          <modal-task-due-time
            :dueTime="taskToSubmit.dueTime"
            v-model="taskToSubmit.dueTime"
            @update-time="updateTime"
            @clear-time="taskToSubmit.dueTime = ''"
          />
        </div>
      </q-card-section>

      <modal-buttons />
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
  import { PropType, reactive } from 'vue';
  import { useQuasar } from 'quasar';
  import { useTasksStore } from '../../../stores/store-tasks';
  import ModalHeader from './Shared/ModalHeader.vue';
  import ModalTaskName from './Shared/ModalTaskName.vue';
  import ModalTaskDueDate from './Shared/ModalTaskDueDate.vue';
  import ModalTaskDueTime from './Shared/ModalTaskDueTime.vue';
  import ModalButtons from './Shared/ModalButtons.vue';
  import { Task } from 'src/types/Task';

  const store = useTasksStore();
  const { editTask } = store;
  const $q = useQuasar();
  const emit = defineEmits(['close-popup']);

  const props = defineProps({
    task: {
      type: Object as PropType<Task>,
      required: true
    },
    id: {
      type: String as PropType<string>,
      required: true
    }
  });

  const taskToSubmit = reactive({
    name: props.task.name,
    dueDate: props.task.dueDate,
    dueTime: props.task.dueTime,
    completed: props.task.completed
  });

  const clearDate = () => {
    taskToSubmit.dueDate = '';
    taskToSubmit.dueTime = '';
  };

  const updateDate = (newDate: string): void => {
    taskToSubmit.dueDate = newDate;
  };

  const updateTime = (newTime: string): void => {
    taskToSubmit.dueTime = newTime;
  };

  const onSubmit = () => {
    if (taskToSubmit.name.trim() === '') {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Please provide task name.'
      });
    } else {
      submitTask();
    }
  };

  const submitTask = () => {
    editTask(props.id, taskToSubmit);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Task changed'
    });
    emit('close-popup');
  };
</script>
