import { Offer, OfferDecision, OfferParty } from 'engine/modules/offer';

describe('Offer', () => {
  const OFFER_PARTY = new OfferParty();
  const OFFER_PARTY_2 = new OfferParty();
  const OFFER_PARTY_3 = new OfferParty();
  const OFFER_PARTY_4 = new OfferParty();

  describe('constructor', () => {
    it('should set offer status to pending', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }), new OfferDecision({ party: new OfferParty() })]
      });

      expect(offer.status).toEqual('PENDING');
    });

    it('should set offer status to accepted', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }),
          new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY_2 })
        ]
      });

      expect(offer.status).toEqual('ACCEPTED');
    });

    it('should set offer status to rejected', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }),
          new OfferDecision({ value: 'REJECTED', party: OFFER_PARTY_2 })
        ]
      });

      expect(offer.status).toEqual('REJECTED');
    });
  });

  describe('partiesWithPendingDecisions method', () => {
    it('should get parties with pending decisions', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }),
          new OfferDecision({ party: OFFER_PARTY_2 }),
          new OfferDecision({ value: 'REJECTED', party: OFFER_PARTY_3 }),
          new OfferDecision({ party: OFFER_PARTY_4 })
        ]
      });

      const partiesWithPendingDecisions = offer.partiesWithPendingDecisions;

      expect(partiesWithPendingDecisions).toEqual([OFFER_PARTY_2, OFFER_PARTY_4]);
    });
  });

  describe('pendingDecisions getter', () => {
    it('should get pending decisions', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }),
          new OfferDecision({ party: OFFER_PARTY_2 }),
          new OfferDecision({ value: 'REJECTED', party: OFFER_PARTY_3 }),
          new OfferDecision({ party: OFFER_PARTY_4 })
        ]
      });

      const pendingDecisions = offer.pendingDecisions;

      expect(pendingDecisions).toEqual([new OfferDecision({ party: OFFER_PARTY_2 }), new OfferDecision({ party: OFFER_PARTY_4 })]);
    });
  });

  describe('makeDecision method', () => {
    it('should set decision value to accepted', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }), new OfferDecision({ party: OFFER_PARTY_2 })]
      });

      offer.makeDecision(OFFER_PARTY_2, 'ACCEPTED');

      expect(offer.decisions).toEqual([
        new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }),
        new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY_2 })
      ]);
    });

    it('should change decision value to rejected', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }), new OfferDecision({ party: OFFER_PARTY_2 })]
      });

      offer.makeDecision(OFFER_PARTY, 'REJECTED');

      expect(offer.decisions).toEqual([
        new OfferDecision({ value: 'REJECTED', party: OFFER_PARTY }),
        new OfferDecision({ party: OFFER_PARTY_2 })
      ]);
    });

    it('should change status to accepted', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }), new OfferDecision({ party: OFFER_PARTY_2 })]
      });

      offer.makeDecision(OFFER_PARTY_2, 'ACCEPTED');

      expect(offer.status).toEqual('ACCEPTED');
    });

    it('should change status to rejected', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: OFFER_PARTY }), new OfferDecision({ party: OFFER_PARTY_2 })]
      });

      offer.makeDecision(OFFER_PARTY_2, 'REJECTED');

      expect(offer.status).toEqual('REJECTED');
    });

    it('should not change status', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ party: OFFER_PARTY }), new OfferDecision({ party: OFFER_PARTY_2 })]
      });

      offer.makeDecision(OFFER_PARTY, 'ACCEPTED');

      expect(offer.status).toEqual('PENDING');
    });
  });

  describe('accepted getter', () => {
    it('should return true if all parties accepted offer', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toEqual(true);
    });

    it('should return false if at least one party did not make decision', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ party: new OfferParty() })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toEqual(false);
    });

    it('should return false if at least one party rejected offer', () => {
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ value: 'ACCEPTED', party: new OfferParty() }),
          new OfferDecision({ value: 'REJECTED', party: new OfferParty() })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toEqual(false);
    });
  });
});
