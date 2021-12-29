import { MapFieldType } from './MapFieldType';
import { MapObject } from './MapObject';
import { TranslatableRichText } from '../../common/model/TranslatableRichText';

export class MapField {
  fieldType: MapFieldType;
  subLocation?: Location;
  object?: MapObject;

  constructor(fieldType: MapFieldType = MapFieldType.EMPTY) {
    this.fieldType = fieldType;
  }
}
