import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCollapsibleContent } from '../use-collapsible-content';

const { setCollapsedMock, useCallbackMock, useStateMock } = vi.hoisted(() => {
  const setCollapsed = vi.fn();

  return {
    setCollapsedMock: setCollapsed,
    useCallbackMock: vi.fn((callback: unknown) => callback),
    useStateMock: vi.fn(() => [false, setCollapsed]),
  };
});

vi.mock('react', () => ({
  useCallback: useCallbackMock,
  useState: useStateMock,
}));

describe('useCollapsibleContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStateMock.mockReset();
    useStateMock.mockImplementation(() => [false, setCollapsedMock]);
  });

  it('toggles collapsed state when enabled', () => {
    const result = useCollapsibleContent({ enabled: true });

    result.toggleCollapsed();

    expect(setCollapsedMock).toHaveBeenCalledTimes(1);
  });

  it('does not toggle when disabled', () => {
    const result = useCollapsibleContent({ enabled: false });

    result.toggleCollapsed();

    expect(setCollapsedMock).not.toHaveBeenCalled();
  });
});
