import { TerrainObjectLocationInformation } from '../../../information/model/informations/terrain-object-location-information';
import { InformationUtils } from '../../../information/service/information-utils';
import type { TerrainObject } from '../../../map/terrain-object/model/terrain-object';
import { ObservableTrait } from '../observable-trait';
import type { ObservatorTrait } from '../observator-trait';
import { TerrainObjectKnownLocationObservatorTrait } from '../observator-traits/terrain-object-known-location-observator-trait';
import { VisibilityLevel } from '../visibility-level';

export class TerrainObjectKnownLocationObservableTrait extends ObservableTrait {
  readonly terrainObject: TerrainObject;

  constructor(terrainObject: TerrainObject) {
    super();
    this.terrainObject = terrainObject;
  }

  override getValue(observator: ObservatorTrait): VisibilityLevel {
    if (!(observator instanceof TerrainObjectKnownLocationObservatorTrait)) {
      return VisibilityLevel.NONE;
    }

    return InformationUtils.hasInformation(observator.informationOwner, new TerrainObjectLocationInformation(this.terrainObject))
      ? VisibilityLevel.LOCATABLE
      : VisibilityLevel.NONE;
  }
}
