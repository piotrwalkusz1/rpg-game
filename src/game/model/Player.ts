import { Character } from '../../character/model/Character';

export class Player {
  character: Character;

  constructor(character: Character) {
    this.character = character;
  }
}
