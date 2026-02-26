export const DEFAULT_WIDTH_PERCENT = 63;

const clampPercent = (value: number) => Math.max(0, Math.min(100, value));

export const parseWidthPercent = (value: number | string | undefined) => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? clampPercent(value) : DEFAULT_WIDTH_PERCENT;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value.replace('%', '').trim());

    return Number.isFinite(parsed) ? clampPercent(parsed) : DEFAULT_WIDTH_PERCENT;
  }

  return DEFAULT_WIDTH_PERCENT;
};
