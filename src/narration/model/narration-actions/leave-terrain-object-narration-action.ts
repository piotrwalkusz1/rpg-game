import { GoAction } from '../../../action/model/actions/go-action';
import { FieldPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';

export class LeaveTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(terrainObject: TerrainObject) {
    super({
      id: 'LEAVE_TERRAIN_OBJECT',
      nameContext: terrainObject,
      order: NarrationActionOrder.GO_TO_TERRAIN_OBJECT,
      action: () => {
        if (!terrainObject.field) {
          throw new Error('Cannot leave terrain object that has no parent field');
        }
        return new GoAction(new FieldPosition(terrainObject.field));
      }
    });
  }
}
