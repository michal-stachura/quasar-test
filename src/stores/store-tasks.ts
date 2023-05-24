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
    },
    ID4: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023-05-30',
      dueTime: '14:30'
    },
    ID5: {
      name: 'Go to GYM!',
      completed: true,
      dueDate: '2023-06-08',
      dueTime: '11:20'
    },
    ID6: {
      name: 'Bake a cake for birthday party',
      completed: false,
      dueDate: '2023-06-12',
      dueTime: '15:00'
    },
    ID7: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023-05-30',
      dueTime: '14:30'
    },
    ID8: {
      name: 'Go to GYM!',
      completed: true,
      dueDate: '2023-06-08',
      dueTime: '11:20'
    },
    ID9: {
      name: 'Bake a cake for birthday party',
      completed: false,
      dueDate: '2023-06-12',
      dueTime: '15:00'
    },
    ID10: {
      name: 'Go to shop',
      completed: false,
      dueDate: '2023-05-30',
      dueTime: '14:30'
    },
    ID11: {
      name: 'Go to GYM!',
      completed: true,
      dueDate: '2023-06-08',
      dueTime: '11:20'
    },
    ID12: {
      name: 'Bake a cake for birthday party',
      completed: false,
      dueDate: '2023-06-12',
      dueTime: '15:00'
    }
  });

  const showModalAddTask = ref<boolean>(false);

  const search = ref<string>('');
  const sort = ref<string>('dueDate');

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

  const tasksSortedByAttr = (): Record<string, Task> => {
    const tasksOrdered: Record<string, Task> = {};
    const keysOrdered = Object.keys(tasks.value);

    keysOrdered.sort((a, b) => {
      const taskAProp =
        typeof sort.value === 'string'
          ? (tasks.value[a][sort.value] as string).toLocaleLowerCase()
          : '';
      const taskBProp =
        typeof sort.value === 'string'
          ? (tasks.value[b][sort.value] as string).toLocaleLowerCase()
          : '';

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });
    keysOrdered.forEach((taskId) => {
      tasksOrdered[taskId] = tasks.value[taskId];
    });
    return tasksOrdered;
  };

  const tasksFiltered = (): Record<string, Task> => {
    const tasksSorted: Record<string, Task> = tasksSortedByAttr();
    const filteredTasks: Record<string, Task> = {};

    if (search.value === '') return tasksSorted;

    for (const taskId in tasksSorted) {
      if (
        tasksSorted[taskId].name
          .toLowerCase()
          .includes(search.value.toLocaleLowerCase())
      ) {
        filteredTasks[taskId] = tasksSorted[taskId];
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
    sort,
    tasksSortedByAttr,
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
