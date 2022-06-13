import type { Time } from 'engine/core/time';
import { TranslatableText, wrapTranslation } from 'i18n/translatable-text';
import type { Character } from '../../character';
import type { JournalEntryState } from '../../journal/journal-entry';
import { CharacterJournalEntry } from '../journal-character';

export class SpeakJournalEntry extends CharacterJournalEntry {
  constructor({
    speaker,
    content,
    quote,
    time,
    state
  }: {
    speaker: Character;
    content: TranslatableText;
    quote: boolean;
    time: Time;
    state?: JournalEntryState;
  }) {
    super({ text: quote ? wrapTranslation(content, '"') : content, character: speaker, time, state });
  }
}
