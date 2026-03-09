import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePulseScale } from '../use-pulse-scale';

const {
  effectCleanups,
  easingInOutMock,
  loopAnimation,
  loopMock,
  scaleValueMock,
  sequenceMock,
  timingMock,
  useEffectMock,
  useRefMock,
} = vi.hoisted(() => {
  const effectCleanupsLocal: ((() => void) | void)[] = [];

  return {
    effectCleanups: effectCleanupsLocal,
    useRefMock: vi.fn((initialValue: unknown) => ({ current: initialValue })),
    useEffectMock: vi.fn((effect: () => void | (() => void)) => {
      const cleanup = effect();
      effectCleanupsLocal.push(cleanup);
    }),
    scaleValueMock: {
      stopAnimation: vi.fn(),
      setValue: vi.fn(),
    },
    timingMock: vi.fn(() => ({ kind: 'timing' })),
    sequenceMock: vi.fn(() => ({ kind: 'sequence' })),
    loopAnimation: {
      start: vi.fn(),
      stop: vi.fn(),
    },
    loopMock: vi.fn(),
    easingInOutMock: vi.fn((value: string) => `inOut(${value})`),
  };
});

loopMock.mockImplementation(() => loopAnimation);

vi.mock('react', () => ({
  useRef: useRefMock,
  useEffect: useEffectMock,
}));

vi.mock('react-native', () => ({
  Animated: {
    Value: vi.fn(() => scaleValueMock),
    timing: timingMock,
    sequence: sequenceMock,
    loop: loopMock,
  },
  Easing: {
    ease: 'ease',
    inOut: easingInOutMock,
  },
}));

describe('usePulseScale', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    effectCleanups.length = 0;
    loopMock.mockImplementation(() => loopAnimation);
  });

  it('stops and resets animation when disabled', () => {
    const scale = usePulseScale({ enabled: false, duration: 700 });

    expect(scale).toBe(scaleValueMock);
    expect(scaleValueMock.stopAnimation).toHaveBeenCalledTimes(1);
    expect(scaleValueMock.setValue).toHaveBeenCalledWith(1);
    expect(loopMock).not.toHaveBeenCalled();
  });

  it('starts looping pulse animation and stops it on cleanup when enabled', () => {
    usePulseScale({ enabled: true, duration: 550, maxScale: 1.2 });

    expect(timingMock).toHaveBeenCalledTimes(2);
    expect(timingMock).toHaveBeenNthCalledWith(1, scaleValueMock, {
      toValue: 1.2,
      duration: 550,
      easing: 'inOut(ease)',
      useNativeDriver: true,
    });
    expect(timingMock).toHaveBeenNthCalledWith(2, scaleValueMock, {
      toValue: 1,
      duration: 550,
      easing: 'inOut(ease)',
      useNativeDriver: true,
    });
    expect(easingInOutMock).toHaveBeenCalledWith('ease');
    expect(sequenceMock).toHaveBeenCalledTimes(1);
    expect(loopMock).toHaveBeenCalledTimes(1);
    expect(loopAnimation.start).toHaveBeenCalledTimes(1);

    const cleanup = effectCleanups[0];
    expect(typeof cleanup).toBe('function');
    (cleanup as () => void)();
    expect(loopAnimation.stop).toHaveBeenCalledTimes(1);
  });
});
