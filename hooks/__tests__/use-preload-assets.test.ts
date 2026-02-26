import { beforeEach, describe, expect, it, vi } from 'vitest';

import { usePreloadAssets } from '../use-preload-assets';

const { loadAsyncMock, useEffectMock, useStateMock } = vi.hoisted(() => ({
  loadAsyncMock: vi.fn(),
  useEffectMock: vi.fn(),
  useStateMock: vi.fn(),
}));

vi.mock('expo-asset', () => ({
  Asset: {
    loadAsync: loadAsyncMock,
  },
}));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');

  return {
    ...actual,
    useEffect: useEffectMock,
    useState: useStateMock,
  };
});

describe('usePreloadAssets', () => {
  const flushMicrotasks = async () => {
    await Promise.resolve();
    await Promise.resolve();
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns false initially in blocking mode and sets ready after success', async () => {
    const setReady = vi.fn();
    useStateMock.mockImplementation((initial: boolean) => [initial, setReady]);
    useEffectMock.mockImplementation((effect: () => void | (() => void)) => {
      effect();
    });
    loadAsyncMock.mockResolvedValue(undefined);

    const result = usePreloadAssets(['a.png'] as never[]);

    expect(result).toBe(false);
    expect(loadAsyncMock).toHaveBeenCalledWith(['a.png']);

    await flushMicrotasks();
    expect(setReady).toHaveBeenCalledWith(true);
  });

  it('returns true initially in non-blocking mode', () => {
    const setReady = vi.fn();
    useStateMock.mockImplementation((initial: boolean) => [initial, setReady]);
    useEffectMock.mockImplementation((effect: () => void | (() => void)) => {
      effect();
    });
    loadAsyncMock.mockResolvedValue(undefined);

    const result = usePreloadAssets(['a.png'] as never[], { blocking: false });

    expect(result).toBe(true);
  });

  it('sets ready when loading fails', async () => {
    const setReady = vi.fn();
    useStateMock.mockImplementation((initial: boolean) => [initial, setReady]);
    useEffectMock.mockImplementation((effect: () => void | (() => void)) => {
      effect();
    });
    loadAsyncMock.mockRejectedValue(new Error('boom'));

    usePreloadAssets(['a.png'] as never[]);

    await flushMicrotasks();
    expect(setReady).toHaveBeenCalledWith(true);
  });

  it('does not set ready after unmount', async () => {
    const setReady = vi.fn();
    let cleanup: (() => void) | undefined;
    let resolvePromise: (() => void) | undefined;

    useStateMock.mockImplementation((initial: boolean) => [initial, setReady]);
    useEffectMock.mockImplementation((effect: () => void | (() => void)) => {
      cleanup = effect() || undefined;
    });
    loadAsyncMock.mockReturnValue(
      new Promise<void>((resolve) => {
        resolvePromise = resolve;
      }),
    );

    usePreloadAssets(['a.png'] as never[]);
    cleanup?.();
    resolvePromise?.();

    await flushMicrotasks();
    expect(setReady).not.toHaveBeenCalled();
  });
});
