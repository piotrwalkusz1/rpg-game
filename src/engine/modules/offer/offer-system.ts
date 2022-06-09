import type { ECSEvent } from 'engine/core/ecs';
import { GameEngine, GameSystem } from 'engine/core/game';
import { InteractionEvent } from '../interaction';
import type { Offer } from './offer';
import { OfferDecisionInteraction } from './offer-decision-interaction';
import { OfferAcceptedEvent, OfferRejectedEvent } from './offer-event';
import { OfferInteraction } from './offer-interaction';
import { OfferParty } from './offer-party';

export class OfferSystem extends GameSystem {
  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof InteractionEvent) {
      this.handleInteractionEvent(event, engine);
    }
  }

  private handleInteractionEvent({ interaction, executor }: InteractionEvent, engine: GameEngine): void {
    if (interaction instanceof OfferInteraction) {
      this.handleOfferInteraction(interaction, engine);
    } else if (interaction instanceof OfferDecisionInteraction) {
      this.handleOfferDecisionInteraction(interaction, executor.requireComponent(OfferParty), engine);
    }
  }

  private handleOfferInteraction({ offer }: OfferInteraction, engine: GameEngine): void {
    if (offer.pending) {
      offer.parties.forEach((party) => party.addOffer(offer));
    }
    this.addEventIfOfferAcceptedOrRejected(offer, engine);
  }

  private handleOfferDecisionInteraction({ offer, decision }: OfferDecisionInteraction, party: OfferParty, engine: GameEngine): void {
    offer.makeDecision(party, decision);
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
