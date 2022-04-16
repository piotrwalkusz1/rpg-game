import { GoAction } from '../../../../modules/movement/model/actions/go-action';
import { FieldPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class LeaveTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(terrainObject: TerrainObject) {
    super({
      id: 'LEAVE_TERRAIN_OBJECT',
      nameContext: terrainObject,
      order: NarrationActionOrder.GO_TO_TERRAIN_OBJECT,
      action: (gameState) => {
        if (!terrainObject.field) {
          throw new Error('Cannot leave terrain object that has no parent field');
        }
        return new GoAction({ character: gameState.player, position: new FieldPosition(terrainObject.field) });
      }
    });
  }
}
