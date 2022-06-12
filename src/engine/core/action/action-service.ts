import { add } from 'date-fns';
import type { Engine } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Action } from './action';
import { ActionStartedEvent, BeforeActionExecutingEvent } from './action-event';
import type { ActionExecutor } from './action-executor';
import { PendingAction } from './pending-action';

export namespace ActionService {
  export const scheduleAction = (action: Action, executor: ActionExecutor, engine: GameEngine): boolean => {
    if (executor.pendingAction || !canExecuteAction(action, executor, engine)) {
      return false;
    }
    const executionEvent = new BeforeActionExecutingEvent({ action, time: add(engine.time, action.duration), executor });
    executor.pendingAction = new PendingAction({ action, scheduleTime: engine.time, executionEvent });
    engine.addEvents([new ActionStartedEvent({ time: engine.time, action, executor }), executionEvent]);
    return true;
  };

  export const canExecuteAction = (action: Action, actionExecutor: ActionExecutor, engine: Engine): boolean => {
    return action.getExecutionConditions(actionExecutor).every((condition) => condition.check(engine));
  };
}
