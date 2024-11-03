import Task from './task';

const Tasks = ({ tasks, onDeleteTask, onChangeTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onChangeTask={onChangeTask}
        />
      ))}
    </ul>
  );
};
export default Tasks;
