import { GameEvent } from 'engine/core/game';
import type { Interaction } from './interaction';
import type { InteractionExecutor } from './interaction-executor';

export class InteractionEvent extends GameEvent {
  readonly interaction: Interaction;
  readonly executor: InteractionExecutor;

  constructor({ time, interaction, executor }: { time: Date; interaction: Interaction; executor: InteractionExecutor }) {
    super({ time });
    this.interaction = interaction;
    this.executor = executor;
  }
}
