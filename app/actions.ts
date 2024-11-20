'use server';

import { Task } from '@/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchTasks = async (filterVal?: string): Promise<Task[]> => {
  return await prisma.todo.findMany({
    where: filterVal === 'all' ? {} : { isDone: filterVal === 'complete' },
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
  return await prisma.todo.delete({
    where: { id },
  });
};

export const deleteAllTasks = async () => {
  return await prisma.todo.deleteMany();
};
