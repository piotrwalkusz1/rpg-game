import type { Time } from 'engine/core/time';
import type { TranslatableText } from 'i18n/translatable-text';
import type { Character } from '../character';
import { JournalEntry } from '../journal/journal-entry';

export class SpeakJournalEntry extends JournalEntry {
  readonly speaker: Character;
  readonly content: TranslatableText;
  readonly quote: boolean;

  constructor({ time, speaker, content, quote }: { time: Time; speaker: Character; content: TranslatableText; quote: boolean }) {
    super({ time });
    this.speaker = speaker;
    this.content = content;
    this.quote = quote;
  }

  override get text(): TranslatableText {
    return this.content;
  }
}
