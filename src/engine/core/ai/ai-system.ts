import type { ECSEvent } from 'engine/core/ecs';
import { NewOffer, OfferService } from 'engine/modules/offer';
import { GameEngine, GameSystem } from '../game';
import { AI } from './ai';

export class AISystem extends GameSystem {
  constructor(private offerService: OfferService) {
    super();
  }

  async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof NewOffer) {
      event.offer.partiesWithPendingDecisions
        .filter((party) => party.hasComponent(AI))
        .forEach((party) => this.offerService.makeDecision(event.offer, party, 'ACCEPTED', engine));
    }
  }
}
