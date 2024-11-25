export interface Task {
  title: string;
  id: number;
  isDone: boolean;
  scheduledAt: Date;
}

export interface TaskProps {
  task: Task;
}
