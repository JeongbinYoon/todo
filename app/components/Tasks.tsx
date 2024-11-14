'use client';

import Task from './Task';
import { fetchTasks } from '@/app/actions';
import { useQuery } from 'react-query';

const Tasks = () => {
  const { data: tasks, error, isLoading } = useQuery('tasks', fetchTasks);
  if (error) return <p>error..........</p>;
  if (isLoading) return <p>Loading..</p>;
  return (
    <ul className='max-h-96 overflow-scroll'>
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </ul>
  );
};

export default Tasks;
