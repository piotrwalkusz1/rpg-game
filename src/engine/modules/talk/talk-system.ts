import { addMinutes } from 'date-fns';
import { ActivityParticipant } from 'engine/core/activity';
import { EndActivityEvent } from 'engine/core/activity/activity-event';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import type { Time } from 'engine/core/time';
import { OfferAcceptedEvent } from '../offer';
import { TalkActivity } from './talk-activity';
import { TalkOffer } from './talk-offer';

export class TalkSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof OfferAcceptedEvent && event.offer instanceof TalkOffer) {
      const participants: ActivityParticipant[] = event.offer.parties
        .getArray()
        .map((party) => party.requireComponent(ActivityParticipant));
      const activity = new TalkActivity({ participants });
      const endActivityTime: Time = addMinutes(event.time, 1);
      engine.requireComponent(GameEventQueue).addEvent(new EndActivityEvent({ time: endActivityTime, activity }));
    }
  }
}
