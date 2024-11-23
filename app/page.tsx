'use client';

import Calendar from '@/app/components/calendar/Calendar';
import TodoList from '@/app/components/TodoList';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex justify-center gap-7 flex-col lg:flex-row pt-20'>
        <TodoList />
        <Calendar />
      </div>
    </QueryClientProvider>
  );
}
