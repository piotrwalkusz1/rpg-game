import type { ECSEvent } from '../ecs';
import { GameEngine, GameSystem } from '../game';
import { ActivityEndScheduledEvent } from './activity-event';
import type { ActivityService } from './activity-service';

export class ActivitySystem extends GameSystem {
  constructor(private activityService: ActivityService) {
    super();
  }

  override async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof ActivityEndScheduledEvent) {
      this.activityService.endActivity(event.activity, engine);
    }
  }
}
