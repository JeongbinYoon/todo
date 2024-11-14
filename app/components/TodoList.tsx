import Filter from '@/app/components/Filter';
import Footer from '@/app/components/Footer';
import Input from '@/app/components/Input';
import Tasks from '@/app/components/Tasks';

function TodoList() {
  return (
    <div className='flex justify-center items-start min-h-screen'>
      <div className='flex flex-col bg-white p-6 rounded md:shadow-lg max-w-2xl w-full mt-20'>
        <h1 className='text-2xl font-bold mb-4 text-center'>TODO LIST</h1>
        <Filter />
        <Input />
        <Tasks />
        <Footer />
      </div>
    </div>
  );
}

export default TodoList;
