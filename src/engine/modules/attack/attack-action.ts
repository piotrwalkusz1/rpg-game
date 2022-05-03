import { Action, type ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';

export class AttackAction extends Action {
  readonly target: Entity;

  constructor({ target }: { target: Entity }) {
    super();
    this.target = target;
  }

  override get duration(): Duration {
    return { seconds: 2 };
  }

  override getExecutionConditions(executor: ActionExecutor): Condition[] {
    return [new IsAlive(executor), new IsAlive(this.target)];
  }
}
