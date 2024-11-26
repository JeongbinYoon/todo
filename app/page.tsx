'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Ephesis } from 'next/font/google';
import Calendar from '@/app/components/calendar/Calendar';
import { TodoList } from '@/app/components/todo';

const ephesis = Ephesis({ subsets: ['latin'], weight: ['400'] });

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className={`text-center mt-20 mb-10 text-5xl ${ephesis.className}`}>
        Monthly Planner
      </h1>
      <div className='flex justify-center items-center lg:items-start gap-7 flex-col lg:flex-row'>
        <TodoList />
        <Calendar />
      </div>
    </QueryClientProvider>
  );
}
