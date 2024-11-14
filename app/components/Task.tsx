'use client';
import { CiCircleMinus } from 'react-icons/ci';
import { useState, useEffect, useRef, useCallback } from 'react';
import { TaskProps } from '@/types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask, updateTask } from '@/app/actions';

const Task = ({ task }: TaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');
  const taskRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries('tasks'), // 'tasks' 쿼리의 데이터를 무효화
  });
  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries('tasks'),
  });

  const onToggleCheck = (isDone: boolean) => {
    updateTaskMutation.mutate({ id: task.id, isDone });
  };

  const handleEditTask = () => {
    setIsEdit(true);
    setEditText(task.title);
    setTimeout(() => inputRef.current?.focus(), 0); // 편집 시  input focus
  };

  const handleSave = useCallback(() => {
    if (!editText.trim()) return;

    setIsEdit(false);
    updateTaskMutation.mutate({ id: task.id, title: editText.trim() });
  }, [updateTaskMutation, editText, task.id]);

  const handleDelete = (id: number) => {
    deleteTaskMutation.mutate(id);
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
        onChange={(e) => onToggleCheck(e.target.checked)}
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
        onClick={() => handleDelete(task.id)}
      >
        <CiCircleMinus />
      </button>
    </li>
  );
};
export default Task;
