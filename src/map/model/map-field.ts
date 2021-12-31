import { CharactersCollection } from '../../character/model/characters-container';
import { createOneToManyRelationship } from '../../common/cache-relationship-utils';
import type { TerrainObject } from '../terrain-object/model/terrain-object';
import type { MapFieldKind } from './map-field-kind';
import type { MapFieldType } from './map-field-type';
import type { MapLocation } from './map-location';
import { FieldPosition } from './position';

export class MapField {
  private static readonly SUB_LOCATIONS_RELATIONSHIP = createOneToManyRelationship<MapField, MapLocation, MapField>({
    getChildren: (field) => field._subLocations,
    getParent: (subLocation) => subLocation.parentField,
    setForeignKey: (subLocation, field) => (subLocation.parentField = field),
    prepareForeignKey: (field) => field
  });
  private static readonly TERRAIN_OBJECTS_RELATIONSHIP = createOneToManyRelationship<MapField, TerrainObject, MapField>({
    getChildren: (field) => field._terrainObjects,
    getParent: (terrainObject) => terrainObject.field,
    setForeignKey: (terrainObject, field) => (terrainObject.field = field),
    prepareForeignKey: (field) => field
  });

  readonly fieldType: MapFieldType;
  readonly location: MapLocation;
  private _subLocations: MapLocation[] = [];
  private _terrainObjects: TerrainObject[] = [];
  readonly characters: CharactersCollection = new CharactersCollection(new FieldPosition(this));

  constructor({ fieldType, location }: { fieldType: MapFieldType; location: MapLocation }) {
    this.fieldType = fieldType;
    this.location = location;
  }

  get kind(): MapFieldKind {
    return this.fieldType.kind;
  }

  get subLocations(): readonly MapLocation[] {
    return this._subLocations;
  }

  addSubLocation(subLocation: MapLocation) {
    MapField.SUB_LOCATIONS_RELATIONSHIP.addChild(this, subLocation);
  }

  removeSubLocation(subLocation: MapLocation) {
    MapField.SUB_LOCATIONS_RELATIONSHIP.removeChild(this, subLocation);
  }

  get terrainObjects(): readonly TerrainObject[] {
    return this._terrainObjects;
  }

  addTerrainObject(terrainObject: TerrainObject) {
    MapField.TERRAIN_OBJECTS_RELATIONSHIP.addChild(this, terrainObject);
  }

  removeTerrainObject(terrainObject: TerrainObject) {
    MapField.TERRAIN_OBJECTS_RELATIONSHIP.removeChild(this, terrainObject);
  }

  isOnField(otherField: MapField): boolean {
    return otherField === this || (this.location.parentField ? this.location.parentField.isOnField(otherField) : false);
  }
}
