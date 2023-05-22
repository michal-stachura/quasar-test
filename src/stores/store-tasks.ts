import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from '../types/Task';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Record<string, Task>>({
    ID1: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023-05-30',
      dueTime: '14:30'
    },
    ID2: {
      name: 'Go to GYM!',
      completed: true,
      dueDate: '2023-06-08',
      dueTime: '11:20'
    },
    ID3: {
      name: 'Bake a cake for birthday party',
      completed: false,
      dueDate: '2023-06-12',
      dueTime: '15:00'
    }
  });

  const showModalAddTask = ref<boolean>(false);

  const search = ref<string>('');

  const setShowAddTask = (trueOrFalse: boolean): void => {
    showModalAddTask.value = trueOrFalse;
  };

  const tasksTodo = () => {
    const filteredTasks: Record<string, Task> = tasksFiltered();
    const tasks: Record<string, Task> = {};
    for (const taskId in filteredTasks) {
      if (filteredTasks[taskId].completed === false) {
        tasks[taskId] = filteredTasks[taskId];
      }
    }
    return tasks;
  };

  const tasksCompleted = () => {
    const filteredTasks: Record<string, Task> = tasksFiltered();

    const tasks: Record<string, Task> = {};
    for (const taskId in filteredTasks) {
      if (filteredTasks[taskId].completed === true) {
        tasks[taskId] = filteredTasks[taskId];
      }
    }
    return tasks;
  };

  const tasksFiltered = (): Record<string, Task> => {
    const filteredTasks: Record<string, Task> = {};

    if (search.value === '') return tasks.value;

    for (const taskId in tasks.value) {
      if (
        tasks.value[taskId].name
          .toLowerCase()
          .includes(search.value.toLocaleLowerCase())
      ) {
        filteredTasks[taskId] = tasks.value[taskId];
      }
    }

    return filteredTasks;
  };

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

  function editTask(taskId: string, task: Task): void {
    tasks.value[taskId] = task;
  }

  return {
    showModalAddTask,
    search,
    tasksFiltered,
    setShowAddTask,
    tasksTodo,
    tasksCompleted,
    toggleTask,
    deleteTask,
    addTask,
    editTask
  };
});
