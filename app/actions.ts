'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (title: string) => {
  return await prisma.todo.create({
    data: { title, isDone: false },
  });
};
