import type { Action } from '../../../action/model/actions/action';
import { GoAction } from '../../../action/model/actions/go-action';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';
import type { NarrationActionId } from './narration-action';

export class GoToTerrainObjectNarrationAction extends ActionBasedNarrationAction {
  constructor(readonly terrainObject: TerrainObject) {
    super();
  }

  override get id(): NarrationActionId {
    return 'GO_TO_TERRAIN_OBJECT';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.GO_TO_TERRAIN_OBJECT;
  }

  override getAction(): Action {
    return new GoAction(new TerrainObjectPosition(this.terrainObject));
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.terrainObject.name;
  }
}
