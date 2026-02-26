import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCustomFonts } from '../use-custom-fonts';

const { TextInputMock, TextMock, useFontsMock } = vi.hoisted(() => ({
  useFontsMock: vi.fn(),
  TextMock: {} as { defaultProps?: { style?: unknown } },
  TextInputMock: {} as { defaultProps?: { style?: unknown } },
}));

vi.mock('expo-font', () => ({
  useFonts: useFontsMock,
}));

vi.mock('react-native', () => ({
  Text: TextMock,
  TextInput: TextInputMock,
}));

describe('useCustomFonts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    TextMock.defaultProps = undefined;
    TextInputMock.defaultProps = undefined;
  });

  it('returns false when fonts are not loaded', () => {
    useFontsMock.mockReturnValue([false]);

    const result = useCustomFonts();

    expect(result).toBe(false);
    expect(TextMock.defaultProps).toBeUndefined();
    expect(TextInputMock.defaultProps).toBeUndefined();
  });

  it('returns true and sets default font styles when fonts are loaded', () => {
    useFontsMock.mockReturnValue([true]);

    const result = useCustomFonts();

    expect(result).toBe(true);
    expect(TextMock.defaultProps?.style).toEqual([
      undefined,
      { fontFamily: 'Poppins-Regular' },
    ]);
    expect(TextInputMock.defaultProps?.style).toEqual([
      undefined,
      { fontFamily: 'Poppins-Regular' },
    ]);
  });

  it('preserves existing styles when fonts are loaded', () => {
    useFontsMock.mockReturnValue([true]);
    TextMock.defaultProps = { style: { color: 'red' } };
    TextInputMock.defaultProps = { style: [{ fontSize: 14 }] };

    useCustomFonts();

    expect(TextMock.defaultProps?.style).toEqual([
      { color: 'red' },
      { fontFamily: 'Poppins-Regular' },
    ]);
    expect(TextInputMock.defaultProps?.style).toEqual([
      [{ fontSize: 14 }],
      { fontFamily: 'Poppins-Regular' },
    ]);
  });
});
