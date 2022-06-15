import { Entity, EntityProvider } from 'engine/core/ecs';
import { GameEvent } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import type { Interaction } from './interaction';

export class InteractionEvent extends GameEvent {
  readonly executor: Entity;
  readonly interaction: Interaction;

  constructor({ time, executor, interaction }: { time: Time; executor: EntityProvider; interaction: Interaction }) {
    super({ time });
    this.executor = EntityProvider.getEntity(executor);
    this.interaction = interaction;
  }
}
