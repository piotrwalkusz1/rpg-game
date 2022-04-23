import type { ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { PositionComponent } from 'engine/core/map/component/position-component';
import { IsSameTerrainObjectPlacement } from 'engine/core/map/condition/is-same-terrain-object-placement';
import { IsAlive } from 'engine/modules/health';
import { Action } from '../../core/action/model/action';
import type { Position } from '../../core/map/model/position';

export class AttackAction extends Action {
  readonly target: Entity;
  readonly position: Position;

  constructor({ attacker, target }: { attacker: ActionExecutor; target: Entity }) {
    super({ executor: attacker });
    const position: Position | undefined = target.getComponent(PositionComponent)?.getPosition();
    if (!position) {
      throw new Error('Attacked victim must have position');
    }
    this.target = target;
    this.position = position;
  }

  override get duration(): Duration {
    return { seconds: 2 };
  }

  override getExecutionConditions(): Condition[] {
    return [new IsAlive(this.executor), new IsAlive(this.target), new IsSameTerrainObjectPlacement([this.executor, this.target])];
  }
}
