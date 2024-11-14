import { CiCircleMinus } from 'react-icons/ci';
import { useState, useEffect, useRef, useCallback } from 'react';
import { TaskProps } from '../../types';
import { useAtom } from 'jotai';
import { tasksAtom } from '../../store/taskAtom';

const Task = ({ task }: TaskProps) => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');
  const taskRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setTimeout(() => inputRef.current?.focus(), 0); // 편집 시  input focus
  };

  const changeTask = useCallback(
    (id: string, title: string) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
      );
    },
    [setTasks]
  );

  const handleSave = useCallback(() => {
    if (isEdit) {
      setIsEdit(false);
      if (!editText.trim()) return;
      changeTask(task.id, editText.trim());
    }
  }, [editText, changeTask, task.id, isEdit]);

  const deleteTask = (id: string) => {
    const remainTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainTasks);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEdit &&
        taskRef.current &&
        !taskRef.current.contains(event.target as Node)
      ) {
        handleSave();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleSave, isEdit]);
  return (
    <li
      ref={taskRef}
      className={`flex items-center min-h-12 text-2xl ${
        isEdit ? 'bg-gray-100' : ''
      }`}
    >
      <input
        type='checkbox'
        className='min-w-5 min-h-5 mr-3'
        onChange={(e) => onToggleCheck(task.id, e.target.checked)}
        checked={task.isDone}
      />
      {isEdit ? (
        <input
          ref={inputRef}
          type='text'
          value={editText}
          className={`w-full ${isEdit ? 'bg-gray-100' : ''}`}
          placeholder='edit your task'
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span
          className={`w-full ${
            task.isDone ? 'line-through text-gray-400' : ''
          }`}
          onClick={handleEditTask}
        >
          {task.title}
        </span>
      )}
      <button
        className={`p-3 pr-0 ml-auto ${task.isDone ? ' text-gray-400' : ''}`}
        onClick={() => deleteTask(task.id)}
      >
        <CiCircleMinus />
      </button>
    </li>
  );
};
export default Task;
