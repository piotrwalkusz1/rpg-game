import type { Time } from 'engine/core/time';
import type { Character } from 'engine/modules/character';
import type { JournalContext } from 'engine/modules/journal/journal-context';
import { JournalEntry, JournalEntryState } from 'engine/modules/journal/journal-entry';
import type { TranslatableText } from 'i18n/translatable-text';
import { CharacterJournalContext } from './character-journal-context';

export class CharacterJournalEntry extends JournalEntry {
  private readonly _text: TranslatableText;
  private readonly _character: Character;

  constructor({ text, character, time, state }: { text: TranslatableText; character: Character; time: Time; state?: JournalEntryState }) {
    super({ time, state });
    this._text = text;
    this._character = character;
  }

  override get text(): TranslatableText {
    return this._text;
  }

  override get contexts(): readonly JournalContext[] {
    return [new CharacterJournalContext(this._character)];
  }
}
