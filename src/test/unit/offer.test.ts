import { Offer, OfferDecision, OfferParty } from 'engine/modules/offer';

describe('Offer', () => {
  describe('constructor', () => {
    it('should set offer status to pending', () => {
      const submitter = new OfferParty();
      const otherParty = new OfferParty();

      const offer = new Offer({
        clauses: [],
        decisions: [new OfferDecision({ value: 'ACCEPTED', party: submitter }), new OfferDecision({ party: otherParty })]
      });

      expect(offer.status).toEqual('PENDING');
    });
  });

  describe('isAccepted', () => {
    it('should return true if all parties accepted offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: submitter }),
          new OfferDecision({ value: 'ACCEPTED', party: firstParty }),
          new OfferDecision({ value: 'ACCEPTED', party: secondParty })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toBeTruthy();
    });

    it('should return false if at least one party did not make decision', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: submitter }),
          new OfferDecision({ value: 'ACCEPTED', party: firstParty }),
          new OfferDecision({ party: secondParty })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toBeFalsy();
    });

    it('should return false if at least one party rejected offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new Offer({
        clauses: [],
        decisions: [
          new OfferDecision({ value: 'ACCEPTED', party: submitter }),
          new OfferDecision({ value: 'ACCEPTED', party: firstParty }),
          new OfferDecision({ value: 'REJECTED', party: secondParty })
        ]
      });

      const accepted = offer.accepted;

      expect(accepted).toBeFalsy();
    });
  });
});
