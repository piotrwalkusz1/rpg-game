import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition } from 'engine/core/condition';
import type { FieldObjectPosition } from 'engine/core/field';
import { AreFieldsConnected } from 'engine/core/field/are-fields-connected';
import { IsAlive } from 'engine/modules/health';

export class MoveAction extends Action {
  readonly position: FieldObjectPosition;

  constructor({ position }: { position: FieldObjectPosition }) {
    super();
    this.position = position;
  }

  get duration(): Duration {
    return { minutes: 1 };
  }

  override getExecutionConditions(executor: ActionExecutor): Condition[] {
    return [new IsAlive(executor), new AreFieldsConnected([executor, this.position])];
  }
}
