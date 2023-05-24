import { Task } from 'src/types/Task';

export function clearDate(taskToSubmit: Task) {
  taskToSubmit.dueDate = '';
  taskToSubmit.dueTime = '';
}

export function onSubmit(
  taskToSubmit: Task,
  submitTask: () => void,
  $q: unknown
) {
  if (taskToSubmit.name.trim() === '') {
    ($q as { notify: (params: object) => void }).notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Please provide task name.'
    });
  } else {
    submitTask();
  }
}

export function updateDate(taskToSubmit: Task, newDate: string) {
  console.log(newDate);
  taskToSubmit.dueDate = newDate;
}

export function updateTime(taskToSubmit: Task, newTime: string) {
  console.log(newTime);
  taskToSubmit.dueTime = newTime;
}
