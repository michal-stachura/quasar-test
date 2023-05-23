export interface Task {
  name: string;
  completed: boolean;
  dueDate: string;
  dueTime: string;
  [key: string]: string | boolean;
}
