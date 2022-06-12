import { ECSEvent, System } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import { ActionExecutedEvent, ActionExecutingEvent, BeforeActionExecutingEvent } from './action-event';
import { ActionService } from './action-service';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent, engine: GameEngine): Promise<void> {
    if (event instanceof BeforeActionExecutingEvent) {
      this.handleBeforeActionExecutingEvent(event, engine);
    }
  }

  private handleBeforeActionExecutingEvent({ time, action, executor }: BeforeActionExecutingEvent, engine: GameEngine): void {
    if (executor.pendingAction?.action !== action) {
      return;
    }
    executor.pendingAction = undefined;
    if (ActionService.canExecuteAction(action, executor, engine)) {
      engine.addEvent(new ActionExecutingEvent({ time, action, executor }));
      engine.addEvent(new ActionExecutedEvent({ time, action, executor }));
    }
  }
}
