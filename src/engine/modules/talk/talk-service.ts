import { addMinutes } from 'date-fns';
import type { ActivityService } from 'engine/core/activity';
import type { GameEngine } from 'engine/core/game';
import type { OfferService } from '../offer';
import { TalkActivity } from './talk-activity';
import { TalkOffer } from './talk-offer';
import type { Talker } from './talker';

export class TalkService {
  constructor(private offerService: OfferService, private activityService: ActivityService) {}

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

  startTalk(talkers: readonly Talker[], engine: GameEngine): void {
    const participants = talkers.map((talker) => talker.activityParticipant);
    const talkEndTime = addMinutes(engine.time, 1);
    this.activityService.startActivity(new TalkActivity({ participants }), engine, talkEndTime);
  }
}
