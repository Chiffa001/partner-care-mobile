import { describe, expect, it } from 'vitest';

import { DEFAULT_WIDTH_PERCENT, parseWidthPercent } from './../parse-width-percent';

describe('parseWidthPercent', () => {
  it('returns default for undefined', () => {
    expect(parseWidthPercent(undefined)).toBe(DEFAULT_WIDTH_PERCENT);
  });

  it('parses numeric values', () => {
    expect(parseWidthPercent(78)).toBe(78);
    expect(parseWidthPercent(0)).toBe(0);
  });

  it('clamps numeric values to 0..100', () => {
    expect(parseWidthPercent(-5)).toBe(0);
    expect(parseWidthPercent(120)).toBe(100);
  });

  it('returns default for non-finite numbers', () => {
    expect(parseWidthPercent(Number.NaN)).toBe(DEFAULT_WIDTH_PERCENT);
    expect(parseWidthPercent(Number.POSITIVE_INFINITY)).toBe(DEFAULT_WIDTH_PERCENT);
  });

  it('parses string percentages', () => {
    expect(parseWidthPercent('78%')).toBe(78);
    expect(parseWidthPercent(' 72 % ')).toBe(72);
    expect(parseWidthPercent('54.5%')).toBe(54.5);
  });

  it('clamps parsed string values to 0..100', () => {
    expect(parseWidthPercent('-20%')).toBe(0);
    expect(parseWidthPercent('140%')).toBe(100);
  });

  it('returns default for invalid strings', () => {
    expect(parseWidthPercent('abc')).toBe(DEFAULT_WIDTH_PERCENT);
    expect(parseWidthPercent('')).toBe(DEFAULT_WIDTH_PERCENT);
  });
});
