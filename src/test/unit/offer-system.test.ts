import type { Time } from 'engine/core/time';
import { Character } from 'engine/modules/character';
import { InteractionEvent } from 'engine/modules/interaction';
import {
  Offer,
  OfferAcceptedEvent,
  OfferDecision,
  OfferDecisionInteraction,
  OfferDecisionValue,
  OfferParty,
  OfferRejectedEvent,
  OfferSystem
} from 'engine/modules/offer';
import { MockEngine } from 'test/mock/mock-engine';

describe('Offer system', () => {
  let offerSystem: OfferSystem;
  let engine: MockEngine;
  let time: Time;

  beforeEach(() => {
    offerSystem = new OfferSystem();
    engine = new MockEngine();
    time = engine.time;
  });

  describe('InteractionEvent', () => {
    describe('OfferDecisionInteraction', () => {
      it('should add decision to the offer', async () => {
        const submitter = engine.addOfferParty();
        const firstParty = engine.addCharacter().requireComponent(OfferParty);
        const secondParty = engine.addCharacter().requireComponent(OfferParty);
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: submitter }),
            new OfferDecision({ party: firstParty }),
            new OfferDecision({ party: secondParty })
          ]
        });

        await offerSystem.processEvent(mockOfferDecisionInteractionEvent(offer, 'ACCEPTED', firstParty), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: submitter, value: 'ACCEPTED' }),
          new OfferDecision({ party: firstParty, value: 'ACCEPTED' }),
          new OfferDecision({ party: secondParty, value: undefined })
        ]);
        expect(engine.events).toEqual([]);
      });

      it('should create OfferAcceptedEvent if all parties accepted', async () => {
        const submitter = engine.addOfferParty();
        const firstParty = engine.addCharacter().requireComponent(OfferParty);
        const secondParty = engine.addCharacter().requireComponent(OfferParty);
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: submitter }),
            new OfferDecision({ value: 'ACCEPTED', party: firstParty }),
            new OfferDecision({ party: secondParty })
          ]
        });

        await offerSystem.processEvent(mockOfferDecisionInteractionEvent(offer, 'ACCEPTED', secondParty), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: submitter, value: 'ACCEPTED' }),
          new OfferDecision({ party: firstParty, value: 'ACCEPTED' }),
          new OfferDecision({ party: secondParty, value: 'ACCEPTED' })
        ]);
        expect(engine.events).toEqual([new OfferAcceptedEvent({ time, offer })]);
      });

      it('should create OfferRejectEvent if at least one party rejected', async () => {
        const submitter = engine.addOfferParty();
        const firstParty = engine.addCharacter().requireComponent(OfferParty);
        const secondParty = engine.addCharacter().requireComponent(OfferParty);
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: submitter }),
            new OfferDecision({ party: firstParty }),
            new OfferDecision({ party: secondParty })
          ]
        });

        await offerSystem.processEvent(mockOfferDecisionInteractionEvent(offer, 'REJECTED', firstParty), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: submitter, value: 'ACCEPTED' }),
          new OfferDecision({ party: firstParty, value: 'REJECTED' }),
          new OfferDecision({ party: secondParty, value: undefined })
        ]);
        expect(engine.events).toEqual([new OfferRejectedEvent({ time, offer })]);
      });

      function mockOfferDecisionInteractionEvent(offer: Offer, decision: OfferDecisionValue, executor: OfferParty): InteractionEvent {
        return new InteractionEvent({
          time,
          interaction: new OfferDecisionInteraction({ offer, decision }),
          executor: executor.requireComponent(Character)
        });
      }
    });
  });
});
