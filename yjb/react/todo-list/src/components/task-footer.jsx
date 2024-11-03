const TaskFooter = ({ tasks, onDeleteTasksAll }) => {
  return (
    <>
      <span>남은 Task{tasks.filter((task) => !task.isDone).length}</span>
      <button onClick={onDeleteTasksAll}>Delete All</button>
    </>
  );
};
export default TaskFooter;
