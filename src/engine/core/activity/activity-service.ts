import type { GameEngine } from '../game';
import type { Time } from '../time';
import type { Activity } from './activity';
import { ActivityEndedEvent, ActivityEndScheduledEvent, ActivityStartedEvent as ActivityStartedEvent } from './activity-event';

export class ActivityService {
  startActivity(activity: Activity, engine: GameEngine, endTime?: Time): void {
    activity.participants.forEach((participant) => participant.addActivity(activity));
    engine.addEvent(new ActivityStartedEvent({ time: engine.time, activity }));
    if (endTime) {
        engine.addEvent(new ActivityEndScheduledEvent({time: endTime, activity}));
    }
  }

  endActivity(activity: Activity, engine: GameEngine): void {
    activity.participants.forEach(participant => participant.removeActivity(activity));
    engine.addEvent(new ActivityEndedEvent({ time: engine.time, activity }));
  }
}
