import { Offer, OfferParty } from 'engine/modules/offer';

describe('Offer party', () => {
  class MockOffer extends Offer {}

  describe('getOffersAwaitingForDecisionOfThisParty', () => {
    it('should return empty array if no offers awaiting for decision of this party', () => {
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const thirdParty = new OfferParty();
      const firstOffer = new MockOffer({ submitter: firstParty, otherParties: [secondParty] });
      firstOffer.makeDecision(secondParty, 'ACCEPTED');
      const secondOffer = new MockOffer({ submitter: firstParty, otherParties: [secondParty, thirdParty] });
      secondOffer.makeDecision(secondParty, 'REJECTED');

      const offers = secondParty.getOffersAwaitingForDecisionOfThisParty();

      expect(offers).toEqual([]);
    });

    it('should return offers awaiting for decision of this party', () => {
      const firstParty = new OfferParty();
      const secondParty = new OfferParty();
      const thirdParty = new OfferParty();
      const firstOffer = new MockOffer({ submitter: firstParty, otherParties: [secondParty] });
      const secondOffer = new MockOffer({ submitter: firstParty, otherParties: [secondParty, thirdParty] });
      secondOffer.makeDecision(thirdParty, 'REJECTED');

      const offers = secondParty.getOffersAwaitingForDecisionOfThisParty();

      expect(offers).toEqual([firstOffer, secondOffer]);
    });
  });
});
