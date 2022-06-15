import type { GameEngine } from 'engine/core/game';
import type { Offer } from './offer';
import type { OfferDecisionValue } from './offer-decision';
import { NewOffer, OfferAcceptedEvent, OfferRejectedEvent } from './offer-event';
import type { OfferParty } from './offer-party';

export class OfferService {
  makeOffer(offer: Offer, engine: GameEngine): void {
    if (offer.pending) {
      offer.parties.forEach((party) => party.addOffer(offer));
    }
    engine.addEvent(new NewOffer({ time: engine.time, offer }));
    this.addEventIfOfferAcceptedOrRejected(offer, engine);
  }

  makeDecision(offer: Offer, decisionMaker: OfferParty, decision: OfferDecisionValue, engine: GameEngine): void {
    offer.makeDecision(decisionMaker, decision);
    this.addEventIfOfferAcceptedOrRejected(offer, engine);
  }

  private addEventIfOfferAcceptedOrRejected(offer: Offer, engine: GameEngine): void {
    if (offer.accepted) {
      engine.addEvent(new OfferAcceptedEvent({ time: engine.time, offer }));
    } else if (offer.rejected) {
      engine.addEvent(new OfferRejectedEvent({ time: engine.time, offer }));
    }
  }
}
