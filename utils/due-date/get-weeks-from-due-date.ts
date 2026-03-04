import { startOfDay } from './start-of-day';

const PREGNANCY_DAYS = 280;
const MS_IN_DAY = 1000 * 60 * 60 * 24;

export const getWeeksFromDueDate = (dueDate: Date) => {
  const today = startOfDay(new Date());
  const normalizedDueDate = startOfDay(dueDate);
  const daysUntilDueDate = Math.round((normalizedDueDate.getTime() - today.getTime()) / MS_IN_DAY);
  const pregnancyDays = PREGNANCY_DAYS - daysUntilDueDate;
  const weeks = Math.floor(pregnancyDays / 7);

  return Math.max(0, Math.min(42, weeks));
};
