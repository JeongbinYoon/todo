import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoSaveOutline } from 'react-icons/io5';
import { useState } from 'react';
import { TaskProps } from '../../types';
import { useAtom } from 'jotai';
import { tasksAtom } from '../../store/taskAtom';

const Task = ({ task }: TaskProps) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');

  const onToggleCheck = (id: string, isDone: boolean) => {
    // 완료 항목은 뒤로, 해제 항목은 앞으로
    const updatedTasks = tasks.filter((task) => task.id !== id);
    const targetTask = tasks.find((task) => task.id === id);

    if (targetTask) {
      const updatedTask = { ...targetTask, isDone };
      setTasks(
        isDone ? [...updatedTasks, updatedTask] : [updatedTask, ...updatedTasks]
      );
    }
  };

  const handleEditTask = () => {
    setIsEdit(true);
    setEditText(task.title);
  };

  const handleSave = () => {
    setIsEdit(false);
    changeTask(task.id, editText);
  };

  const changeTask = (id: string, title: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
  };

  const deleteTask = (id: string) => {
    const remainTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainTasks);
  };

  return (
    <li
      className={`flex items-center h-12 px-5 text-2xl ${
        isEdit ? 'bg-gray-100' : ''
      }`}
    >
      <input
        type='checkbox'
        className='size-5 mr-3'
        onChange={(e) => onToggleCheck(task.id, e.target.checked)}
        checked={task.isDone}
      />
      {isEdit ? (
        <>
          <input
            type='text'
            value={editText}
            className={`w-full ${isEdit ? 'bg-gray-100' : ''}`}
            placeholder='edit your task'
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className='ml-auto p-3' onClick={handleSave}>
            <IoSaveOutline />
          </button>
        </>
      ) : (
        <>
          <span
            className={`${task.isDone ? 'line-through text-gray-400' : ''}`}
          >
            {task.title}
          </span>
          <button
            className={`ml-auto p-3 ${task.isDone ? ' text-gray-400' : ''}`}
            disabled={task.isDone}
            onClick={handleEditTask}
          >
            <MdOutlineEdit />
          </button>
        </>
      )}
      <button
        className={`p-3 pr-0 ${task.isDone ? ' text-gray-400' : ''}`}
        onClick={() => deleteTask(task.id)}
      >
        <AiOutlineDelete />
      </button>
    </li>
  );
};
export default Task;
