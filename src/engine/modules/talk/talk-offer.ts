import { Offer, OfferDecision } from '../offer';
import { TalkOfferClause } from './talk-offer-clause';
import type { TalkerBundle } from './talker-bundle';

export class TalkOffer extends Offer {
  constructor(talkInitiator: TalkerBundle, invitedTalker: TalkerBundle) {
    super({
      clauses: [
        new TalkOfferClause({
          talkers: [talkInitiator, invitedTalker]
        })
      ],
      decisions: [
        new OfferDecision({ value: 'ACCEPTED', party: talkInitiator.offerParty }),
        new OfferDecision({ party: invitedTalker.offerParty })
      ]
    });
  }
}
