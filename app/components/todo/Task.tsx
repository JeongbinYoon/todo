'use client';
import { CiCircleMinus } from 'react-icons/ci';
import { useState, useEffect, useRef, useCallback } from 'react';
import { TaskProps } from '@/types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask, updateTask } from '@/app/actions';

const Task = ({ task }: TaskProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');
  const [isHover, setIsHover] = useState(false);
  const taskRef = useRef<HTMLLIElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks'); // 'tasks' 쿼리의 데이터를 무효화
      queryClient.invalidateQueries('tasksForMonth');
    },
  });
  const updateTaskMutation = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('tasksForMonth');
    },
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
      className={`flex items-start px-4 py-2 text-2xl mt-4 cursor-pointer rounded-md transition-colors duration-300 ${
        isEdit ? 'bg-gray-100' : 'hover:bg-gray-100'
      }`}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* checkbox */}
      <input
        type='checkbox'
        className='min-w-5 min-h-5 mr-3 mt-1.5'
        onChange={(e) => onToggleCheck(e.target.checked)}
        checked={task.isDone}
      />
      {isEdit ? (
        // 수정 중 O
        <input
          ref={inputRef}
          type='text'
          value={editText}
          className={`w-full ${isEdit && 'bg-gray-100'}`}
          placeholder='edit your task'
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        // 수정 중 X
        <span
          className={`w-full ${task.isDone && 'line-through text-gray-400'}`}
          onClick={handleEditTask}
        >
          {task.title}
        </span>
      )}

      {/* 삭제 버튼 */}
      {!isEdit && (
        <button
          className={`mt-1 ml-auto transition-all duration-200
          ${
            isHover
              ? 'opacity-100 visibility-visible pointer-events-auto'
              : 'opacity-0 visibility-hidden pointer-events-none'
          }
        `}
          onClick={() => handleDelete(task.id)}
        >
          <CiCircleMinus />
        </button>
      )}
    </li>
  );
};
export default Task;
