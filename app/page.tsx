'use client';

import TodoList from '@/app/components/TodoList';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />;
    </QueryClientProvider>
  );
}
