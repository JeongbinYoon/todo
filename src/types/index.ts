export interface Task {
  title: string;
  id: string;
  isDone: boolean;
}

export interface TasksProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onChangeTask: (id: string, title: string) => void;
  onToggleCheck: (id: string, isDone: boolean) => void;
}
export interface TaskProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onChangeTask: (id: string, title: string) => void;
  onToggleCheck: (id: string, isDone: boolean) => void;
}
export interface InputProps {
  onAddtasks: (text: string) => void;
}
export interface FooterProps {
  tasks: Task[];
  onDeleteTasksAll: (text: string) => void;
}
export interface FilterProps {
  onChangeFilter: (status: string) => void;
}
