import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoSaveOutline } from 'react-icons/io5';
import { useState } from 'react';

const Task = ({ task, onDeleteTask, onChangeTask, onToggleCheck }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState('');

  const handleEdit = () => {
    setIsEdit(true);
    setEditText(task.title);
  };

  const handleSave = () => {
    setIsEdit(false);
    onChangeTask(task.id, editText);
  };

  const handleToggleStatus = (isDone) => {
    onToggleCheck(task.id, isDone);
  };
  return (
    <li>
      <input
        type='checkbox'
        onChange={(e) => handleToggleStatus(e.target.checked)}
        checked={task.isDone}
      />
      {isEdit ? (
        <>
          <input
            type='text'
            value={editText}
            placeholder='edit your task'
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>
            <IoSaveOutline />
          </button>
        </>
      ) : (
        <>
          <span className={`${task.isDone ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <button onClick={handleEdit}>
            <MdOutlineEdit />
          </button>
        </>
      )}
      <button>
        <AiOutlineDelete onClick={() => onDeleteTask(task.id)} />
      </button>
    </li>
  );
};
export default Task;
