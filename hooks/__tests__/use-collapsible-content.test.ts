import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCollapsibleContent } from '../use-collapsible-content';

const {
  animationStartMock,
  collapseProgressMock,
  easingInOutMock,
  setCollapsedMock,
  setContentHeightMock,
  timingMock,
  useCallbackMock,
  useEffectMock,
  useMemoMock,
  useRefMock,
  useStateMock,
} = vi.hoisted(() => {
  const animationStart = vi.fn();
  const collapseProgress = {
    stopAnimation: vi.fn(),
    setValue: vi.fn(),
    interpolate: vi.fn(() => 'interpolated-value'),
  };

  const setCollapsed = vi.fn();
  const setContentHeight = vi.fn();

  const useStateImpl = vi
    .fn()
    .mockImplementationOnce(() => [false, setCollapsed])
    .mockImplementationOnce(() => [0, setContentHeight]);

  return {
    animationStartMock: animationStart,
    collapseProgressMock: collapseProgress,
    easingInOutMock: vi.fn((value: string) => `inOut(${value})`),
    setCollapsedMock: setCollapsed,
    setContentHeightMock: setContentHeight,
    timingMock: vi.fn(() => ({ start: animationStart })),
    useCallbackMock: vi.fn((callback: unknown) => callback),
    useEffectMock: vi.fn((effect: () => void) => effect()),
    useMemoMock: vi.fn((factory: () => unknown) => factory()),
    useRefMock: vi.fn(() => ({ current: collapseProgress })),
    useStateMock: useStateImpl,
  };
});

vi.mock('react', () => ({
  useCallback: useCallbackMock,
  useEffect: useEffectMock,
  useMemo: useMemoMock,
  useRef: useRefMock,
  useState: useStateMock,
}));

vi.mock('react-native', () => ({
  Animated: {
    Value: vi.fn(() => collapseProgressMock),
    timing: timingMock,
  },
  Easing: {
    ease: 'ease',
    inOut: easingInOutMock,
  },
}));

describe('useCollapsibleContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStateMock.mockReset();
    useStateMock
      .mockImplementationOnce(() => [false, setCollapsedMock])
      .mockImplementationOnce(() => [0, setContentHeightMock]);
  });

  it('resets animation when collapse is disabled', () => {
    useCollapsibleContent({ enabled: false });

    expect(collapseProgressMock.stopAnimation).toHaveBeenCalledTimes(1);
    expect(collapseProgressMock.setValue).toHaveBeenCalledWith(1);
    expect(timingMock).not.toHaveBeenCalled();
  });

  it('starts timing animation and exposes animated styles when enabled', () => {
    const result = useCollapsibleContent({ enabled: true });

    expect(timingMock).toHaveBeenCalledWith(collapseProgressMock, {
      toValue: 1,
      duration: 260,
      easing: 'inOut(ease)',
      useNativeDriver: false,
    });
    expect(animationStartMock).toHaveBeenCalledTimes(1);
    expect(result.contentAnimatedStyle).toEqual({
      height: undefined,
      opacity: 'interpolated-value',
    });
  });

  it('updates measured content height only when expanded and height grows', () => {
    const result = useCollapsibleContent({ enabled: true });

    result.handleContentLayout(120);
    expect(setContentHeightMock).toHaveBeenCalledWith(120);

    setContentHeightMock.mockClear();
    result.handleContentLayout(1);
    expect(setContentHeightMock).not.toHaveBeenCalled();
  });

  it('toggles collapsed state only when enabled', () => {
    const enabledResult = useCollapsibleContent({ enabled: true });
    enabledResult.toggleCollapsed();
    expect(setCollapsedMock).toHaveBeenCalledTimes(1);

    setCollapsedMock.mockClear();
    useStateMock.mockReset();
    useStateMock
      .mockImplementationOnce(() => [false, setCollapsedMock])
      .mockImplementationOnce(() => [0, setContentHeightMock]);

    const disabledResult = useCollapsibleContent({ enabled: false });
    disabledResult.toggleCollapsed();
    expect(setCollapsedMock).not.toHaveBeenCalled();
  });
});
