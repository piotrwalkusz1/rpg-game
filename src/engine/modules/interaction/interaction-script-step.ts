import { Entity, EntityProvider } from 'engine/core/ecs';
import { ScriptStep } from 'engine/core/script';
import type { Interaction } from './interaction';

export class InteractionScriptStep extends ScriptStep {
  readonly executor: Entity;
  readonly interaction: Interaction;

  constructor(executor: EntityProvider, interaction: Interaction) {
    super();
    this.executor = EntityProvider.getEntity(executor);
    this.interaction = interaction;
  }
}
