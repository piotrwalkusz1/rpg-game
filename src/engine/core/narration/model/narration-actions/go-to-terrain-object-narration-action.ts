import { GoAction } from '../../../../modules/movement/model/actions/go-action';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class GoToTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(terrainObject: TerrainObject) {
    super({
      id: 'GO_TO_TERRAIN_OBJECT',
      nameContext: terrainObject,
      order: NarrationActionOrder.GO_TO_TERRAIN_OBJECT,
      action: (gameState) => new GoAction({ character: gameState.player, position: new TerrainObjectPosition(terrainObject) })
    });
  }
}
