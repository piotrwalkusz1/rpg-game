import { Action, type ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';

export class AttackAction extends Action {
  readonly target: Entity;

  constructor({ attacker, target }: { attacker: ActionExecutor; target: Entity }) {
    super({ executor: attacker });
    this.target = target;
  }

  override get duration(): Duration {
    return { seconds: 2 };
  }

  override getExecutionConditions(): Condition[] {
    return [new IsAlive(this.executor), new IsAlive(this.target)];
  }
}
