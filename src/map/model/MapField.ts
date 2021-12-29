import { MapFieldType } from './MapFieldType';
import { MapObject } from './MapObject';

export class MapField {
  fieldType: MapFieldType;
  subLocation?: Location;
  private _object?: MapObject;

  constructor(fieldType: MapFieldType = MapFieldType.EMPTY) {
    this.fieldType = fieldType;
  }

  get object(): MapObject | undefined {
    return this._object;
  }

  setObject(newObject: MapObject | undefined) {
    if (this._object === newObject) {
      return;
    }
    const oldObject = this._object;
    this._object = newObject;
    oldObject?.setField(undefined);
    newObject?.setField(this);
  }
}
