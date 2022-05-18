import { add } from 'date-fns';
import { ECSEvent, Engine, System } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import {
  ActionExecutedEvent,
  ActionExecutingEvent,
  ActionScheduledEvent,
  ActionStartedEvent,
  BeforeActionExecutingEvent
} from './action-event';
import { ActionService } from './action-service';
import { PendingAction } from './pending-action';

export class ActionSystem extends System {
  async processEvent(event: ECSEvent, engine: Engine): Promise<void> {
    if (event instanceof ActionScheduledEvent) {
      this.handleActionScheduledEvent(event, engine);
    } else if (event instanceof BeforeActionExecutingEvent) {
      this.handleBeforeActionExecutingEvent(event, engine);
    }
  }

  private handleActionScheduledEvent({ time, action, executor }: ActionScheduledEvent, engine: Engine): void {
    const executionEvent = new BeforeActionExecutingEvent({ action, time: add(time, action.duration), executor });
    executor.pendingAction = new PendingAction({ action, scheduleTime: time, executionEvent });
    engine.requireComponent(GameEventQueue).addEvents([new ActionStartedEvent({ time, action, executor }), executionEvent]);
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
