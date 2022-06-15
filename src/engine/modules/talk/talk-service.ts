import type { GameEngine } from 'engine/core/game';
import type { OfferService } from '../offer';
import { TalkOffer } from './talk-offer';
import type { Talker } from './talker';

export class TalkService {
  constructor(private offerService: OfferService) {}

  offerTalk(talkInitiator: Talker, invitedTalker: Talker, engine: GameEngine): void {
    this.offerService.makeOffer(new TalkOffer(talkInitiator, invitedTalker), engine);
  }
}
