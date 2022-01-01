import type { TranslatableText } from '../../../i18n/translatable-text';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../../../map/terrain-object/model/terrain-object-placement';
import type { ActionContext } from '../action-context';
import type { ActionExecutionContext } from '../action-execution-context';
import { ActionOrder } from '../action-order';
import { Action, ActionId } from './action';

export class ChangeTerrainObjectPlacementAction extends Action {
  constructor(readonly terrainObject: TerrainObject, readonly terrainObjectPlacement: TerrainObjectPlacement) {
    super({ nameContext: terrainObject.name });
  }

  override get id(): ActionId {
    return 'CHANGE_TERRAIN_OBJECT_PLACEMENT';
  }

  override get order(): ActionOrder {
    return ActionOrder.CHANGE_TERRAIN_OBJECT_PLACEMENT;
  }

  protected override getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return {
      terrainObjectPlacementMovementActivity: this.terrainObjectPlacement.getMovementActivityName()
    };
  }

  override executeAction(actionExecutionContext: ActionExecutionContext): ActionContext | undefined {
    actionExecutionContext.go(new TerrainObjectPosition(this.terrainObject, this.terrainObjectPlacement));
    return undefined;
  }
}
