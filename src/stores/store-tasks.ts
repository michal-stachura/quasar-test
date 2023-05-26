import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Task } from '../types/Task';
import { firebaseDb, firebaseAuth } from 'src/boot/firebase';
import { uid } from 'quasar';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Record<string, Task>>({});

  const showModalAddTask = ref<boolean>(false);

  const search = ref<string>('');
  const sort = ref<string>('dueDate');

  const fbAddTask = (task: Task): void => {
    const id = uid();
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;

    if (userId && task) {
      const taskRef = firebaseDb.ref(`tasks/${userId}/${id}`);
      taskRef.set(task);
      tasks.value[id] = task;
    }
  };

  const fbEditTask = (id: string, updatedTask: Task): void => {
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;

    if (userId && id && updatedTask) {
      const taskRef = firebaseDb.ref(`tasks/${userId}/${id}`);
      taskRef.update(updatedTask);
      tasks.value[id] = updatedTask;
    }
  };

  const fbToggleTask = (id: string): void => {
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;

    if (userId && id) {
      const payload = {
        ...tasks.value[id],
        completed: !tasks.value[id]['completed']
      };

      fbEditTask(id, payload);
    }
  };

  const fbDeleteTask = (taskId: string): void => {
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;

    if (userId && taskId) {
      const taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`);
      taskRef.remove();
      delete tasks.value[taskId];
    }
  };

  const fbReadData = (): void => {
    const userId: string | undefined =
      firebaseAuth.currentUser?.uid || undefined;
    if (userId) {
      const usersTasks = firebaseDb.ref(`tasks/${userId}`);

      // child added
      usersTasks.on('child_added', (snapshot) => {
        const task = snapshot.val() as Task;
        const id = snapshot.key;
        if (id && task) {
          tasks.value[id] = task;
        }
      });

      // child edited
      usersTasks.on('child_changed', (snapshot) => {
        const updatedTask = snapshot.val() as Task;
        const id = snapshot.key;
        if (id && updatedTask) {
          tasks.value[id] = updatedTask;
        }
      });

      // child removed
      usersTasks.on('child_removed', (snapshot) => {
        const taskId = snapshot.key;
        if (taskId) {
          delete tasks.value[taskId];
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

  return {
    showModalAddTask,
    search,
    sort,
    tasksSortedByAttr,
    tasksFiltered,
    setShowAddTask,
    tasksTodo,
    tasksCompleted,
    fbReadData,
    fbAddTask,
    fbEditTask,
    fbToggleTask,
    fbDeleteTask
  };
});
