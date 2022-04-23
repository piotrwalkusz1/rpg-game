import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';

export class SpeakAction extends Action {
  readonly receivers: Entity[];

  constructor({ speaker, receivers }: { speaker: ActionExecutor; receivers: Entity[] }) {
    super({ executor: speaker });
    this.receivers = receivers;
  }

  override get duration(): Duration {
    return { seconds: 0 };
  }

  override getExecutionConditions(): Condition[] {
    return [new IsAlive(this.executor)];
  }
}
