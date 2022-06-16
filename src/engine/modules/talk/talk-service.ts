import type { GameEngine } from 'engine/core/game';
import type { OfferService } from '../offer';
import { TalkOffer } from './talk-offer';
import type { Talker } from './talker';

export class TalkService {
  constructor(private offerService: OfferService) {}

  canOfferTalk(talkInitiator: Talker, invitedTalker: Talker): boolean {
    return talkInitiator.fieldObject.field !== undefined && talkInitiator.fieldObject.field === invitedTalker.fieldObject.field;
  }

  offerTalk(talkInitiator: Talker, invitedTalker: Talker, engine: GameEngine): boolean {
    if (!this.canOfferTalk(talkInitiator, invitedTalker)) {
      return false;
    }
    this.offerService.makeOffer(new TalkOffer(talkInitiator, invitedTalker), engine);
    return true;
  }
}
