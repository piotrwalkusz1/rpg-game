import { add } from 'date-fns';
import type { Engine } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { Action, ActionScheduledEvent, BeforeActionExecutingEvent, PendingAction } from '.';

export namespace ActionService {
  export const scheduleAction = (action: Action, engine: Engine): boolean => {
    if (action.executor.pendingAction || !canExecuteAction(action, engine)) {
      return false;
    }
    const time: Time | undefined = engine.getComponent(TimeManager)?.time;
    if (!time) {
      return false;
    }
    const scheduledEvent = new ActionScheduledEvent({ time, action });
    const executionEvent = new BeforeActionExecutingEvent({
      action,
      time: add(time, action.duration)
    });
    const executor = action.executor;
    executor.pendingAction = new PendingAction({ action, scheduleTime: time, executionEvent });
    engine.getComponent(GameEventQueue)?.addEvents([scheduledEvent, executionEvent]);
    return true;
  };

  export const canExecuteAction = (action: Action, engine: Engine): boolean => {
    return action.getExecutionConditions().every((condition) => condition.check(engine));
  };
}
