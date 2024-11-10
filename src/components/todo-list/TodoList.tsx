import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import Tasks from './Tasks';
import Input from './Input';
import Footer from './Footer';
import Filter from './Filter';
import { Task } from '../../types';

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const onAddtasks = (text: string) => {
    const task = { title: text, id: uuid4(), isDone: false };
    handleSetTasks([task, ...tasks]);
  };
  const onDeleteTask = (id: string) => {
    const remainTasks = tasks.filter((task) => task.id !== id);
    remainTasks.length ? handleSetTasks(remainTasks) : setTasks([]);
  };
  const onDeleteTasksAll = () => setTasks([]);

  const onChangeTask = (id: string, title: string) => {
    handleSetTasks(
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  const onToggleCheck = (id: string, isDone: boolean) => {
    // 완료 항목은 뒤로, 해제 항목은 앞으로
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const targetTask = tasks.find((task) => task.id === id);

    if (targetTask) {
      const updatedTask = { ...targetTask, isDone };
      handleSetTasks(
        isDone ? [...updatedTasks, updatedTask] : [updatedTask, ...updatedTasks]
      );
    }
  };

  const onChangeFilter = (status: string) => setSelectedStatus(status);

  const handleSetTasks = useCallback(
    (items = tasks) => {
      // 필터 변경된 경우 변경될 tasks 파라미터 없음. 기존 tasks 참조
      const targetTasks = items.length > 0 ? items : tasks;
      setTasks(targetTasks);

      const statusObj = {
        all: 'all',
        active: false,
        complete: true,
      };

      const status = statusObj[selectedStatus as keyof typeof statusObj];
      const newTasks = targetTasks.filter((task) =>
        status === 'all' ? tasks : task.isDone === status
      );

      setFilteredTasks(newTasks);
    },
    [tasks, selectedStatus]
  );

  useEffect(() => {
    handleSetTasks();
  }, [selectedStatus, handleSetTasks]);

  return (
    <div className='flex justify-center items-start min-h-screen'>
      <div className='flex flex-col bg-white p-6 rounded shadow-lg max-w-2xl w-full mt-20'>
        <h1 className='text-2xl font-bold mb-4 text-center'>TODO LIST</h1>
        <Filter onChangeFilter={onChangeFilter} />
        <Input onAddtasks={onAddtasks} />
        <Tasks
          tasks={filteredTasks}
          onDeleteTask={onDeleteTask}
          onChangeTask={onChangeTask}
          onToggleCheck={onToggleCheck}
        />
        <Footer tasks={tasks} onDeleteTasksAll={onDeleteTasksAll} />
      </div>
    </div>
  );
}

export default TodoList;
