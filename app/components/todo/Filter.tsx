'use client';

import { filterAtom } from '@/store/taskAtom';
import { useSetAtom } from 'jotai';

const Filter = () => {
  const setFilterVal = useSetAtom(filterAtom);
  return (
    <select
      className='ml-auto h-8 text-lg'
      name='taskStatus'
      id='taskStatus'
      onChange={(e) => setFilterVal(e.target.value)}
    >
      <option value='all'>All</option>
      <option value='active'>Active</option>
      <option value='complete'>Complete</option>
    </select>
  );
};
export default Filter;
