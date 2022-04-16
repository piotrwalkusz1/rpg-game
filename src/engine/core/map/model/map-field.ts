import { ArrayUtils } from '../../../../utils/array-utils';
import { OneToManyCollection } from '../../../../utils/cache-relationship-utils';
import { ActorsCollection } from '../../actor/model/actor';
import type { Detector } from '../../detector/model/detector';
import type { DetectorContext } from '../../detector/model/detector-context';
import type { NarrationProvider } from '../../narration/model/narration-provider/narration-provider';
import type { NarrationProviderOwner } from '../../narration/model/narration-provider/narration-provider-owner';
import type { MapFieldKind } from './map-field-kind';
import type { MapFieldType } from './map-field-type';
import type { MapLocation } from './map-location';
import { FieldPosition } from './position';
import type { TerrainObject } from './terrain-object';

export class SubLocationsCollection extends OneToManyCollection<MapLocation, MapField> {
override getForeignKey = (location: MapLocation) => location.parentFieldFK;
}

export class TerrainObjectsCollection extends OneToManyCollection<TerrainObject, MapField> {
  override getForeignKey = (terrainObject: TerrainObject) => terrainObject.fieldFK;
}

export class MapField implements DetectorContext, NarrationProviderOwner {
  readonly fieldType: MapFieldType;
  readonly location: MapLocation;
  readonly subLocations: SubLocationsCollection = new SubLocationsCollection(this);
  readonly terrainObjects: TerrainObjectsCollection = new TerrainObjectsCollection(this);
  readonly characters: ActorsCollection = new ActorsCollection(new FieldPosition(this));
  readonly detectors: Detector[] = [];
  readonly narrationProviders: NarrationProvider[] = [];

  constructor({ fieldType, location }: { fieldType: MapFieldType; location: MapLocation }) {
    this.fieldType = fieldType;
    this.location = location;
  }

  get kind(): MapFieldKind {
    return this.fieldType.kind;
  }

  isOnField(otherField: MapField): boolean {
    return otherField === this || (this.location.parentField ? this.location.parentField.isOnField(otherField) : false);
  }

  getParentDetectorContext(): DetectorContext | undefined {
    return this.location;
  }

  addDetector(detector: Detector): void {
    this.detectors.push(detector);
  }

  removeDetector(detector: Detector): void {
    ArrayUtils.remove(this.detectors, detector);
  }
}
