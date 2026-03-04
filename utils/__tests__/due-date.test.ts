import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { buildCalendarDays } from '../due-date/build-calendar-days';
import { getDefaultDueDate } from '../due-date/get-default-due-date';
import { getWeekdayNames } from '../due-date/get-weekday-names';
import { getWeeksFromDueDate } from '../due-date/get-weeks-from-due-date';
import { isSameDay } from '../due-date/is-same-day';
import { startOfDay } from '../due-date/start-of-day';

describe('due-date utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('startOfDay', () => {
    it('returns date with zeroed time and keeps year-month-day', () => {
      const input = new Date(2026, 2, 4, 15, 42, 31, 450);
      const result = startOfDay(input);

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(4);
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
      expect(result).not.toBe(input);
    });
  });

  describe('isSameDay', () => {
    it('returns true for dates from the same day', () => {
      const first = new Date(2026, 2, 4, 1, 10);
      const second = new Date(2026, 2, 4, 23, 59);

      expect(isSameDay(first, second)).toBe(true);
    });

    it('returns false for dates from different days', () => {
      const first = new Date(2026, 2, 4, 23, 59);
      const second = new Date(2026, 2, 5, 0, 1);

      expect(isSameDay(first, second)).toBe(false);
    });
  });

  describe('buildCalendarDays', () => {
    it('builds 6-week calendar grid for provided month', () => {
      const monthDate = new Date(2026, 2, 1);
      const days = buildCalendarDays(monthDate);

      expect(days).toHaveLength(42);
      expect(days[0].date).toEqual(new Date(2026, 1, 23));
      expect(days[41].date).toEqual(new Date(2026, 3, 5));
    });

    it('marks current month days correctly', () => {
      const days = buildCalendarDays(new Date(2026, 2, 1));
      const currentMonthDays = days.filter(({ isCurrentMonth }) => isCurrentMonth);

      expect(currentMonthDays).toHaveLength(31);
      expect(currentMonthDays[0].date).toEqual(new Date(2026, 2, 1));
      expect(currentMonthDays[30].date).toEqual(new Date(2026, 2, 31));
    });
  });

  describe('getWeekdayNames', () => {
    it('returns 7 weekday labels in requested locale', () => {
      const weekdayNames = getWeekdayNames('en');

      expect(weekdayNames).toHaveLength(7);
      expect(new Set(weekdayNames).size).toBe(7);
      expect(weekdayNames[0].toLowerCase()).toContain('mon');
    });

    it('strips dots from labels', () => {
      const weekdayNames = getWeekdayNames('ru');

      expect(weekdayNames.every((name) => !name.includes('.'))).toBe(true);
    });
  });

  describe('getDefaultDueDate', () => {
    it('returns date 23 weeks ahead from current date', () => {
      const now = new Date(2026, 2, 4, 12, 30, 10, 500);
      vi.setSystemTime(now);

      const expected = new Date(now);
      expected.setDate(expected.getDate() + 23 * 7);

      expect(getDefaultDueDate()).toEqual(expected);
    });
  });

  describe('getWeeksFromDueDate', () => {
    it('calculates weeks from due date for typical value', () => {
      vi.setSystemTime(new Date(2026, 2, 4, 9, 0, 0, 0));

      const dueDate = new Date(2026, 7, 12, 18, 40, 0, 0);

      expect(getWeeksFromDueDate(dueDate)).toBe(17);
    });

    it('returns 40 when due date is today', () => {
      vi.setSystemTime(new Date(2026, 2, 4, 8, 0, 0, 0));

      const dueDate = new Date(2026, 2, 4, 23, 59, 0, 0);

      expect(getWeeksFromDueDate(dueDate)).toBe(40);
    });

    it('clamps to 0 for very early stage', () => {
      vi.setSystemTime(new Date(2026, 2, 4, 8, 0, 0, 0));

      const dueDate = new Date(2027, 5, 1);

      expect(getWeeksFromDueDate(dueDate)).toBe(0);
    });

    it('clamps to 42 for overdue dates', () => {
      vi.setSystemTime(new Date(2026, 2, 4, 8, 0, 0, 0));

      const dueDate = new Date(2025, 10, 1);

      expect(getWeeksFromDueDate(dueDate)).toBe(42);
    });
  });
});
