<template>
  <q-card>
    <q-form @submit="onSubmit">
      <q-card-section class="row">
        <div class="text-h6">Add Task</div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-mb-sm">
          <q-input
            filled
            autofocus
            clearable
            v-model="taskToSubmit.name"
            label="Task Name"
            class="col"
            :rules="[(val) => !!val || 'Field is required']"
          />
        </div>

        <div class="row q-mb-sm">
          <q-input
            label="Due Date"
            filled
            v-model="taskToSubmit.dueDate"
            class="col"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueDate"
                name="close"
                @click="clearDate"
                class="cursor-pointer"
              />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="taskToSubmit.dueDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div v-if="taskToSubmit.dueDate" class="row q-mb-sm">
          <q-input
            label="Due Time"
            filled
            v-model="taskToSubmit.dueTime"
            class="col"
          >
            <template v-slot:append>
              <q-icon
                v-if="taskToSubmit.dueTime"
                name="close"
                @click="taskToSubmit.dueTime = ''"
                class="cursor-pointer"
              />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="taskToSubmit.dueTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Save" type="Submit" color="primary" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useQuasar } from 'quasar';
  import { useTasksStore } from '../../../stores/store-tasks';
  const store = useTasksStore();
  const { addTask } = store;
  const $q = useQuasar();
  const emit = defineEmits(['close-popup']);

  const taskToSubmit = reactive({
    name: '',
    dueDate: '',
    dueTime: '',
    completed: false
  });

  const clearDate = () => {
    taskToSubmit.dueDate = '';
    taskToSubmit.dueTime = '';
  };

  const onSubmit = () => {
    if (taskToSubmit.name === '') {
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
    addTask(taskToSubmit);
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Task added'
    });
    emit('close-popup');
  };
</script>
