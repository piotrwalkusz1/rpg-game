import { ActionExecutedEvent } from 'engine/core/action';
import type { ECSEvent } from 'engine/core/ecs';
import { NewOffer, OfferService } from 'engine/modules/offer';
import { CommandEndedEvent } from '../command';
import { GameEngine, GameSystem } from '../game';
import { AI } from './ai';
import type { AIService } from './ai-service';

export class AISystem extends GameSystem {
  constructor(private aiService: AIService, private offerService: OfferService) {
    super();
  }

  async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActionExecutedEvent || event instanceof CommandEndedEvent) {
      const ai = event.executor.getComponent(AI);
      if (ai) {
        this.aiService.executeTurn(ai, engine);
      }
    } else if (event instanceof NewOffer) {
      event.offer.partiesWithPendingDecisions
        .filter((party) => party.hasComponent(AI))
        .forEach((party) => this.offerService.makeDecision(event.offer, party, 'ACCEPTED', engine));
    }
  }
}
