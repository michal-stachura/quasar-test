<template>
  <q-page padding>
    <q-list bordered separator>
      <q-item v-for="task in tasks" :key="task.id" v-ripple clickable @click="task.completed = !task.completed"
        :class="{ 'bg-orange-1': !task.completed, 'bg-green-1': task.completed }">
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="{ 'text-strike': task.completed }">{{ task.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs" />
            </div>
            <div class="column">
              <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
              <q-item-label class="row justify-end" caption>{{ task.dueTime }}</q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tasks = ref([
  {
    id: 1,
    name: 'Go to shop',
    completed: false,
    dueDate: '2023-05-30',
    dueTime: '14:30'
  },
  {
    id: 2,
    name: 'Go to GYM',
    completed: false,
    dueDate: '2023-06-08',
    dueTime: '11:20'
  },
  {
    id: 3,
    name: 'Bake a cake for birthday with a sign of 88 years old for my grandpa and grandma',
    completed: false,
    dueDate: '2023-06-12',
    dueTime: '15:00'
  }
])
</script>
