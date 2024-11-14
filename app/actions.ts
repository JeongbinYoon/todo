'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchTasks = async () => {
  return await prisma.todo.findMany();
};

export const createTask = async (title: string) => {
  return await prisma.todo.create({
    data: { title, isDone: false },
  });
};

export const updateTask = async ({
  id,
  title,
  isDone,
}: {
  id: number;
  title?: string;
  isDone?: boolean;
}) => {
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
