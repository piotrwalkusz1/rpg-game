import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { Information } from '../information';

export class TerrainObjectLocationInformation extends Information {
  readonly terrainObject: TerrainObject;

  constructor(terrainObject: TerrainObject) {
    super();
    this.terrainObject = terrainObject;
  }

  equals(information: Information): boolean {
    return information instanceof TerrainObjectLocationInformation && information.terrainObject === this.terrainObject;
  }
}
