const DAYS_IN_WEEK = 7;
const CALENDAR_CELLS = 42;

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

export const buildCalendarDays = (monthDate: Date): CalendarDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % DAYS_IN_WEEK;
  const startDate = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: CALENDAR_CELLS }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
};
