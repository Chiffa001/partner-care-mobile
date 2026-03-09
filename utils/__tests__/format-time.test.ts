import { describe, expect, it } from 'vitest';

import { formatTime } from '../format-time';

describe('formatTime', () => {
  it('formats zero as mm:ss', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('formats seconds under a minute', () => {
    expect(formatTime(9)).toBe('00:09');
    expect(formatTime(59)).toBe('00:59');
  });

  it('formats values at minute boundary and above', () => {
    expect(formatTime(60)).toBe('01:00');
    expect(formatTime(125)).toBe('02:05');
  });

  it('rounds to nearest second before formatting', () => {
    expect(formatTime(1.49)).toBe('00:01');
    expect(formatTime(1.5)).toBe('00:02');
  });

  it('clamps negative values to zero', () => {
    expect(formatTime(-1)).toBe('00:00');
    expect(formatTime(-100)).toBe('00:00');
  });

  it('supports values larger than 99 minutes', () => {
    expect(formatTime(6000)).toBe('100:00');
  });
});
