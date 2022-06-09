import { ActivityParticipant } from 'engine/core/activity';
import type { Character } from '../character';
import { Offer, OfferDecision, OfferParty } from '../offer';
import { TalkOfferClause } from './talk-offer-clause';

export class TalkOffer extends Offer {
  constructor(characterThatOffersTalk: Character, otherCharacter: Character) {
    super({
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
  }
}
