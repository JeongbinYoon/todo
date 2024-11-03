import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const TodoInput = ({ handleSetTodos }) => {
  const [title, setTitle] = useState();
  const onSubmit = () => {
    handleSetTodos(title);
    setTitle('');
  };
  return (
    <>
      <input
        type='text'
        placeholder='Add task..'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={onSubmit}>
        <FaPlus />
      </button>
    </>
  );
};
export default TodoInput;
