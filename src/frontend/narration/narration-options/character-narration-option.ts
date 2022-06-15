import type { Character } from 'engine/modules/character';
import { NarrationOption } from '../narration-option';

export class CharacterNarrationOption extends NarrationOption {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    super({ name: character.name, image: character.avatar, imageSize: 'LARGE' });
    this.character = character;
  }
}
