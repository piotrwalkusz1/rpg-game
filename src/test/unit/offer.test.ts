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
});
