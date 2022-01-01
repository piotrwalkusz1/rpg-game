import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import { ActionOrder } from '../action-order';
import { Action, ActionId } from './action';

export class GoToTerrainObjectAction extends Action {
  constructor(readonly terrainObject: TerrainObject) {
    super({ nameContext: terrainObject.name });
  }

  override get id(): ActionId {
    return 'GO_TO_TERRAIN_OBJECT';
  }

  override get order(): ActionOrder {
    return ActionOrder.GO_TO_TERRAIN_OBJECT;
  }

  override executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined {
    actionExecutionContext.go(new TerrainObjectPosition(this.terrainObject));
    return undefined;
  }
}
