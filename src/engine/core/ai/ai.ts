import { Component } from 'engine/core/ecs';
import type { Character } from 'engine/modules/character';
import type { ActivityParticipant } from '../activity';

export class AI extends Component {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    super();
    this.character = character;
  }

  get activityParticipant(): ActivityParticipant {
    return this.character.activityParticipant;
  }
}
