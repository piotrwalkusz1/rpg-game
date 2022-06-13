import type { Character } from 'engine/modules/character';
import { JournalContext } from 'engine/modules/journal/journal-context';

export class CharacterJournalContext extends JournalContext {
  readonly character: Character;

  constructor(character: Character) {
    super();
    this.character = character;
  }
}
