import { TranslatableRichText } from '../../common/model/TranslatableRichText';
import { MapField } from './MapField';
import { MapFieldType } from './MapFieldType';

export class MapLocation {
  name: TranslatableRichText;
  readonly width: number;
  readonly height: number;
  readonly fields: MapField[][];
  readonly startingField?: MapField;

  constructor({
    name,
    width,
    height,
    fieldType,
    startingField
  }: {
    name: string | TranslatableRichText;
    width: number;
    height: number;
    fieldType: MapFieldType;
    startingField?: { x: number; y: number };
  }) {
    if (startingField && (startingField.x < 0 || startingField.x >= width || startingField.y < 0 || startingField.y >= height)) {
      throw new Error(
        'Starting position (x=' + startingField.x + ', y=' + startingField.y + ') is invalid for width=' + width + ' and height=' + height
      );
    }

    this.name = typeof name === 'string' ? TranslatableRichText.fromText(name) : name;
    this.width = width;
    this.height = height;
    this.fields = this.prepareFields(width, height, fieldType);
    this.startingField = startingField && this.fields[startingField.y][startingField.x];
  }

  private prepareFields(width: number, height: number, fieldType: MapFieldType): MapField[][] {
    const fields: MapField[][] = [];
    for (let y = 0; y < height; y++) {
      fields[y] = [];
      for (let x = 0; x < width; x++) {
        fields[y][x] = new MapField({ fieldType });
      }
    }
    return fields;
  }
}
