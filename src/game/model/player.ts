import type { Character } from '../../character/model/character';
import type { PendingNarrationSequence } from '../../narration/model/narration-sequence/pending-narration-sequence';

export class Player {
  readonly character: Character;
  pendingNarrationSequence?: PendingNarrationSequence;

  constructor(character: Character) {
    this.character = character;
  }
}
