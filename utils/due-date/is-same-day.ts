export const isSameDay = (first: Date, second: Date) => (
  first.getFullYear() === second.getFullYear()
  && first.getMonth() === second.getMonth()
  && first.getDate() === second.getDate()
);
