import { CharactersCollection } from '../../character/model/character';
import { OneToManyCollection } from '../../common/cache-relationship-utils';
import type { TerrainObject } from '../terrain-object/model/terrain-object';
import type { MapFieldKind } from './map-field-kind';
import type { MapFieldType } from './map-field-type';
import type { MapLocation } from './map-location';
import { FieldPosition } from './position';

export class SubLocationsCollection extends OneToManyCollection<MapLocation, MapField> {
  override getForeignKey = (location: MapLocation) => location.parentFieldFK;
}

export class TerrainObjectsCollection extends OneToManyCollection<TerrainObject, MapField> {
  override getForeignKey = (terrainObject: TerrainObject) => terrainObject.fieldFK;
}

export class MapField {
  readonly fieldType: MapFieldType;
  readonly location: MapLocation;
  readonly subLocations: SubLocationsCollection = new SubLocationsCollection(this);
  readonly terrainObjects: TerrainObjectsCollection = new TerrainObjectsCollection(this);
  readonly characters: CharactersCollection = new CharactersCollection(new FieldPosition(this));

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
}
