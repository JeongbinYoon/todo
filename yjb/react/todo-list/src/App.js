import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import TaskInput from './components/task-input';
import Tasks from './components/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  const onAddtasks = (text) => {
    const task = { title: text, id: uuid4(), isDone: false };
    setTasks([task, ...tasks]);
  };
  const onDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const onChangeTask = (id, title) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };
  const onToggleStatus = (id, isDone) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== id);
      const updatedTask = {
        ...prevTasks.find((task) => task.id === id),
        isDone,
      };

      return isDone
        ? [...updatedTasks, updatedTask]
        : [updatedTask, ...updatedTasks];
    });
  };
  return (
    <div className='App'>
      <div className='task-area'>
        <TaskInput onAddtasks={onAddtasks} />
        <Tasks
          tasks={tasks}
          onDeleteTask={onDeleteTask}
          onChangeTask={onChangeTask}
          onToggleStatus={onToggleStatus}
        />
      </div>
    </div>
  );
}

export default App;
