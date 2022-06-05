import type { Character } from '../character';
import { OfferInteraction } from '../offer';

export class TalkOfferInteraction extends OfferInteraction {
  readonly interlocutor: Character;

  constructor({ interlocutor }: { interlocutor: Character }) {
    super();
    this.interlocutor = interlocutor;
  }
}
