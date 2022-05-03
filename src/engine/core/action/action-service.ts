import { add } from 'date-fns';
import { Engine, EntityProvider } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { Action, ActionScheduledEvent, BeforeActionExecutingEvent, PendingAction } from '.';
import { ActionExecutor } from './action-executor';

export namespace ActionService {
  export const scheduleAction = (action: Action, executor: ActionExecutor, engine: Engine): boolean => {
    if (executor.pendingAction || !canExecuteAction(action, executor, engine)) {
      return false;
    }
    const time: Time | undefined = engine.getComponent(TimeManager)?.time;
    if (!time) {
      return false;
    }
    const scheduledEvent = new ActionScheduledEvent({ time, action, executor });
    const executionEvent = new BeforeActionExecutingEvent({ action, time: add(time, action.duration), executor });
    executor.pendingAction = new PendingAction({ action, scheduleTime: time, executionEvent });
    engine.getComponent(GameEventQueue)?.addEvents([scheduledEvent, executionEvent]);
    return true;
  };

  export const canExecuteAction = (action: Action, executor: EntityProvider, engine: Engine): boolean => {
    const actionExecutor = EntityProvider.getComponent(executor, ActionExecutor);
    return actionExecutor ? action.getExecutionConditions(actionExecutor).every((condition) => condition.check(engine)) : false;
  };
}
