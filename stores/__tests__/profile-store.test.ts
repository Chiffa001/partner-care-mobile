import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useProfileStore } from '../profile-store';

vi.mock('@react-native-async-storage/async-storage');

const readState = () => useProfileStore.getState();

describe('profile-store', () => {
  beforeEach(() => {
    useProfileStore.setState({
      dueDate: null,
      isLivingTogether: true,
      isFirstPregnancy: true,
      isPushEnabled: true,
      communicationTone: 'soft',
    });
  });

  it('has the expected defaults', () => {
    const state = readState();

    expect(state.dueDate).toBeNull();
    expect(state.isLivingTogether).toBe(true);
    expect(state.isFirstPregnancy).toBe(true);
    expect(state.isPushEnabled).toBe(true);
    expect(state.communicationTone).toBe('soft');
  });

  it('updates fields through setters', () => {
    const timestamp = new Date(2026, 5, 1).getTime();

    readState().setDueDate(timestamp);
    readState().setLivingTogether(false);
    readState().setFirstPregnancy(false);
    readState().setPushEnabled(false);
    readState().setCommunicationTone('direct');

    const state = readState();

    expect(state.dueDate).toBe(timestamp);
    expect(state.isLivingTogether).toBe(false);
    expect(state.isFirstPregnancy).toBe(false);
    expect(state.isPushEnabled).toBe(false);
    expect(state.communicationTone).toBe('direct');
  });
});
