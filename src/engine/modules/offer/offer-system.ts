import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { InteractionEvent } from '../interaction';
import { OfferDecisionInteraction } from './offer-decision-interaction';
import { OfferAcceptedEvent, OfferRejectedEvent } from './offer-event';
import { OfferParty } from './offer-party';

export class OfferSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof InteractionEvent && event.interaction instanceof OfferDecisionInteraction) {
      const offer = event.interaction.offer;
      const decision = event.interaction.decision;
      offer.makeDecision(event.executor.requireComponent(OfferParty), decision);
      if (offer.isAccepted()) {
        engine.requireComponent(GameEventQueue).addEvent(new OfferAcceptedEvent({ time: event.time, offer }));
      } else if (offer.isRejected()) {
        engine.requireComponent(GameEventQueue).addEvent(new OfferRejectedEvent({ time: event.time, offer }));
      }
    }
  }
}