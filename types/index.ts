export interface Task {
  title: string;
  id: number;
  isDone: boolean;
}

export interface TaskProps {
  task: Task;
}
