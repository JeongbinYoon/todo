const TaskFooter = ({ tasks, onDeleteTasksAll }) => {
  return (
    <div className='flex flex-col mt-5'>
      <span>{tasks.filter((task) => !task.isDone).length} task remaining</span>
      <button
        className='w-fit ml-auto mr-auto text-red-800'
        onClick={onDeleteTasksAll}
      >
        Delete All
      </button>
    </div>
  );
};
export default TaskFooter;
