import { ActivityParticipant } from 'engine/core/activity';
import type { Character } from '../character';
import { Offer, OfferDecision, OfferParty } from '../offer';
import { TalkOfferClause } from './talk-offer-clause';

export class TalkService {
  static offerTalk(characterThatOffersTalk: Character, otherCharacter: Character): Offer {
    const offer: Offer = new Offer({
      clauses: [
        new TalkOfferClause({
          interlocutors: [
            characterThatOffersTalk.requireComponent(ActivityParticipant),
            otherCharacter.requireComponent(ActivityParticipant)
          ]
        })
      ],
      decisions: [
        new OfferDecision({ value: 'ACCEPTED', party: characterThatOffersTalk.requireComponent(OfferParty) }),
        new OfferDecision({ party: otherCharacter.requireComponent(OfferParty) })
      ]
    });
    characterThatOffersTalk.requireComponent(OfferParty).addOffer(offer);
    otherCharacter.requireComponent(OfferParty).addOffer(offer);
    return offer;
  }
}
