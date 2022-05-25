import type { Time } from 'engine/core/time';
import type { TranslatableText } from 'i18n/translatable-text';
import type { Character } from '../character';
import { JournalEntry, JournalEntryState } from '../journal/journal-entry';

export class SpeakJournalEntry extends JournalEntry {
  readonly speaker: Character;
  readonly content: TranslatableText;
  readonly quote: boolean;

  constructor({
    time,
    speaker,
    content,
    quote,
    state
  }: {
    time: Time;
    speaker: Character;
    content: TranslatableText;
    quote: boolean;
    state?: JournalEntryState;
  }) {
    super({ time, state });
    this.speaker = speaker;
    this.content = content;
    this.quote = quote;
  }

  override get text(): TranslatableText {
    return this.content;
  }
}
