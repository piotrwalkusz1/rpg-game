import { GoAction } from '../../../action/model/actions/go-action';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../../../map/terrain-object/model/terrain-object-placement';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class ChangeTerrainObjectPlacementNarrationAction extends ActionBasedNarrationAction {
  constructor(terrainObject: TerrainObject, terrainObjectPlacement: TerrainObjectPlacement) {
    super({
      id: 'CHANGE_TERRAIN_OBJECT_PLACEMENT',
      nameTranslationProperties: {
        terrainObjectPlacementMovementActivity: terrainObjectPlacement.getMovementActivityName()
      },
      nameContext: terrainObject.name,
      order: NarrationActionOrder.CHANGE_TERRAIN_OBJECT_PLACEMENT,
      action: new GoAction(new TerrainObjectPosition(terrainObject, terrainObjectPlacement))
    });
  }
}
