import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Character } from '../character';
import { InteractionEvent, InteractionService } from '../interaction';
import { OfferDecisionInteraction } from './offer-decision-interaction';
import { OfferAcceptedEvent, OfferRejectedEvent } from './offer-event';
import { OfferInteraction } from './offer-interaction';
import { OfferParty } from './offer-party';

export class OfferSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof InteractionEvent) {
      if (event.interaction instanceof OfferDecisionInteraction) {
        this.handleOfferDecisionInteraction({ interaction: event.interaction, event, engine });
      } else if (event.interaction instanceof OfferInteraction) {
        this.handleOfferInteraction({ interaction: event.interaction, event, engine });
      }
    }
  }

  private handleOfferDecisionInteraction({
    interaction,
    event,
    engine
  }: {
    interaction: OfferDecisionInteraction;
    event: InteractionEvent;
    engine: Engine;
  }): void {
    const offer = interaction.offer;
    const decision = interaction.decision;
    offer.makeDecision(event.executor.requireComponent(OfferParty), decision);
    if (offer.isAccepted()) {
      engine.requireComponent(GameEventQueue).addEvent(new OfferAcceptedEvent({ time: event.time, offer }));
    } else if (offer.isRejected()) {
      engine.requireComponent(GameEventQueue).addEvent(new OfferRejectedEvent({ time: event.time, offer }));
    }
  }

  private handleOfferInteraction({
    interaction,
    event,
    engine
  }: {
    interaction: OfferInteraction;
    event: InteractionEvent;
    engine: Engine;
  }): void {
    const offer = interaction.createOffer(event.executor.requireComponent(OfferParty));
    offer.partiesWithPendingDecisions.forEach((party) =>
      InteractionService.scheduleInteraction(
        new OfferDecisionInteraction({ offer, decision: 'ACCEPTED' }),
        party.requireComponent(Character),
        engine
      )
    );
  }
}
