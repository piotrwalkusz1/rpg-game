import { Character } from '../../character/model/Character';

export class Player {
  readonly character: Character;

  constructor(character: Character) {
    this.character = character;
  }
}
