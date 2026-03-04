const DAYS_IN_WEEK = 7;

export const getWeekdayNames = (language: string): string[] => Array.from(
  { length: DAYS_IN_WEEK },
  (_, index) => {
    const monday = new Date(2026, 0, 5);
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);

    return new Intl.DateTimeFormat(language, { weekday: 'short' })
      .format(day)
      .replace('.', '');
  },
);
