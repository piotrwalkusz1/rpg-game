import { MapField } from './MapField';
export abstract class MapObject {
  private _field?: MapField;

  abstract getImageUrl(): string;

  get field(): MapField | undefined {
    return this._field;
  }

  setField(newField: MapField | undefined) {
    if (this._field === newField) {
      return;
    }
    const oldField = this._field;
    this._field = newField;
    oldField?.setObject(undefined);
    newField?.setObject(this);
  }
}
