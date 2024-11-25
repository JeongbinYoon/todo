'use server';

import { Task } from '@/types';
import { PrismaClient } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';

const prisma = new PrismaClient();

export const fetchTasks = async (
  filterVal?: string,
  selectedDate?: string
): Promise<Task[]> => {
  return await prisma.todo.findMany({
    where: {
      ...(filterVal === 'all' ? {} : { isDone: filterVal === 'complete' }), // filterVal에 따른 필터링
      ...(selectedDate && {
        // selectedDate에 해당하는 날의 todo 필터링
        scheduledAt: {
          gte: startOfDay(new Date(selectedDate)),
          lte: endOfDay(new Date(selectedDate)),
        },
      }),
    },
    orderBy: {
      id: 'desc',
    },
  });
};

export const createTask = async (title: string) => {
  return await prisma.todo.create({
    data: { title, isDone: false },
  });
};

interface UpdateParams {
  id: number;
  title?: string;
  isDone?: boolean;
}

export const updateTask = async ({ id, title, isDone }: UpdateParams) => {
  return await prisma.todo.update({
    where: { id },
    data: { title, isDone },
  });
};

export const deleteTask = async (id: number) => {
  const task = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!task) return;

  return await prisma.todo.delete({
    where: { id },
  });
};

export const deleteAllTasks = async () => {
  return await prisma.todo.deleteMany();
};
