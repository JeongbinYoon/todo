'use client';

import { deleteAllTasks } from '@/app/actions';
import { useMutation, useQueryClient } from 'react-query';

const Footer = () => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteAllTasks, {
    onSuccess: () => queryClient.invalidateQueries('tasks'),
  });
  const handleDeleteAll = () => {
    deleteMutation.mutate();
  };
  return (
    <div className='flex flex-col gap-2 mt-5'>
      <button
        className='w-fit ml-auto mr-auto text-red-800'
        onClick={handleDeleteAll}
      >
        Delete All
      </button>
    </div>
  );
};
export default Footer;
