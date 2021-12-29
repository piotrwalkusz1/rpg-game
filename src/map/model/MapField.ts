import { Building } from '../../building/model/Building';
import { BuildingType } from '../../building/model/BuildingType';
import { Character } from '../../character/model/Character';
import { MapBuilding } from './MapBuilding';
import { MapFieldType } from './MapFieldType';
import { MapObject } from './MapObject';

export class MapField {
  readonly fieldType: MapFieldType;
  readonly subLocation?: Location;
  private _object?: MapObject;
  private _characters: Array<Character> = [];

  constructor({ fieldType, subLocation, object }: { fieldType: MapFieldType; subLocation?: Location; object?: MapObject }) {
    this.fieldType = fieldType;
    this.subLocation = subLocation;
    this.object = object;
  }

  get object(): MapObject | undefined {
    return this._object;
  }

  set object(newObject: MapObject | undefined) {
    if (this._object === newObject) {
      return;
    }
    const oldObject = this._object;
    this._object = newObject;
    if (oldObject && oldObject.field === this) {
      oldObject.field = undefined;
    }
    if (newObject) {
      newObject.field = this;
    }
    this.characters.forEach((character) => character.setPlacementOnFieldWithBuildingToDefaultValue());
  }

  get buildingType(): BuildingType | undefined {
    return this.building?.type;
  }

  get building(): Building | undefined {
    return this.buildingOnMap?.building;
  }

  get buildingOnMap(): MapBuilding | undefined {
    return this.object instanceof MapBuilding ? this.object : undefined;
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
