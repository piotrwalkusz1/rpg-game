import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition } from 'engine/core/ecs';
import type { Position } from 'engine/core/map/model/position';
import { IsAlive } from 'engine/modules/health';

export class MoveAction extends Action {
  readonly position: Position;

  constructor({ mover, position }: { mover: ActionExecutor; position: Position }) {
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
