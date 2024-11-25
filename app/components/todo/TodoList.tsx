import Filter from '@/app/components/todo/Filter';
import Input from '@/app/components/todo/Input';
import Tasks from '@/app/components/todo/Tasks';
import Footer from '@/app/components/todo/Footer';
import { selectedDateAtom } from '@/store/calendarAtom';
import { useAtomValue } from 'jotai';

function TodoList() {
  const selectedDate = useAtomValue(selectedDateAtom);
  return (
    <div className='flex justify-center items-start max-w-[480px] w-full'>
      <div className='flex flex-col bg-white p-6 rounded md:shadow-lg max-w-2xl w-full'>
        <h1 className='text-xl font-bold mb-4 text-center'>TO DO LIST</h1>
        <span className='text-sm mr-auto'>{selectedDate}</span>

        <Filter />
        <Input />
        <Tasks />
        <Footer />
      </div>
    </div>
  );
}

export default TodoList;
