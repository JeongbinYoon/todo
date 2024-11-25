import { Task } from '@/types';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  addMonths,
  getMonth,
  getYear,
} from 'date-fns';
import { useState, useEffect, useCallback } from 'react';

const useCalendar = () => {
  const TOTAL_WEEK_DAYS = 7;
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonthTasks, setCurentMonthTasks] = useState<Task[]>([]);
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);

  // 요일 계산
  const weekStartDate = startOfWeek(today);
  const daysOfWeek = Array.from({ length: TOTAL_WEEK_DAYS }).map((_, i) =>
    format(addDays(weekStartDate, i), 'EEE')
  );

  // 인자로 받은 배열 사이즈에 맞춰 중첩 배열로 만들기
  const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, Math.min(i + size, arr.length)));
    }
    return result;
  };

  // 선택 월 날짜 범위 계산 함수(이전, 다음 달 날짜 포함)
  const calculateCalendarDates = useCallback(
    (tasks?: Task[]) => {
      const startDate = startOfWeek(startOfMonth(currentDate));
      const endDate = endOfWeek(endOfMonth(currentDate));

      const days = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });

      const daysWithTasks = days.map((date) => {
        const filterTasks = tasks?.filter(
          (task) =>
            task.scheduledAt.getMonth() === date.getMonth() &&
            task.scheduledAt.getDate() === date.getDate()
        );
        return {
          date,
          tasks: filterTasks,
        };
      });
      return {
        startDate,
        endDate,
        calendar: chunkArray(daysWithTasks, TOTAL_WEEK_DAYS),
      };
    },
    [currentDate]
  );

  // 달력 날짜 상태
  const [calendarData, setCalendarData] = useState(
    calculateCalendarDates(currentMonthTasks)
  );

  // 달력을 업데이트하는 함수
  const setCurrentMonth = (monthOffset: number) => {
    const newDate = addMonths(currentDate, monthOffset);
    setCurrentDate(newDate);
  };

  // currentDate 변경 시 calendarDates 동기화
  useEffect(() => {
    setCalendarData(calculateCalendarDates(currentMonthTasks));
  }, [currentDate, calculateCalendarDates, currentMonthTasks]);

  return {
    startDate: calendarData.startDate,
    endDate: calendarData.endDate,
    daysOfWeek,
    calendarDates: calendarData.calendar,
    currentYear,
    currentMonth,
    setCurrentMonth,
    setCurentMonthTasks,
  };
};

export default useCalendar;
