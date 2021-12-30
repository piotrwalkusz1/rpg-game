import type { Character } from '../../character/model/character';

export class Player {
  readonly character: Character;

  constructor(character: Character) {
    this.character = character;
  }
}
