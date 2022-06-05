import { ECSEvent, Engine, System } from '../ecs';
import { EndActivityEvent } from './activity-event';

export class ActivitySystem extends System {
  override async processEvent(event: ECSEvent, _engine: Engine): Promise<void> {
    if (event instanceof EndActivityEvent) {
      event.activity.removeAllParticipants();
    }
  }
}
