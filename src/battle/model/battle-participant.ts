import type { Character } from '../../character/model/character';

export class BattleParticipant {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    this.character = character;
  }
}
