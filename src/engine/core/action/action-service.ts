import { Engine, EntityProvider } from 'engine/core/ecs';
import { GameEventQueue } from 'engine/core/game';
import { Time, TimeManager } from 'engine/core/time';
import { Action, ActionScheduledEvent } from '.';
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
    engine.getComponent(GameEventQueue)?.addEvent(new ActionScheduledEvent({ time, action, executor }));
    return true;
  };

  export const canExecuteAction = (action: Action, executor: EntityProvider, engine: Engine): boolean => {
    const actionExecutor = EntityProvider.getComponent(executor, ActionExecutor);
    return actionExecutor ? action.getExecutionConditions(actionExecutor).every((condition) => condition.check(engine)) : false;
  };
}
