import { MapField } from './map-field';
import type { MapFieldType } from './map-field-type';
import type { TranslatableText } from '../../i18n/translatable-text';
import { createManyToOneRelationship } from '../../common/cache-relationship-utils';

export class MapLocation {
  private static readonly PARENT_FIELD_RELATIONSHIP = createManyToOneRelationship<MapLocation, MapField, MapField>({
    getForeignKey: (location) => location._parentField,
    setForeignKeyInternally: (location, newParentField) => (location._parentField = newParentField),
    areForeignKeysEqual: (firstField, secondField) => firstField === secondField,
    getParent: (field) => field,
    addChild: (field, subLocation) => field.addSubLocation(subLocation),
    removeChild: (field, subLocation) => field.removeSubLocation(subLocation)
  });
  static readonly INTERNAL = {
    setParentField: (location: MapLocation, newParentField: MapField) => (location._parentField = newParentField)
  };

  name: TranslatableText;
  readonly width: number;
  readonly height: number;
  readonly fields: readonly MapField[][];
  readonly startingField?: MapField;
  private _parentField?: MapField;

  constructor({
    name,
    width,
    height,
    fieldType,
    startingField,
    parentField
  }: {
    name: TranslatableText;
    width: number;
    height: number;
    fieldType: MapFieldType;
    startingField?: { x: number; y: number };
    parentField?: MapField;
  }) {
    if (startingField && (startingField.x < 0 || startingField.x >= width || startingField.y < 0 || startingField.y >= height)) {
      throw new Error(
        'Starting position (x=' + startingField.x + ', y=' + startingField.y + ') is invalid for width=' + width + ' and height=' + height
      );
    }

    this.name = name;
    this.width = width;
    this.height = height;
    this.fields = this.prepareFields(width, height, fieldType);
    this.startingField = startingField && this.fields[startingField.y][startingField.x];
    this.parentField = parentField;
  }

  private prepareFields(width: number, height: number, fieldType: MapFieldType): readonly MapField[][] {
    const fields: MapField[][] = [];
    for (let y = 0; y < height; y++) {
      fields[y] = [];
      for (let x = 0; x < width; x++) {
        fields[y][x] = new MapField({ fieldType, location: this });
      }
    }
    return fields;
  }

  get parentField(): MapField | undefined {
    return this._parentField;
  }

  set parentField(newParentField: MapField | undefined) {
    MapLocation.PARENT_FIELD_RELATIONSHIP.setForeignKey(this, newParentField);
  }
}
