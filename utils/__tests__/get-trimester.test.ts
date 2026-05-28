import { describe, expect, it } from 'vitest';

import { getTrimesterFromWeek } from '../pregnancy/get-trimester';

describe('getTrimesterFromWeek', () => {
  it('returns the first trimester for weeks before 14', () => {
    expect(getTrimesterFromWeek(0)).toBe(1);
    expect(getTrimesterFromWeek(13)).toBe(1);
  });

  it('returns the second trimester for weeks 14-27', () => {
    expect(getTrimesterFromWeek(14)).toBe(2);
    expect(getTrimesterFromWeek(27)).toBe(2);
  });

  it('returns the third trimester from week 28 onward', () => {
    expect(getTrimesterFromWeek(28)).toBe(3);
    expect(getTrimesterFromWeek(42)).toBe(3);
  });
});
