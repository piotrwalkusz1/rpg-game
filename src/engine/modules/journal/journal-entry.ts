import type { Time } from 'engine/core/time';
import type { TranslatableText } from 'i18n/translatable-text';
import type { JournalContext } from './journal-context';

export type JournalEntryState = 'UNSEEN' | 'SEEN' | 'READ';

export abstract class JournalEntry {
  readonly time: Time;
  state: JournalEntryState;

  constructor({ time, state }: { time: Time; state?: JournalEntryState }) {
    this.time = time;
    this.state = state || 'UNSEEN';
  }

  abstract get text(): TranslatableText;

  abstract get contexts(): readonly JournalContext[];
}
