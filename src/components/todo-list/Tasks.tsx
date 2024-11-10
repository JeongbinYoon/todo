import { TasksProps } from '../../types';
import Task from './Task';

const Tasks = ({
  tasks,
  onDeleteTask,
  onChangeTask,
  onToggleCheck,
}: TasksProps) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onChangeTask={onChangeTask}
          onToggleCheck={onToggleCheck}
        />
      ))}
    </ul>
  );
};
export default Tasks;
