import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from '../types/Task';
import { firebaseDb, firebaseAuth } from 'src/boot/firebase';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Record<string, Task>>({});

  const showModalAddTask = ref<boolean>(false);

  const search = ref<string>('');
  const sort = ref<string>('dueDate');

  const fbReadData = (): void => {
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;
    if (userId) {
      const usersTasks = firebaseDb.ref(`tasks/${userId}`);

      // child added
      usersTasks.on('child_added', (snapshot) => {
        const task = snapshot.val() as Task;
        const taskId = snapshot.key;
        if (taskId && task) {
          addTask(taskId, task);
        }
      });

      // child edited
      usersTasks.on('child_changed', (snapshot) => {
        const task = snapshot.val() as Task;
        const taskId = snapshot.key;
        if (taskId && task) {
          editTask(taskId, task);
        }
      });

      // child removed
      usersTasks.on('child_removed', (snapshot) => {
        const taskId = snapshot.key;
        if (taskId) {
          deleteTask(taskId);
        }
      });
    }
  };

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
      const taskA: Task = tasks.value[a];
      const taskB: Task = tasks.value[b];

      const taskAProp = taskA[sort.value as keyof Task];
      const taskBProp = taskB[sort.value as keyof Task];

      if (taskAProp !== undefined && taskBProp !== undefined) {
        if (typeof taskAProp === 'string' && typeof taskBProp === 'string') {
          const taskAPropLower = taskAProp.toLocaleLowerCase();
          const taskBPropLower = taskBProp.toLocaleLowerCase();

          if (taskAPropLower > taskBPropLower) return 1;
          else if (taskAPropLower < taskBPropLower) return -1;
        } else if (
          typeof taskAProp === 'boolean' &&
          typeof taskBProp === 'boolean'
        ) {
          if (taskAProp && !taskBProp) return 1;
          else if (!taskAProp && taskBProp) return -1;
        } // Add more conditions for different types if necessary
      } else if (taskAProp === undefined && taskBProp !== undefined) {
        return -1;
      } else if (taskAProp !== undefined && taskBProp === undefined) {
        return 1;
      }

      return 0;
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

  function toggleTask(taskId: string): void {
    tasks.value[taskId].completed = !tasks.value[taskId].completed;
  }

  function deleteTask(taskId: string): void {
    delete tasks.value[taskId];
  }

  function addTask(taskId: string, task: Task): void {
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
    editTask,
    fbReadData
  };
});
