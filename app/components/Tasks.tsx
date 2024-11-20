'use client';

import Task from './Task';
import { fetchTasks } from '@/app/actions';
import { filterAtom } from '@/store/taskAtom';
import { useAtomValue } from 'jotai';
import { useQuery } from 'react-query';

const Tasks = () => {
  const filterVal = useAtomValue(filterAtom);
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery(
    ['tasks', filterVal], // 캐시 키에 필터 값 포함
    () => fetchTasks(filterVal),
    {
      enabled: !!filterVal,
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
