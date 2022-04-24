import type { Engine } from 'engine/core/ecs';

export abstract class ActionExecutionCondition {
  abstract canExecuteAction(engine: Engine): boolean;
}
