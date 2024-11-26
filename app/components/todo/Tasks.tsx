'use client';

import { useQuery } from 'react-query';
import { useAtomValue } from 'jotai';
import { Task } from '@/app/components/todo';
import { fetchTasks } from '@/app/actions';
import { selectedDateAtom } from '@/store/calendarAtom';
import { filterAtom } from '@/store/taskAtom';

const Tasks = () => {
  const filterVal = useAtomValue(filterAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const {
    data: tasks = [],
    error,
    isLoading,
  } = useQuery(
    ['tasks', filterVal, selectedDate],
    () => fetchTasks({ filterVal, selectedDate }),
    {
      enabled: !!filterVal && !!selectedDate,
    }
  );

  if (error) return <p>error..........</p>;
  if (isLoading) return <p>Loading..</p>;
  return (
    <>
      {tasks.length ? (
        <ul className='max-h-96 overflow-y-auto'>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <p className='py-4 text-center text-gray-400'>
          There&apos;s nothing to show
        </p>
      )}
    </>
  );
};

export default Tasks;
