import { CDIContainer } from 'cdi-container';
import type { GameEngine } from 'engine/core/game';
import { NewOffer, Offer, OfferAcceptedEvent, OfferDecision, OfferParty, OfferRejectedEvent, OfferService } from 'engine/modules/offer';
import { GameBuilder } from 'game';

describe('OfferService', () => {
  let offerService: OfferService;
  let engine: GameEngine;
  let offerParty: OfferParty;
  let offerParty2: OfferParty;
  let offerParty3: OfferParty;

  beforeEach(() => {
    offerService = new OfferService();
    engine = CDIContainer.default().get(GameBuilder).build();
    offerParty = OfferParty.create(engine);
    offerParty2 = OfferParty.create(engine);
    offerParty3 = OfferParty.create(engine);
  });

  describe('makeOffer', () => {
    it('should add offer to offer party if offer is pending', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: offerParty }), new OfferDecision({ party: offerParty2 })]
      });

      offerService.makeOffer(offer, engine);

      expect(offerParty.offers).toEqual([offer]);
      expect(offerParty2.offers).toEqual([offer]);
    });

    it('should not add offer to offer party if offer is not pending', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ value: 'ACCEPTED', party: offerParty2 })
        ]
      });

      offerService.makeOffer(offer, engine);

      expect(offerParty.offers).toEqual([]);
      expect(offerParty2.offers).toEqual([]);
    });

    it('should add OfferAcceptedEvent if offer is accepted', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ value: 'ACCEPTED', party: offerParty2 })
        ]
      });

      offerService.makeOffer(offer, engine);

      expect(engine.events).toEqual([new NewOffer({ time: engine.time, offer }), new OfferAcceptedEvent({ time: engine.time, offer })]);
    });

    it('should add OfferRejectedEvent if offer is rejected', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ value: 'REJECTED', party: offerParty2 })
        ]
      });

      offerService.makeOffer(offer, engine);

      expect(engine.events).toEqual([new NewOffer({ time: engine.time, offer }), new OfferRejectedEvent({ time: engine.time, offer })]);
    });
  });

  describe('makeDecision', () => {
    it('should add decision to the offer', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ party: offerParty2 }),
          new OfferDecision({ party: offerParty3 })
        ]
      });

      offerService.makeDecision(offer, offerParty2, 'ACCEPTED', engine);

      expect(offer.decisions).toEqual([
        new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
        new OfferDecision({ party: offerParty2, value: 'ACCEPTED' }),
        new OfferDecision({ party: offerParty3, value: undefined })
      ]);
      expect(engine.events).toEqual([]);
    });

    it('should create OfferAcceptedEvent if all parties accepted', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ value: 'ACCEPTED', party: offerParty2 }),
          new OfferDecision({ party: offerParty3 })
        ]
      });

      offerService.makeDecision(offer, offerParty3, 'ACCEPTED', engine);

      expect(offer.decisions).toEqual([
        new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
        new OfferDecision({ party: offerParty2, value: 'ACCEPTED' }),
        new OfferDecision({ party: offerParty3, value: 'ACCEPTED' })
      ]);
      expect(engine.events).toEqual([new OfferAcceptedEvent({ time: engine.time, offer })]);
    });

    it('should create OfferRejectEvent if at least one party rejected', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: offerParty }),
          new OfferDecision({ party: offerParty2 }),
          new OfferDecision({ party: offerParty3 })
        ]
      });

      offerService.makeDecision(offer, offerParty2, 'REJECTED', engine);

      expect(offer.decisions).toEqual([
        new OfferDecision({ party: offerParty, value: 'ACCEPTED' }),
        new OfferDecision({ party: offerParty2, value: 'REJECTED' }),
        new OfferDecision({ party: offerParty3, value: undefined })
      ]);
      expect(engine.events).toEqual([new OfferRejectedEvent({ time: engine.time, offer })]);
    });
  });
});
