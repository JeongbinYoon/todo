export interface Task {
  title: string;
  id: number;
  isDone: boolean;
  scheduledAt: Date;
}

export interface TaskProps {
  task: Task;
}

export type FilterVal = 'all' | 'complete' | 'incomplete';

export interface FetchTasksParams {
  filterVal: FilterVal;
  selectedDate?: string;
}

export interface FetchTasksForMonthParams {
  startDate: Date;
  endDate: Date;
}

export interface CreateParams {
  title: string;
  selectedDate: string;
}

export interface UpdateParams {
  id: number;
  title?: string;
  isDone?: boolean;
}
