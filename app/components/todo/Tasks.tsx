'use client';

import { selectedDateAtom } from '@/store/calendarAtom';
import Task from './Task';
import { fetchTasks } from '@/app/actions';
import { filterAtom, tasksAtom } from '@/store/taskAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from 'react-query';

const Tasks = () => {
  const filterVal = useAtomValue(filterAtom);
  const selectedDate = useAtomValue(selectedDateAtom);
  const setTasks = useSetAtom(tasksAtom);
  const {
    data: tasks = [],
    error,
    isLoading,
  } = useQuery(
    ['tasks', filterVal, selectedDate],
    () => fetchTasks(filterVal, selectedDate),
    {
      enabled: !!filterVal && !!selectedDate,
      onSuccess: () => {
        setTasks(tasks);
      },
    }
  );

  if (error) return <p>error..........</p>;
  if (isLoading) return <p>Loading..</p>;
  return (
    <ul className='max-h-96 overflow-scroll'>
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </ul>
  );
};

export default Tasks;
