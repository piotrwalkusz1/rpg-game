import { Offer, OfferDecision, OfferParty } from 'engine/modules/offer';

describe('Offer', () => {
  class MockOffer extends Offer {}

  describe('constructor', () => {
    it('should set offer status to pending', () => {
      const submitter = new OfferParty();
      const otherParty = new OfferParty();

      const offer = new MockOffer({ submitter, otherParties: [otherParty] });

      expect(offer.status).toEqual('PENDING');
    });

    it('should add sumbitter and other parties to parties list', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();

      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });

      expect(offer.parties.getArray()).toEqual([submitter, firstParty, secondParty]);
    });

    it('should create offer with one accepted decision for submitter and one pending decision for each other party', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();

      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });

      expect(offer.decisions).toEqual([
        new OfferDecision({ value: 'ACCEPTED', party: submitter }),
        new OfferDecision({ value: undefined, party: firstParty }),
        new OfferDecision({ value: undefined, party: secondParty })
      ]);
    });
  });

  describe('makeDecision', () => {
    it('should change decision value if party exists on offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });

      offer.makeDecision(secondParty, 'ACCEPTED');

      expect(offer.decisions).toEqual([
        new OfferDecision({ value: 'ACCEPTED', party: submitter }),
        new OfferDecision({ value: undefined, party: firstParty }),
        new OfferDecision({ value: 'ACCEPTED', party: secondParty })
      ]);
    });

    it('should do nothing if party does not exist on offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty] });

      offer.makeDecision(secondParty, 'ACCEPTED');

      expect(offer.decisions).toEqual([
        new OfferDecision({ value: 'ACCEPTED', party: submitter }),
        new OfferDecision({ value: undefined, party: firstParty })
      ]);
    });
  });

  describe('isAccepted', () => {
    it('should return true if all parties accepted offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });
      offer.makeDecision(firstParty, 'ACCEPTED');
      offer.makeDecision(secondParty, 'ACCEPTED');

      const accepted = offer.isAccepted();

      expect(accepted).toBeTruthy();
    });

    it('should return false if at least one party did not make decision', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });
      offer.makeDecision(firstParty, 'ACCEPTED');

      const accepted = offer.isAccepted();

      expect(accepted).toBeFalsy();
    });

    it('should return false if at least one party rejected offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });
      offer.makeDecision(firstParty, 'ACCEPTED');
      offer.makeDecision(secondParty, 'REJECTED');

      const accepted = offer.isAccepted();

      expect(accepted).toBeFalsy();
    });
  });

  describe('isRejected', () => {
    it('should return true if at least one party rejected offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });
      offer.makeDecision(firstParty, 'REJECTED');

      const accepted = offer.isRejected();

      expect(accepted).toBeTruthy();
    });

    it('should return false if no party rejected offer', () => {
      const submitter = new OfferParty();
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const offer = new MockOffer({ submitter, otherParties: [firstParty, secondParty] });

      const accepted = offer.isRejected();

      expect(accepted).toBeFalsy();
    });
  });
});
