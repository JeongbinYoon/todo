import { useAtom } from 'jotai';
import Task from './Task';
import { filterAtom, tasksAtom } from '../../store/taskAtom';

const Tasks = () => {
  const [tasks] = useAtom(tasksAtom);
  const [filterVal] = useAtom(filterAtom);

  // 필터링
  const filteredTasks = tasks.filter(
    (task) => filterVal === 'all' || task.isDone === (filterVal === 'complete')
  );

  return (
    <ul className='max-h-96 overflow-scroll'>
      {filteredTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
};

export default Tasks;
