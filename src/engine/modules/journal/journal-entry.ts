import type { Time } from 'engine/core/time';
import type { TranslatableText } from 'i18n/translatable-text';

export type JournalEntryState = 'UNSEEN' | 'SEEN' | 'READ';

export abstract class JournalEntry {
  readonly time: Time;
  state: JournalEntryState = 'UNSEEN';

  constructor({ time }: { time: Time }) {
    this.time = time;
  }

  abstract get text(): TranslatableText;
}
