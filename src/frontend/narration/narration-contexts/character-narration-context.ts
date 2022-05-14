import type { Character } from 'engine/modules/character';
import { NarrationContext } from '../narration-context';

export class CharacterNarrationContext extends NarrationContext {
  constructor(readonly character: Character) {
    super();
  }
}
