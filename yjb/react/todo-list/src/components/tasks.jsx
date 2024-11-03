import Task from './task';

const Tasks = ({ tasks, onDeleteTask, onChangeTask, onToggleStatus }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onChangeTask={onChangeTask}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
};
export default Tasks;
