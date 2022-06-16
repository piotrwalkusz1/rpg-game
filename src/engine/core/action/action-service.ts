import { add } from 'date-fns';
import type { GameEngine } from 'engine/core/game';
import type { ConditionService } from '../condition';
import type { Action } from './action';
import { ActionStartedEvent, BeforeActionExecutingEvent } from './action-event';
import type { ActionExecutor } from './action-executor';
import { PendingAction } from './pending-action';

export class ActionService {
  constructor(private conditionService: ConditionService) {}

  startAction(action: Action, executor: ActionExecutor, engine: GameEngine): boolean {
    if (!this.canExecuteAction(action, executor, engine)) {
      return false;
    }
    const executionEvent = new BeforeActionExecutingEvent({ action, time: add(engine.time, action.duration), executor });
    executor.pendingAction = new PendingAction({ action, scheduleTime: engine.time, executionEvent });
    engine.addEvents([new ActionStartedEvent({ time: engine.time, action, executor }), executionEvent]);
    return true;
  }

  canExecuteAction(action: Action, actionExecutor: ActionExecutor, engine: GameEngine): boolean {
    const conditions = action.getExecutionConditions(actionExecutor);
    return this.conditionService.checkConditions(conditions, engine);
  }
}
