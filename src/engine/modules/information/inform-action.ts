import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition, Entity } from 'engine/core/ecs';
import { IsAlive } from 'engine/modules/health';
import { HasInformation, Information } from 'engine/modules/information';
export class InformAction extends Action {
  readonly informationReceiver: Entity;
  readonly information: Information;

  constructor({ informationReceiver, information }: { informationReceiver: Entity; information: Information }) {
    super();
    this.informationReceiver = informationReceiver;
    this.information = information;
  }

  override get duration(): Duration {
    return { seconds: 10 };
  }

  override getExecutionConditions(executor: ActionExecutor): Condition[] {
    return [new IsAlive(executor), new IsAlive(this.informationReceiver), new HasInformation(executor, this.information)];
  }
}
