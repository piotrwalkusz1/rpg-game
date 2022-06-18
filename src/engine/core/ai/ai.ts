import { Component } from 'engine/core/ecs';
import type { Character } from 'engine/modules/character';

export class AI extends Component {
  readonly character: Character;

  constructor({ character }: { character: Character }) {
    super();
    this.character = character;
  }
}
