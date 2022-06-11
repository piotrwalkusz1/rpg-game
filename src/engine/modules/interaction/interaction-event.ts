import { Entity, EntityProvider } from 'engine/core/ecs';
import { GameEvent } from 'engine/core/game';
import type { Interaction } from './interaction';

export class InteractionEvent extends GameEvent {
  readonly interaction: Interaction;
  readonly executor: Entity;

  constructor({ time, interaction, executor }: { time: Date; interaction: Interaction; executor: EntityProvider }) {
    super({ time });
    this.interaction = interaction;
    this.executor = EntityProvider.requireEntity(executor);
  }
}
