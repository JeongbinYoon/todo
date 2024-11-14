'use client';

import { tasksAtom } from '@/store/taskAtom';
import { useAtom } from 'jotai';

const Footer = () => {
  const [tasks, setTaks] = useAtom(tasksAtom);
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <span>{tasks.filter((task) => !task.isDone).length} tasks remaining</span>
      <button
        className='w-fit ml-auto mr-auto text-red-800'
        onClick={() => setTaks([])}
      >
        Delete All
      </button>
    </div>
  );
};
export default Footer;
