import { FilterProps } from '../../types';

const Filter = ({ onChangeFilter }: FilterProps) => {
  return (
    <select
      className='ml-auto h-8 text-lg'
      name='taskStatus'
      id='taskStatus'
      onChange={(e) => onChangeFilter(e.target.value)}
    >
      <option value='all'>All</option>
      <option value='active'>Active</option>
      <option value='complete'>Complete</option>
    </select>
  );
};
export default Filter;
