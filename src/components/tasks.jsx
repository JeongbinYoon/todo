import Task from './task';

const Tasks = ({ tasks, onDeleteTask, onChangeTask, onToggleCheck }) => {
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
