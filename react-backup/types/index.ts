export interface Task {
  title: string;
  id: string;
  isDone: boolean;
}

export interface TaskProps {
  task: Task;
}
