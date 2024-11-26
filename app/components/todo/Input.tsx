'use client';

import { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { useAtomValue } from 'jotai';
import { createTask } from '@/app/actions';
import { selectedDateAtom } from '@/store/calendarAtom';

const Input = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const selectedDate = useAtomValue(selectedDateAtom);

  // App.tsx에서 Provider로 설정했으니 또 인스턴스 만들지 않음
  const queryClient = useQueryClient();
  const mutation = useMutation(createTask, {
    onSuccess: () => {
      /*
       * invalidateQueries:
       * 캐시된 데이터 무효화하여 해당 데이터 새로고침 (주로 데이터 변경되었을 때 사용)
       */
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('tasksForMonth');
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task');
      return;
    }

    mutation.mutate({ title, selectedDate });
    setTitle('');
  };

  useEffect(() => {
    if (title) setError('');
  }, [title]);

  return (
    <form onSubmit={handleCreate} className='flex flex-col my-3'>
      <div className='flex'>
        <input
          type='text'
          className='w-full h-12 pl-3 text-2xl border-b-2'
          placeholder='Add task..'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title && (
          <button className='p-3 pr-0 text-2xl' onClick={handleCreate}>
            <IoIosAddCircle />
          </button>
        )}
      </div>
      {error && <p className='text-red-800 mt-2 pl-3'>{error}</p>}
    </form>
  );
};
export default Input;
