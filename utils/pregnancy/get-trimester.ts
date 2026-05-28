export type Trimester = 1 | 2 | 3;

export const getTrimesterFromWeek = (week: number): Trimester => {
  if (week < 14) {
    return 1;
  }

  if (week < 28) {
    return 2;
  }

  return 3;
};
