import { v4 as uuid4 } from 'uuid';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useAtom } from 'jotai';
import { tasksAtom } from '../../store/taskAtom';

const Input = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useAtom(tasksAtom);

  const onSubmit = () => {
    if (!title) return;
    addTask(title);
    setTitle('');
  };

  const addTask = (text: string) => {
    const task = { title: text, id: uuid4(), isDone: false };
    setTasks([task, ...tasks]);
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
export default Input;
