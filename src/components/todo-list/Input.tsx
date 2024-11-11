import { v4 as uuid4 } from 'uuid';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

import { useAtom } from 'jotai';
import { tasksAtom } from '../../store/taskAtom';

const Input = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useAtom(tasksAtom);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([{ title, id: uuid4(), isDone: false }, ...tasks]);
    setTitle('');
  };

  return (
    <form onSubmit={submit} className='flex my-3'>
      <input
        type='text'
        className='w-full h-12 pl-3 text-2xl'
        placeholder='Add task..'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className='p-3 pr-0 text-2xl' onClick={submit}>
        <IoIosAddCircle />
      </button>
    </form>
  );
};
export default Input;
