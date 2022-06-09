import { Character } from '../character';
import { Offer, OfferInteraction, OfferParty } from '../offer';
import { TalkService } from './talk-service';

export class TalkOfferInteraction extends OfferInteraction {
  readonly interlocutor: Character;

  constructor({ interlocutor }: { interlocutor: Character }) {
    super();
    this.interlocutor = interlocutor;
  }

  override createOffer(submitter: OfferParty): Offer {
    return TalkService.offerTalk(submitter.requireComponent(Character), this.interlocutor);
  }
}
