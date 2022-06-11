import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { ActionExecutedEvent, ActionExecutingEvent, BeforeActionExecutingEvent } from './action-event';
import { ActionService } from './action-service';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof BeforeActionExecutingEvent) {
      this.handleBeforeActionExecutingEvent(event, engine);
    }
  }

  private handleBeforeActionExecutingEvent({ time, action, executor }: BeforeActionExecutingEvent, engine: Engine): void {
    if (executor.pendingAction?.action !== action) {
      return;
    }
    executor.pendingAction = undefined;
    if (ActionService.canExecuteAction(action, executor, engine)) {
      engine.requireComponent(GameEventQueue).addEvent(new ActionExecutingEvent({ time, action, executor }));
      engine.requireComponent(GameEventQueue).addEvent(new ActionExecutedEvent({ time, action, executor }));
    }
  }
}
