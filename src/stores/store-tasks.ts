import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from '../types/Task';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Record<string, Task>>({
    // ID1: {
    //   name: 'Go to shop',
    //   completed: false,
    //   dueDate: '2023-05-30',
    //   dueTime: '14:30'
    // },
    // ID2: {
    //   name: 'Go to GYM!',
    //   completed: false,
    //   dueDate: '2023-06-08',
    //   dueTime: '11:20'
    // },
    // ID3: {
    //   name: 'Bake a cake for birthday with a sign of 88 years old for my grandpa and grandma',
    //   completed: false,
    //   dueDate: '2023-06-12',
    //   dueTime: '15:00'
    // }
  });

  function getNextID(): string {
    const taskIDs = Object.keys(tasks.value);
    const lastID =
      taskIDs.length > 0 ? parseInt(taskIDs[taskIDs.length - 1].slice(2)) : 0;
    const nextID = lastID + 1;
    return 'ID' + nextID;
  }

  function toggleTask(taskId: string): void {
    tasks.value[taskId].completed = !tasks.value[taskId].completed;
  }

  function deleteTask(taskId: string): void {
    delete tasks.value[taskId];
  }

  function addTask(task: Task): void {
    const taskId = getNextID();
    tasks.value[taskId] = task;
  }

  return { tasks, toggleTask, deleteTask, addTask };
});
