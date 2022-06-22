import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import { typeName } from 'utils';
import type { Interaction } from './interaction';
import { InteractionEvent } from './interaction-event';
import type { InteractionExecutor } from './interaction-executor';

export class InteractionService {
  constructor(private interactionExecutors: InteractionExecutor<Interaction>[]) {}

  async executeInteraction(executor: EntityProvider, interaction: Interaction, engine: GameEngine): Promise<void> {
    const interactionExecutor = this.interactionExecutors.filter((executor) => interaction instanceof executor.interactionType)[0];
    if (!interactionExecutor) {
      throw new Error('InteractionExecutor for type ' + typeName(interaction) + ' not found');
    }
    await interactionExecutor.execute(executor, interaction, engine);
    engine.addEvent(new InteractionEvent({ time: engine.time, executor, interaction }));
  }
}
