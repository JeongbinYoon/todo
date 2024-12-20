'use server';

import {
  CreateParams,
  FetchTasksForMonthParams,
  FetchTasksParams,
  Task,
  UpdateParams,
} from '@/types';
import { PrismaClient } from '@prisma/client';
import { endOfDay, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const prisma = new PrismaClient();
const TIMEZONE = 'Asia/Seoul';

export const fetchTasks = async ({
  filterVal,
  selectedDate,
}: FetchTasksParams): Promise<Task[]> => {
  return await prisma.todo.findMany({
    where: {
      ...(filterVal === 'all' ? {} : { isDone: filterVal === 'complete' }), // filterVal에 따른 필터링
      ...(selectedDate && {
        // selectedDate에 해당하는 날의 todo 필터링
        scheduledAt: {
          gte: toZonedTime(startOfDay(new Date(selectedDate)), TIMEZONE),
          lte: toZonedTime(endOfDay(new Date(selectedDate)), TIMEZONE),
        },
      }),
    },
    orderBy: {
      id: 'desc',
    },
  });
};

// 월별 task 조회
export const fetchTasksForMonth = async ({
  startDate,
  endDate,
}: FetchTasksForMonthParams): Promise<Task[]> => {
  return await prisma.todo.findMany({
    where: {
      scheduledAt: {
        gte: toZonedTime(startDate, TIMEZONE),
        lte: toZonedTime(endDate, TIMEZONE),
      },
    },
    orderBy: {
      scheduledAt: 'desc',
    },
  });
};

export const createTask = async ({ title, selectedDate }: CreateParams) => {
  const scheduledAt = toZonedTime(new Date(selectedDate), TIMEZONE);
  const now = toZonedTime(new Date(), TIMEZONE);
  scheduledAt.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  return await prisma.todo.create({
    data: { title, isDone: false, scheduledAt },
  });
};

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

export const deleteAllTasks = async (selectedDate?: string) => {
  if (!selectedDate) return;

  return await prisma.todo.deleteMany({
    where: {
      scheduledAt: {
        gte: toZonedTime(startOfDay(new Date(selectedDate)), TIMEZONE),
        lte: toZonedTime(endOfDay(new Date(selectedDate)), TIMEZONE),
      },
    },
  });
};
