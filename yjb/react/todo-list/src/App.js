import { useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import TodoInput from './components/todo-input';
import TodoList from './components/todo-list';

function App() {
  const [todos, setTodos] = useState([]);
  const handleSetTodos = (text) => {
    const task = { title: text, id: uuid4() };
    console.log(task);
    setTodos([...todos, task]);
  };
  return (
    <div className='App'>
      <div className='todo-area'>
        <TodoInput handleSetTodos={handleSetTodos} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;
