import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Type } from 'utils';
import { InteractionExecutor } from '../interaction';
import { InformInteraction } from './inform-interaction';

export class InformInteractionExecutor extends InteractionExecutor<InformInteraction> {
  override get interactionType(): Type<InformInteraction> {
    return InformInteraction;
  }

  override async execute(_executor: EntityProvider, interaction: InformInteraction, _engine: GameEngine): Promise<void> {
    interaction.informationReceiver.addInformation(interaction.information);
  }
}
