import { Character } from '../../character/model/Character';
import { MapField } from '../model/MapField';
import { TerrainObjectType } from './TerrainObjectType';

export class TerrainObject {
  readonly type: TerrainObjectType;
  guards: Array<Character> = [];
  private _field?: MapField;

  constructor({ type, field }: { type: TerrainObjectType; field?: MapField }) {
    this.field = field;
    this.type = type;
  }

  get imageUrl(): string {
    return this.type.imageUrl;
  }

  get field(): MapField | undefined {
    return this._field;
  }

  set field(newField: MapField | undefined) {
    if (this._field === newField) {
      return;
    }
    const oldField = this._field;
    this._field = newField;
    if (oldField && oldField.terrainObject === this) {
      oldField.terrainObject = undefined;
    }
    if (newField) {
      newField.terrainObject = this;
    }
  }
}
