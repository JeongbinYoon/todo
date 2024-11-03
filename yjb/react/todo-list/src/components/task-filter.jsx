const TaskFilter = ({ onChangeFilter }) => {
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
export default TaskFilter;
