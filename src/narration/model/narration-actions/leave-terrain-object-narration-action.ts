import type { Action } from '../../../action/model/actions/action';
import { GoAction } from '../../../action/model/actions/go-action';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { FieldPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';
import type { NarrationActionId } from './narration-action';

export class LeaveTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(readonly terrainObject: TerrainObject) {
    super();
  }

  override get id(): NarrationActionId {
    return 'LEAVE_TERRAIN_OBJECT';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.GO_TO_TERRAIN_OBJECT;
  }

  override getAction(): Action | undefined {
    return this.terrainObject.field && new GoAction(new FieldPosition(this.terrainObject.field));
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.terrainObject.name;
  }
}
