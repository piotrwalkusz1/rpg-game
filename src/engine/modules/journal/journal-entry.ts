import type { Time } from 'engine/core/time';

export type JournalEntryState = 'UNSEEN' | 'SEEN' | 'READ';

export abstract class JournalEntry {
  readonly time: Time;
  state: JournalEntryState;

  constructor({ time, state }: { time: Time; state?: JournalEntryState }) {
    this.time = time;
    this.state = state || 'UNSEEN';
  }
}
