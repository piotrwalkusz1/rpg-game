import { Offer, OfferDecision } from '../offer';
import { TalkOfferClause } from './talk-offer-clause';
import type { Talker } from './talker';

export class TalkOffer extends Offer {
  constructor(talkInitiator: Talker, invitedTalker: Talker) {
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
