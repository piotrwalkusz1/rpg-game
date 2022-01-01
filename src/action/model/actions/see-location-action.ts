import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import { Action, ActionId } from './action';
import type { MapLocation } from '../../../map/model/map-location';
import { ActionOrder } from '../action-order';

export class SeeLocationAction extends Action {
  constructor(readonly location: MapLocation) {
    super({ nameContext: location.name });
  }

  override get id(): ActionId {
    return 'SEE_LOCATION';
  }

  override get order(): ActionOrder {
    return ActionOrder.SEE_LOCATION;
  }

  override executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined {
    actionExecutionContext.changeCurrentLocationView(this.location);
    return undefined;
  }
}
