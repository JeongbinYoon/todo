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
} from 'date-fns';
import { useState, useEffect, useCallback } from 'react';

const useCalendar = () => {
  const TOTAL_WEEK_DAYS = 7;
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const currentMonth = getMonth(currentDate) + 1;

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

  // 인자로 받은 날짜 기준 해당 월 날짜 범위 계산 함수
  const calculateCalendarDates = useCallback((date: Date) => {
    const startDateOfMonth = startOfMonth(date);
    const endDateOfMonth = endOfMonth(startDateOfMonth);

    const days = eachDayOfInterval({
      start: startOfWeek(startDateOfMonth),
      end: endOfWeek(endDateOfMonth),
    });

    return chunkArray(days, TOTAL_WEEK_DAYS);
  }, []);

  // 달력 날짜 상태
  const [calendarDates, setCalendarDates] = useState(
    calculateCalendarDates(currentDate)
  );

  // 달력을 업데이트하는 함수
  const setCurrentMonth = (monthOffset: number) => {
    const newDate = addMonths(currentDate, monthOffset);
    setCurrentDate(newDate);
  };

  // currentDate 변경 시 calendarDates 동기화
  useEffect(() => {
    setCalendarDates(calculateCalendarDates(currentDate));
  }, [currentDate, calculateCalendarDates]);

  return {
    daysOfWeek,
    calendarDates,
    currentMonth,
    setCurrentMonth,
  };
};

export default useCalendar;
