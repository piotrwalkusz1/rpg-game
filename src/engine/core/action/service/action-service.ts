import { add } from 'date-fns';
import type { Action } from 'engine/core/action';
import { ActionScheduledEvent, BeforeActionExecutingEvent } from 'engine/core/action/model/action-event';
import type { Engine } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import type { Time } from 'engine/core/time/time';
import { TimeManager } from 'engine/core/time/time-manager';
import { PendingAction } from '../model/pending-action';

export namespace ActionService {
  export const scheduleAction = (action: Action, engine: Engine): void => {
    if (action.executor.pendingAction || !canExecuteAction(action, engine)) {
      return;
    }
    const time: Time | undefined = engine.getComponent(TimeManager)?.time;
    if (!time) {
      return;
    }
    const scheduledEvent = new ActionScheduledEvent({ time, action });
    const executionEvent = new BeforeActionExecutingEvent({
      action,
      time: add(time, action.duration)
    });
    const executor = action.executor;
    executor.pendingAction = new PendingAction({ action, scheduleTime: time, executionEvent });
    engine.getComponent(GameEventQueue)?.addEvents([scheduledEvent, executionEvent]);
  };

  export const canExecuteAction = (action: Action, engine: Engine): boolean => {
    return action.getExecutionConditions().every((condition) => condition.check(engine));
  };
}
