<template>
  <q-item
    v-ripple
    clickable
    @click="toggleCompleted"
    :class="{
      'bg-orange-1': !task.completed,
      'bg-green-1': task.completed
    }"
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox
        v-model="completed"
        @input="toggleCompleted"
        class="no-pointer-events"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label :class="{ 'text-strike': task.completed }">
        <span v-html="$searchHighlight(search, task.name)"></span>
      </q-item-label>
    </q-item-section>
    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>{{
            $niceDate(task.dueDate)
          }}</q-item-label>
          <q-item-label class="row justify-end" caption>{{
            taskDueTime
          }}</q-item-label>
        </div>
      </div>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(taskId)"
          flat
          round
          dense
          color="negative"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <edit-task
        :task="task"
        :id="taskId"
        @close-popup="showEditTask = false"
      />
    </q-dialog>
  </q-item>
</template>

<script setup lang="ts">
  import { ref, PropType } from 'vue';
  import { Task } from '../../types/Task';
  import { useTasksStore } from 'src/stores/store-tasks';
  import { useSettingsStore } from 'src/stores/store-settings';
  import { date, useQuasar } from 'quasar';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import EditTask from 'components/Tasks/Modals/EditTask.vue';

  const store = useTasksStore();
  const settingsStore = useSettingsStore();
  const { fbToggleTask, fbDeleteTask } = store;
  const $q = useQuasar();
  const { search } = storeToRefs(store);
  const { settings } = settingsStore;

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
  const completed = ref(props.task.completed);
  const showEditTask = ref<boolean>(false);

  const taskDueTime = computed(() => {
    if (settings.show12HourTimeFormat) {
      const dateToChange = `${props.task.dueDate} ${props.task.dueTime}`;
      return date.formatDate(dateToChange, 'h:mm A');
    }
    return props.task.dueTime;
  });

  const showEditTaskModal = () => {
    showEditTask.value = true;
  };

  const toggleCompleted = () => {
    completed.value = !completed.value;
    fbToggleTask(props.taskId);
  };

  const promptToDelete = (taskId: string) => {
    $q.dialog({
      title: 'Confirm',
      message: `Would you like to remove task: ${props.task.name}?`,
      ok: {
        color: 'positive'
      },
      cancel: true,
      persistent: true
    }).onOk(() => {
      fbDeleteTask(taskId);
    });
  };
</script>
