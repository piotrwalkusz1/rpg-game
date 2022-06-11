import type { GameEngine } from 'engine/core/game';
import { InteractionEvent } from '../interaction';
import { OfferInteraction } from '../offer';
import { TalkOffer } from './talk-offer';
import type { Talker } from './talker';

export class TalkService {
  static offerTalk(talkInitiator: Talker, invitedTalker: Talker, engine: GameEngine): void {
    engine.addEvent(
      new InteractionEvent({
        time: engine.time,
        interaction: new OfferInteraction(new TalkOffer(talkInitiator, invitedTalker)),
        executor: talkInitiator
      })
    );
  }
}
