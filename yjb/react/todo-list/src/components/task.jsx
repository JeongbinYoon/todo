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
    <li
      className={`flex items-center h-12 px-5 text-2xl ${
        isEdit ? 'bg-gray-100' : ''
      }`}
    >
      <input
        type='checkbox'
        className='size-5 mr-3'
        onChange={(e) => handleToggleStatus(e.target.checked)}
        checked={task.isDone}
      />
      {isEdit ? (
        <>
          <input
            type='text'
            value={editText}
            className={`w-full ${isEdit ? 'bg-gray-100' : ''}`}
            placeholder='edit your task'
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className='ml-auto p-3' onClick={handleSave}>
            <IoSaveOutline />
          </button>
        </>
      ) : (
        <>
          <span
            className={`${task.isDone ? 'line-through text-gray-400' : ''}`}
          >
            {task.title}
          </span>
          <button
            className={`ml-auto p-3 ${task.isDone ? ' text-gray-400' : ''}`}
            disabled={task.isDone}
            onClick={handleEdit}
          >
            <MdOutlineEdit />
          </button>
        </>
      )}
      <button
        className={`p-3 pr-0 ${task.isDone ? ' text-gray-400' : ''}`}
        onClick={() => onDeleteTask(task.id)}
      >
        <AiOutlineDelete />
      </button>
    </li>
  );
};
export default Task;
