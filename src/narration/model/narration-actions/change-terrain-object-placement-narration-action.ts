import type { Action } from '../../../action/model/actions/action';
import { GoAction } from '../../../action/model/actions/go-action';
import type { TranslatableText } from '../../../i18n/translatable-text';
import { TerrainObjectPosition } from '../../../map/model/position';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../../../map/terrain-object/model/terrain-object-placement';
import { NarrationActionOrder } from '../narration-action-order';
import { ActionBasedNarrationAction } from './action-based-narration-action';
import type { NarrationActionId } from './narration-action';

export class ChangeTerrainObjectPlacementNarrationAction extends ActionBasedNarrationAction {
  constructor(readonly terrainObject: TerrainObject, readonly terrainObjectPlacement: TerrainObjectPlacement) {
    super();
  }

  override get id(): NarrationActionId {
    return 'CHANGE_TERRAIN_OBJECT_PLACEMENT';
  }

  override get order(): NarrationActionOrder {
    return NarrationActionOrder.CHANGE_TERRAIN_OBJECT_PLACEMENT;
  }

  override getAction(): Action | undefined {
    return new GoAction(new TerrainObjectPosition(this.terrainObject, this.terrainObjectPlacement));
  }

  protected override getNameContext(): TranslatableText | undefined {
    return this.terrainObject.name;
  }

  protected override getNameTranslationKeyProperties(): Record<string, TranslatableText> | undefined {
    return {
      terrainObjectPlacementMovementActivity: this.terrainObjectPlacement.getMovementActivityName()
    };
  }
}
