import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
const useCalendar = () => {
  const today = new Date();
  const weekStartDate = startOfWeek(today);
  const daysOfWeek = Array.from({ length: 7 }).map((_, i) =>
    format(addDays(weekStartDate, i), 'EEEEE')
  );

  const startDateOfMonth = startOfMonth(today);
  const endDateOfMonth = endOfMonth(startDateOfMonth);

  const days = eachDayOfInterval({
    start: startOfWeek(startDateOfMonth),
    end: endOfWeek(endDateOfMonth),
  }).map((date) => date.getDate());

  /*
   * 인자로 받은 배열 사이즈에 맞춰 중첩 배열로 만들기
   */
  const chunkArray = <T>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, Math.min(i + size, arr.length)));
    }
    return result;
  };
  const calendarDates = chunkArray(days, 7);

  return {
    daysOfWeek,
    calendarDates,
  };
};

export default useCalendar;
