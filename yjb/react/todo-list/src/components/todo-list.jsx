import Todo from './todo';

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
export default TodoList;
