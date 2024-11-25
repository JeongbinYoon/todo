import { fetchTasksForMonth } from '@/app/actions';
import useCalendar from '@/hooks/useCalendar';
import { selectedDateAtom } from '@/store/calendarAtom';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';

const Calendar = () => {
  const {
    startDate,
    endDate,
    daysOfWeek,
    calendarDates,
    currentYear,
    currentMonth,
    setCurrentMonth,
    setCurentMonthTasks,
  } = useCalendar();

  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  const handleSelectDate = useCallback(
    (date: Date) => {
      setSelectedDate(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      );
    },
    [setSelectedDate]
  );

  useEffect(() => handleSelectDate(new Date()), [handleSelectDate]);

  // 현재 월 task 조회 후 캘린더에 날짜 별로 추가
  useQuery(
    ['tasksForMonth', currentMonth, startDate, endDate],
    async () => {
      return await fetchTasksForMonth({ startDate, endDate });
    },
    {
      enabled: !!currentMonth,
      onSuccess: (tasks) => setCurentMonthTasks(tasks || []),
    }
  );

  const checkIsCurrentMonth = (date: Date) => {
    return currentMonth === date.getMonth() + 1;
  };

  const checkIsCurrentDate = (date: Date) => {
    return (
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` ===
      selectedDate
    );
  };
  return (
    <div className='w-full max-w-2xl p-6 rounded md:shadow-lg'>
      <div className='flex justify-center gap-5 mb-2'>
        <button
          className='w-5 font-bold text-gray-600 transition-opacity opacity-30 hover:opacity-100'
          onClick={() => setCurrentMonth(-1)}
        >
          &lt;
        </button>
        <span className='text-xl font-bold'>
          {currentYear}. {currentMonth}
        </span>
        <button
          className='w-5 font-bold text-gray-600 transition-opacity opacity-30 hover:opacity-100'
          onClick={() => setCurrentMonth(+1)}
        >
          &gt;
        </button>
      </div>
      {/* 요일 */}
      <div className='grid grid-cols-7 gap-2 text-center font-medium'>
        {daysOfWeek.map((day, i) => (
          <div className='py-2' key={i}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className='grid grid-cols-7 border-t border-l'>
        {calendarDates.map((week, i) =>
          week.map(({ date, tasks }) => (
            <div
              key={`${i}-${date}`}
              className={`cursor-pointer ${
                checkIsCurrentDate(date) && 'bg-gray-100'
              }`}
            >
              <div
                className={`h-16 md:h-20 border-r border-b py-2 hover:bg-gray-100 overflow-y-auto`}
                onClick={() => handleSelectDate(date)}
              >
                <div
                  className={`px-2 ${
                    !checkIsCurrentMonth(date) && 'text-gray-400'
                  }`}
                >
                  {date.getDate()}
                </div>
                <div className='flex flex-col gap-[2px] px-1'>
                  {tasks?.map((task) => (
                    <div
                      className='px-[4px] text-[10px] overflow-hidden whitespace-nowrap text-ellipsis bg-orange-300 rounded'
                      key={task.id}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
