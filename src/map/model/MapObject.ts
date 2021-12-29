import { MapField } from './MapField';

export abstract class MapObject {
  private _field?: MapField;

  constructor({ field }: { field?: MapField }) {
    this.field = field;
  }

  abstract get imageUrl(): string;

  get field(): MapField | undefined {
    return this._field;
  }

  set field(newField: MapField | undefined) {
    if (this._field === newField) {
      return;
    }
    const oldField = this._field;
    this._field = newField;
    if (oldField && oldField.object === this) {
      oldField.object = undefined;
    }
    if (newField) {
      newField.object = this;
    }
  }
}
