import { Character } from '../../character/model/Character';
import { TerrainObject } from '../terrain-object/TerrainObject';
import { TerrainObjectType } from '../terrain-object/TerrainObjectType';
import { MapFieldType } from './MapFieldType';

export class MapField {
  readonly fieldType: MapFieldType;
  readonly subLocation?: Location;
  private _terrainObject?: TerrainObject;
  private _characters: Array<Character> = [];

  constructor({
    fieldType,
    subLocation,
    terrainObject: object
  }: {
    fieldType: MapFieldType;
    subLocation?: Location;
    terrainObject?: TerrainObject;
  }) {
    this.fieldType = fieldType;
    this.subLocation = subLocation;
    this.terrainObject = object;
  }

  get terrainObjectType(): TerrainObjectType | undefined {
    return this._terrainObject?.type;
  }

  get terrainObject(): TerrainObject | undefined {
    return this._terrainObject;
  }

  set terrainObject(newTerrainObject: TerrainObject | undefined) {
    if (this._terrainObject === newTerrainObject) {
      return;
    }
    const oldTerrainObject = this._terrainObject;
    this._terrainObject = newTerrainObject;
    if (oldTerrainObject && oldTerrainObject.field === this) {
      oldTerrainObject.field = undefined;
    }
    if (newTerrainObject) {
      newTerrainObject.field = this;
    }
    this.characters.forEach((character) => character.setTerrainObjectPlacementToDefaultValue());
  }

  get characters(): readonly Character[] {
    return this._characters.slice();
  }

  containsAnyCharacter(): boolean {
    return this._characters.length !== 0;
  }

  containsCharacter(character: Character): boolean {
    return this._characters.includes(character);
  }

  addCharacter(character: Character) {
    if (this._characters.includes(character)) {
      return;
    }
    const oldField = character.field;
    this._characters.push(character);
    if (oldField && oldField !== this) {
      oldField.removeCharacter(character);
    }
    character.field = this;
  }

  removeCharacter(character: Character) {
    if (!this._characters.includes(character)) {
      return;
    }
    this._characters = this._characters.filter((otherCharacter) => otherCharacter !== character);
    character.field = undefined;
  }
}
