import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';
import type { FieldObjectPosition } from 'engine/core/field';
import { IsAlive } from 'engine/modules/health';

export class MoveAction extends Action {
  readonly position: FieldObjectPosition;

  constructor({ mover, position }: { mover: ActionExecutor; position: FieldObjectPosition }) {
    super({ executor: mover });
    this.position = position;
  }

  get duration(): Duration {
    return { minutes: 1 };
  }

  override getExecutionConditions(): Condition[] {
    return [new IsAlive(this.executor)];
  }
}
