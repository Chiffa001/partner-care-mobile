export type ContractionRecord = {
  startAt: number;
  durationSec: number;
  intervalSec: number | null;
};

export type ChildbirthTimerState = {
  activeContractionStartAt: number | null;
  activeContractionIntervalSec: number | null;
  isPaused: boolean;
  contractions: ContractionRecord[];
  now: number;
  tickNow: () => void;
  toggleTimer: () => void;
  pauseTimer: () => void;
  startAfterPause: () => void;
  resetTimer: () => void;
};

export type LaborPhase = 'noData' | 'early' | 'active' | 'transition';
