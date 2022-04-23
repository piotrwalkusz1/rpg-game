import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsSameTerrainObjectPlacement } from 'engine/core/map/condition/is-same-terrain-object-placement';
import { IsAlive } from 'engine/modules/health';
import { HasInformation } from 'engine/modules/information';
import type { Information } from 'engine/modules/information/information';

export class InformAction extends Action {
  readonly informationReceiver: Entity;
  readonly information: Information;

  constructor({
    informationGiver,
    informationReceiver,
    information
  }: {
    informationGiver: ActionExecutor;
    informationReceiver: Entity;
    information: Information;
  }) {
    super({ executor: informationGiver });
    this.informationReceiver = informationReceiver;
    this.information = information;
  }

  override get duration(): Duration {
    return { seconds: 10 };
  }

  override getExecutionConditions(): Condition[] {
    return [
      new IsAlive(this.executor),
      new IsAlive(this.informationReceiver),
      new IsSameTerrainObjectPlacement([this.executor, this.informationReceiver]),
      new HasInformation(this.executor, this.information)
    ];
  }
}
