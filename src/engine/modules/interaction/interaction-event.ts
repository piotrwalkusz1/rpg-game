import { GameEvent } from 'engine/core/game';
import type { Character } from '../character';
import type { Interaction } from './interaction';

export class InteractionEvent extends GameEvent {
  readonly interaction: Interaction;
  readonly executor: Character;

  constructor({ time, interaction, executor }: { time: Date; interaction: Interaction; executor: Character }) {
    super({ time });
    this.interaction = interaction;
    this.executor = executor;
  }
}
