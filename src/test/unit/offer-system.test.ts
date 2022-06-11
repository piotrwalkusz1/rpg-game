import type { GameEngine } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { getCharacterByName } from 'engine/modules/character';
import { InteractionEvent, InteractionExecutor } from 'engine/modules/interaction';
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
  let character: OfferParty;
  let character2: OfferParty;
  let character3: OfferParty;
  let time: Time;

  beforeEach(() => {
    offerSystem = new OfferSystem();
    engine = new GameBuilder()
      .addCharacter({ name: 'CHARACTER_1' })
      .addCharacter({ name: 'CHARACTER_2' })
      .addCharacter({ name: 'CHARACTER_3' })
      .build();
    character = getCharacterByName(engine, 'CHARACTER_1').requireComponent(OfferParty);
    character2 = getCharacterByName(engine, 'CHARACTER_2').requireComponent(OfferParty);
    character3 = getCharacterByName(engine, 'CHARACTER_3').requireComponent(OfferParty);
    time = engine.time;
  });

  describe('InteractionEvent', () => {
    describe('OfferInteraction', () => {
      it('should add offer to offer party if offer is pending', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [new OfferDecision({ value: 'ACCEPTED', party: character }), new OfferDecision({ party: character2 })]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, character), engine);

        expect(character.offers).toEqual([offer]);
        expect(character2.offers).toEqual([offer]);
      });

      it('should not add offer to offer party if offer is not pending', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ value: 'ACCEPTED', party: character2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, character), engine);

        expect(character.offers).toEqual([]);
        expect(character2.offers).toEqual([]);
      });

      it('should add OfferAcceptedEvent if offer is accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ value: 'ACCEPTED', party: character2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, character), engine);

        expect(engine.events).toEqual([new OfferAcceptedEvent({ time, offer })]);
      });

      it('should add OfferRejectedEvent if offer is accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ value: 'REJECTED', party: character2 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionEvent(offer, character), engine);

        expect(engine.events).toEqual([new OfferRejectedEvent({ time, offer })]);
      });

      function getOfferDecisionEvent(offer: Offer, executor: OfferParty): InteractionEvent {
        return new InteractionEvent({
          time,
          interaction: new OfferInteraction(offer),
          executor: executor.requireComponent(InteractionExecutor)
        });
      }
    });

    describe('OfferDecisionInteraction', () => {
      it('should add decision to the offer', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ party: character2 }),
            new OfferDecision({ party: character3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'ACCEPTED', character2), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: character, value: 'ACCEPTED' }),
          new OfferDecision({ party: character2, value: 'ACCEPTED' }),
          new OfferDecision({ party: character3, value: undefined })
        ]);
        expect(engine.events).toEqual([]);
      });

      it('should create OfferAcceptedEvent if all parties accepted', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ value: 'ACCEPTED', party: character2 }),
            new OfferDecision({ party: character3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'ACCEPTED', character3), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: character, value: 'ACCEPTED' }),
          new OfferDecision({ party: character2, value: 'ACCEPTED' }),
          new OfferDecision({ party: character3, value: 'ACCEPTED' })
        ]);
        expect(engine.events).toEqual([new OfferAcceptedEvent({ time, offer })]);
      });

      it('should create OfferRejectEvent if at least one party rejected', async () => {
        const offer = new Offer({
          clauses: [],
          decisions: [
            new OfferDecision({ value: 'ACCEPTED', party: character }),
            new OfferDecision({ party: character2 }),
            new OfferDecision({ party: character3 })
          ]
        });

        await offerSystem.processEvent(getOfferDecisionInteractionEvent(offer, 'REJECTED', character2), engine);

        expect(offer.decisions).toEqual([
          new OfferDecision({ party: character, value: 'ACCEPTED' }),
          new OfferDecision({ party: character2, value: 'REJECTED' }),
          new OfferDecision({ party: character3, value: undefined })
        ]);
        expect(engine.events).toEqual([new OfferRejectedEvent({ time, offer })]);
      });

      function getOfferDecisionInteractionEvent(offer: Offer, decision: OfferDecisionValue, executor: OfferParty): InteractionEvent {
        return new InteractionEvent({
          time,
          interaction: new OfferDecisionInteraction({ offer, decision }),
          executor: executor.requireComponent(InteractionExecutor)
        });
      }
    });
  });
});
