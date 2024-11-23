import useCalendar from '@/hooks/useCalendar';

const Calendar = () => {
  const { daysOfWeek, calendarDates, currentMonth, setCurrentMonth } =
    useCalendar();
  return (
    <div className='w-full max-w-2xl'>
      <div className='flex justify-center gap-5 mb-2'>
        <button
          className='w-5 font-bold text-gray-600 transition-opacity opacity-30 hover:opacity-100'
          onClick={() => setCurrentMonth(-1)}
        >
          &lt;
        </button>
        <span className='text-xl font-bold'>2024. {currentMonth}</span>
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
          week.map((date) => (
            <div
              className={`h-20 border-r border-b py-2 px-3 hover:bg-gray-100`}
              key={`${i}-${date}`}
            >
              {date}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;
