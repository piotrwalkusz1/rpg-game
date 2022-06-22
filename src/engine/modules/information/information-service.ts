import type { GameEngine } from 'engine/core/game';
import type { InteractionService } from '../interaction';
import { InformInteraction } from './inform-interaction';
import type { Information } from './information';
import type { InformationOwner } from './information-owner';

export class InformationService {
  constructor(private interactionService: InteractionService) {}

  async inform(
    informationGiver: InformationOwner,
    informationReceiver: InformationOwner,
    information: Information,
    engine: GameEngine
  ): Promise<void> {
    await this.interactionService.executeInteraction(informationGiver, new InformInteraction({ informationReceiver, information }), engine);
  }
}
