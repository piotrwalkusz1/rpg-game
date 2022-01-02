import { ActionDetector } from './action-detector';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import type { ActionTrigger } from '../action-triggers/action-trigger';
import { TerrainObjectPlacementChangedActionTrigger } from '../action-triggers/terrain-object-placement-changed-action-trigger';

export class ChangeTerrainObjectPlacementActionDetector extends ActionDetector {
  readonly terrainObject: TerrainObject;

  constructor({ terrainObject }: { terrainObject: TerrainObject }) {
    super();
    this.terrainObject = terrainObject;
  }

  override isActionDetected(actionTrigger: ActionTrigger): boolean {
    return actionTrigger instanceof TerrainObjectPlacementChangedActionTrigger && actionTrigger.terrainObject === this.terrainObject;
  }
}
