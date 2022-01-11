import { GoAction } from '../../../action/model/actions/go-action';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class GoToTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(terrainObject: TerrainObject) {
    super({
      id: 'GO_TO_TERRAIN_OBJECT',
      nameContext: terrainObject.name,
      order: NarrationActionOrder.GO_TO_TERRAIN_OBJECT,
      action: new GoAction(new TerrainObjectPosition(terrainObject))
    });
  }
}
