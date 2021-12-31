import type { Character } from '../../../character/model/character';
import { CharactersCollection } from '../../../character/model/characters-container';
import { createManyToOneRelationship } from '../../../common/cache-relationship-utils';
import type { MapField } from '../../model/map-field';
import { TerrainObjectPosition } from '../../model/position';
import type { TerrainObjectType } from './terrain-object-type';

export class TerrainObject {
  private static readonly FIELD_RELATIONSHIP = createManyToOneRelationship<TerrainObject, MapField, MapField>({
    getForeignKey: (terrainObject) => terrainObject._field,
    setForeignKeyInternally: (terrainObject, newField) => (terrainObject._field = newField),
    areForeignKeysEqual: (firstField, secondField) => firstField === secondField,
    getParent: (field) => field,
    addChild: (field, terrainObject) => field.addTerrainObject(terrainObject),
    removeChild: (field, terrainObject) => field.removeTerrainObject(terrainObject)
  });

  readonly type: TerrainObjectType;
  guards: Array<Character>;
  private _field?: MapField;
  characters: CharactersCollection;

  constructor({ type, field, guards }: { type: TerrainObjectType; field?: MapField; guards?: Array<Character> }) {
    this.type = type;
    this.guards = guards || [];
    this.field = field;
    this.characters = new CharactersCollection(new TerrainObjectPosition(this, this.type.defaultCharacterPlacement));
  }

  get imageUrl(): string {
    return this.type.imageUrl;
  }

  get field(): MapField | undefined {
    return this._field;
  }

  set field(newField: MapField | undefined) {
    TerrainObject.FIELD_RELATIONSHIP.setForeignKey(this, newField);
  }
}
