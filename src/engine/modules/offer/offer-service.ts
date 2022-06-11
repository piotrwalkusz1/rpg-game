import type { GameEngine } from 'engine/core/game';
import { InteractionEvent, InteractionExecutor } from '../interaction';
import type { Offer } from './offer';
import type { OfferDecisionValue } from './offer-decision';
import { OfferDecisionInteraction } from './offer-decision-interaction';

export class OfferService {
  static makeDecision(offer: Offer, decisionMaked: InteractionExecutor, decision: OfferDecisionValue, engine: GameEngine): void {
    engine.addEvent(
      new InteractionEvent({
        time: engine.time,
        interaction: new OfferDecisionInteraction({ offer, decision }),
        executor: decisionMaked
      })
    );
  }
}
