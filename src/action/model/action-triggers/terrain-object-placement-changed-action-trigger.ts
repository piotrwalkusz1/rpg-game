import { ActionTrigger } from './action-trigger';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { TerrainObjectPlacement } from '../../../map/terrain-object/model/terrain-object-placement';

export class TerrainObjectPlacementChangedActionTrigger extends ActionTrigger {
  constructor(
    readonly terrainObject: TerrainObject,
    readonly oldPlacement: TerrainObjectPlacement,
    readonly newPlacement: TerrainObjectPlacement
  ) {
    super();
  }
}
