import { Action, ActionExecutor } from 'engine/core/action';
import type { Condition } from 'engine/core/condition';
import { IsAlive } from 'engine/modules/health';
import { HasInformation, Information, InformationOwner } from 'engine/modules/information';
export class InformAction extends Action {
  readonly informationReceiver: InformationOwner;
  readonly information: Information;

  constructor({ informationReceiver, information }: { informationReceiver: InformationOwner; information: Information }) {
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
