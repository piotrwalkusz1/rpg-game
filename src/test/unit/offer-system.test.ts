import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { InteractionEvent } from 'engine/modules/interaction';
import {
  Offer,
  OfferAcceptedEvent,
  OfferDecision,
  OfferDecisionInteraction,
  OfferDecisionValue,
  OfferInteraction,
  OfferParty,
  OfferRejectedEvent,
  OfferSystem
} from 'engine/modules/offer';
import { GameBuilder } from 'game';

describe('Offer system', () => {
  let offerSystem: OfferSystem;
  let engine: GameEngine;
  let offerParty: OfferParty;
  let offerParty2: OfferParty;
  let offerParty3: OfferParty;

  beforeEach(() => {
    offerSystem = new OfferSystem();
    engine = CDIContainer.default().get(GameBuilder).build();
    offerParty = OfferParty.create(engine);
    offerParty2 = OfferParty.create(engine);
    offerParty3 = OfferParty.create(engine);
  });

  describe('InteractionEvent', () => {
    describe('OfferInteraction', () => {
      it('should add offer to offer party if offer is pending', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [new OfferDecision({ value: 'ACCEPTED', party: offerParty }), new OfferDecision({ party: offerParty2 })]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, offerParty), engine);

        expect(offerParty.offers).toEqual([offer]);
        expect(offerParty2.offers).toEqual([offer]);
      });

      it('should not add offer to offer party if offer is not pending', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ value: 'ACCEPTED', party: offerParty2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, offerParty), engine);

        expect(offerParty.offers).toEqual([]);
        expect(offerParty2.offers).toEqual([]);
      });

      it('should add OfferAcceptedEvent if offer is accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ value: 'ACCEPTED', party: offerParty2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, offerParty), engine);

        expect(engine.events).toEqual([new OfferAcceptedEvent({ time: engine.time, offer })]);
      });

      it('should add OfferRejectedEvent if offer is accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ value: 'REJECTED', party: offerParty2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, offerParty), engine);

        expect(engine.events).toEqual([new OfferRejectedEvent({ time: engine.time, offer })]);
      });

      function getOfferDecisionEvent(offer: Offer, executor: OfferParty): InteractionEvent {
        return new InteractionEvent({
          time: engine.time,
          interaction: new OfferInteraction(offer),
          executor
        });
      }
    });

    describe('OfferDecisionInteraction', () => {
      it('should add decision to the offer', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ party: offerParty2 }),
            new OfferDecision({ party: offerParty3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'ACCEPTED', offerParty2), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
          new OfferDecision({ party: offerParty2, value: 'ACCEPTED' }),
          new OfferDecision({ party: offerParty3, value: undefined })
        ]);
        expect(engine.events).toEqual([]);
      });

      it('should create OfferAcceptedEvent if all parties accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ value: 'ACCEPTED', party: offerParty2 }),
            new OfferDecision({ party: offerParty3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'ACCEPTED', offerParty3), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
          new OfferDecision({ party: offerParty2, value: 'ACCEPTED' }),
          new OfferDecision({ party: offerParty3, value: 'ACCEPTED' })
        ]);
        expect(engine.events).toEqual([new OfferAcceptedEvent({ time: engine.time, offer })]);
      });

      it('should create OfferRejectEvent if at least one party rejected', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
            new OfferDecision({ party: offerParty2 }),
            new OfferDecision({ party: offerParty3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'REJECTED', offerParty2), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
          new OfferDecision({ party: offerParty2, value: 'REJECTED' }),
          new OfferDecision({ party: offerParty3, value: undefined })
        ]);
        expect(engine.events).toEqual([new OfferRejectedEvent({ time: engine.time, offer })]);
      });

      function getOfferDecisionInteractionEvent(offer: Offer, decision: OfferDecisionValue, executor: OfferParty): InteractionEvent {
        return new InteractionEvent({
          time: engine.time,
          interaction: new OfferDecisionInteraction({ offer, decision }),
          executor
        });
      }
    });
  });
});
