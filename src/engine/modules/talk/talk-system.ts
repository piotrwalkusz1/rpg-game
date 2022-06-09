import { addMinutes } from 'date-fns';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { ArrayUtils } from 'utils';
import { OfferAcceptedEvent } from '../offer';
import { TalkActivity } from './talk-activity';
import { TalkOfferClause } from './talk-offer-clause';

export class TalkSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof OfferAcceptedEvent) {
      ArrayUtils.filterInstanceOf(event.offer.clauses, TalkOfferClause).forEach((clause) => {
        const activity = new TalkActivity({ participants: clause.interlocutors });
        const endActivityTime: Time = addMinutes(event.time, 1);
        engine.requireComponent(GameEventQueue).addEvent(new EndActivityEvent({ time: endActivityTime, activity }));
      });
    }
  }
}
