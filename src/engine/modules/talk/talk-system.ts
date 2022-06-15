import { addMinutes } from 'date-fns';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import type { ECSEvent } from 'engine/core/ecs';
import { GameEngine, GameSystem } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { ArrayUtils } from 'utils';
import { OfferAcceptedEvent } from '../offer';
import { TalkActivity } from './talk-activity';
import { TalkOfferClause } from './talk-offer-clause';

export class TalkSystem extends GameSystem {
  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof OfferAcceptedEvent) {
      ArrayUtils.filterInstanceOf(event.offer.clauses, TalkOfferClause).forEach((clause) => {
        const activity = new TalkActivity({ participants: clause.talkers.map((talker) => talker.activityParticipant) });
        const endActivityTime: Time = addMinutes(event.time, 1);
        engine.addEvent(new EndActivityEvent({ time: endActivityTime, activity }));
      });
    }
  }
}
