import { Engine, EntityProvider } from 'engine/core/ecs';
import type { GameEngine } from 'engine/core/game';
import type { Action } from './action';
import { ActionScheduledEvent } from './action-event';
import { ActionExecutor } from './action-executor';

export namespace ActionService {
  export const scheduleAction = (action: Action, executor: ActionExecutor, engine: GameEngine): boolean => {
    if (executor.pendingAction || !canExecuteAction(action, executor, engine)) {
      return false;
    }
    engine.addEvent(new ActionScheduledEvent({ time: engine.time, action, executor }));
    return true;
  };

  export const canExecuteAction = (action: Action, executor: EntityProvider, engine: Engine): boolean => {
    const actionExecutor = EntityProvider.requireComponent(executor, ActionExecutor);
    return action.getExecutionConditions(actionExecutor).every((condition) => condition.check(engine));
  };
}
