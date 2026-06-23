export const getDefaultDueDate = () => {
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 23 * 7);

  return defaultDate;
};
