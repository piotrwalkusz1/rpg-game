import type { Condition } from 'engine/core/ecs';
import type { ActionExecutor } from './action-executor';

export abstract class Action {
  abstract get duration(): Duration;

  abstract getExecutionConditions(executor: ActionExecutor): Condition[];
}
