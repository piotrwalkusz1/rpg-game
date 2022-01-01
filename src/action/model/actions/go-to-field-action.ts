import type { MapField } from '../../../map/model/map-field';
import { FieldPosition } from '../../../map/model/position';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import { ActionOrder } from '../action-order';
import { Action } from './action';

export class GoToFieldAction extends Action {
  constructor(readonly field: MapField) {
    super({});
  }

  override get id(): string {
    return 'GO_TO_FIELD';
  }

  override get order(): ActionOrder {
    return ActionOrder.GO_TO_FIELD;
  }

  override executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined {
    actionExecutionContext.go(new FieldPosition(this.field));
    return undefined;
  }
}
