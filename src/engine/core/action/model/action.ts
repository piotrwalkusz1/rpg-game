import type { ActionExecutor } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';

export abstract class Action {
  readonly executor: ActionExecutor;

  constructor({ executor }: { executor: ActionExecutor }) {
    this.executor = executor;
  }

  abstract get duration(): Duration;

  abstract getExecutionConditions(): Condition[];
}
