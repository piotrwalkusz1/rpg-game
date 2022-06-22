import type { EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Type } from 'utils';
import { InteractionExecutor } from '../interaction';
import { SpeakInteraction } from './speak-interaction';

export class SpeakInteractionExecutor extends InteractionExecutor<SpeakInteraction> {
  override get interactionType(): Type<SpeakInteraction> {
    return SpeakInteraction;
  }

  override async execute(_executor: EntityProvider, _interaction: SpeakInteraction, _engine: GameEngine): Promise<void> {
    // Do nothing
  }
}
