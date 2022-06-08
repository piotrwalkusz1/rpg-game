import type { Character } from '../character';
import { Offer, OfferInteraction, OfferParty } from '../offer';
import { TalkOffer } from './talk-offer';

export class TalkOfferInteraction extends OfferInteraction {
  readonly interlocutor: Character;

  constructor({ interlocutor }: { interlocutor: Character }) {
    super();
    this.interlocutor = interlocutor;
  }

  override createOffer(submitter: OfferParty): Offer {
    return new TalkOffer({ submitter, otherParties: [this.interlocutor.requireComponent(OfferParty)] });
  }
}
