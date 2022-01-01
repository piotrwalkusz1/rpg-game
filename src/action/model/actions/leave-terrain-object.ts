import { FieldPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import { ActionOrder } from '../action-order';
import { Action, ActionId } from './action';

export class LeaveTerrainAction extends Action {
  constructor(readonly terrainObject: TerrainObject) {
    super({ nameContext: terrainObject.name });
  }

  override get id(): ActionId {
    return 'LEAVE_TERRAIN_OBJECT';
  }

  override get order(): ActionOrder {
    return ActionOrder.LEAVE_TERRAIN_OBJECT;
  }

  override executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined {
    if (this.terrainObject.field) {
      actionExecutionContext.go(new FieldPosition(this.terrainObject.field));
    }
    return undefined;
  }
}
