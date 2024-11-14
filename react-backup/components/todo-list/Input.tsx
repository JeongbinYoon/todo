import { v4 as uuid4 } from 'uuid';
import { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';

import { useAtom } from 'jotai';
import { tasksAtom } from '../../store/taskAtom';

const Input = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task');
      return;
    }
    setTasks([{ title, id: uuid4(), isDone: false }, ...tasks]);
    setTitle('');
  };

  useEffect(() => {
    title && setError('');
  }, [title]);

  return (
    <form onSubmit={submit} className='flex flex-col my-3'>
      <div className='flex'>
        <input
          type='text'
          className='w-full h-12 pl-3 text-2xl border-b-2'
          placeholder='Add task..'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title && (
          <button className='p-3 pr-0 text-2xl' onClick={submit}>
            <IoIosAddCircle />
          </button>
        )}
      </div>
      {error && <p className='text-red-800 mt-2 pl-3'>{error}</p>}
    </form>
  );
};
export default Input;
