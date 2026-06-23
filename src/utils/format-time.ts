export const formatTime = (value: number) => {
  const safeValue = Math.max(0, Math.round(value));
  const minutes = Math.floor(safeValue / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (safeValue % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
};
