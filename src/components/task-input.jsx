import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const TaskInput = ({ onAddtasks }) => {
  const [title, setTitle] = useState('');
  const onSubmit = () => {
    if (!title) return;
    onAddtasks(title);
    setTitle('');
  };

  return (
    <div className='flex my-3'>
      <input
        type='text'
        className='w-full h-12 pl-3 text-2xl'
        placeholder='Add task..'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='p-3 pr-0 text-2xl' onClick={onSubmit}>
        <FaPlus />
      </button>
    </div>
  );
};
export default TaskInput;
