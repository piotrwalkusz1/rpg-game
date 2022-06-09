import type { GameEngine } from 'engine/core/game';
import type { Character } from '../character';
import { InteractionEvent } from '../interaction';
import { OfferInteraction } from '../offer';
import { TalkOffer } from './talk-offer';

export class TalkService {
  static offerTalk(characterThatOffersTalk: Character, otherCharacter: Character, engine: GameEngine): void {
    engine.addEvent(
      new InteractionEvent({
        time: engine.time,
        interaction: new OfferInteraction(new TalkOffer(characterThatOffersTalk, otherCharacter)),
        executor: characterThatOffersTalk
      })
    );
  }
}
