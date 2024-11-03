import { MdOutlineEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
const Todo = ({ todo }) => {
  return (
    <li>
      <input type='checkbox' />
      <span>{todo.title}</span>
      <button>
        <MdOutlineEdit />
      </button>
      <button>
        <AiOutlineDelete />
      </button>
    </li>
  );
};
export default Todo;
