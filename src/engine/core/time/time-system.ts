import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { TimeEvent } from 'engine/core/time/time-event';
import { TimeManager } from 'engine/core/time/time-manager';

export class TimeSystem extends System {
  override async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof TimeEvent) {
      const timeManager: TimeManager | undefined = engine.getComponent(TimeManager);
      if (timeManager) {
        timeManager.time = event.time;
      }
    }
  }
}
