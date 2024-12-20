'use client';

import { useSetAtom } from 'jotai';
import { filterAtom } from '@/store/taskAtom';
import { FilterVal } from '@/types';

const Filter = () => {
  const setFilterVal = useSetAtom(filterAtom);
  return (
    <select
      className='ml-auto h-8 text-lg'
      name='taskStatus'
      id='taskStatus'
      onChange={(e) => setFilterVal(e.target.value as FilterVal)}
    >
      <option value='all'>All</option>
      <option value='active'>Active</option>
      <option value='complete'>Complete</option>
    </select>
  );
};
export default Filter;
